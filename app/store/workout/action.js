import { ActionTypes } from '../ActionTypes'
import * as SQL from '../../helpers/database'
import trains from '../../helpers/train'
import moment from 'moment'
import _ from 'lodash'
import AsyncStorage from "@react-native-community/async-storage"
import localStorageKeys from '../../helpers/local-storage-keys'

const getRestBysec = (item) => {
    return {
        exerciseName: 'Rest',
        exerciseId: -1,
        locked: 'FREE',
        pts: 0,
        sampleVideoPath: null,
        exerciseNameSound: item.time == 30 ? "10_30SecondsRest" : "9_45SecondsRest",
        durationTime: item.time,
        anatomyCode: "",
        equipmentSound: "Bodyweight"
    }
}

const getExercise30ById = (ex, exerciseList) => {
    const data = exerciseList.find(i => i.ID == ex)
    return {
        exerciseName: data?.NAME,
        exerciseId: data?.ID,
        locked: data?.LOCKED,
        pts: data?.PTS,
        sampleVideoPath: data?.VIDEO,
        exerciseNameSound: data?.SOUND30,
        durationTime: 30,
        anatomyCode: data["ANATOMY LISTING CODE"],
        equipmentSound: data?.EQUIPMENT,
        side: data?.SIDE,
        x2: data?.X2
    }
}
const getExercise60ById = (ex, exerciseList) => {
    const data = exerciseList.find(i => i.ID == ex)
    return {
        exerciseName: data?.NAME,
        exerciseId: data?.ID,
        locked: data?.LOCKED,
        pts: data?.PTS,
        sampleVideoPath: data?.VIDEO,
        exerciseNameSound: data?.SOUND60,
        durationTime: 60,
        anatomyCode: data["ANATOMY LISTING CODE"],
        equipmentSound: data?.EQUIPMENT,
        side: data?.SIDE,
        x2: data?.X2
    }
}


export const setTodayWorkout = (changeDayValue = null, isNextDay = false) => async (dispatch, getState) => {
    const payload = await getTodayWorkout(changeDayValue, true)
    if (changeDayValue && (changeDayValue % 7 == 3 || changeDayValue % 7 == 0)) {
        await  AsyncStorage.setItem(localStorageKeys.restDate, isNextDay ? moment().add(1, 'd').format('YYYY-MM-DD') : `${moment().format('YYYY-MM-DD')}`)
    } 
    console.log({changeDayValue})
    dispatch({ type: ActionTypes.SET_TODAY_WORKOUT, payload })
}
export const setCompleteWorkoutId = (payload) => async (dispatch) => {
    AsyncStorage.setItem(localStorageKeys.completeWorkoutId, `${payload}`)
    AsyncStorage.setItem(localStorageKeys.lastWorkoutDate, moment().format('YYYY-MM-DD'))
    dispatch({ type: ActionTypes.SET_COMPLETED_WORKOUT_ID, payload })
}
export const getCompleteWorkoutId = () => async (dispatch) => {
    AsyncStorage.getItem(localStorageKeys.completeWorkoutId).then(
        payload => {
            dispatch({ type: ActionTypes.SET_COMPLETED_WORKOUT_ID, payload })
        }
    )
}

export const getTodayWorkout = (changeDayValue = null, save = false, trainData = null) => {
    return new Promise(async (resolve, reject) => {
        let currentDayId = changeDayValue
        if (save) {
            const { data: dayId } = await SQL.getCurrentDay(changeDayValue)
            currentDayId = dayId
        }
        const lastWorkoutDate = await AsyncStorage.getItem(localStorageKeys.lastWorkoutDate)
        const { data } = await SQL.getAllDays()
        const { data: exerciseList } = await SQL.getExercises()
        const dayData = data.find(item => item.id == currentDayId - (lastWorkoutDate == moment().format('YYYY-MM-DD') ? 1 : 0))
        if (dayData) {
            const item = dayData
            const training_Namber = item?.training_Namber
            const todayWorkout = trainData || trains[training_Namber - 1]
            const sampleImageId = todayWorkout && todayWorkout[0].ex
            let newTodayWorkout = []
            Boolean(todayWorkout?.length) && todayWorkout.forEach(item => {
                let exTemp = {}
                if (item.ex == '-1') {
                    exTemp = getRestBysec(item)
                    newTodayWorkout.push(exTemp)
                } else {
                    exTemp = item.time == 30 ? getExercise30ById(item.ex, exerciseList) : getExercise60ById(item.ex, exerciseList)

                    if (exTemp.side == 2) {
                        newTodayWorkout = [
                            ...newTodayWorkout,
                            exTemp,
                            {
                                ...exTemp,
                                exerciseNameSound: exTemp.x2, /// this will be "ss" or "cd"
                            }]
                    } else {
                        newTodayWorkout = [...newTodayWorkout, exTemp]
                    }
                }
            })
            const workoutTimes = newTodayWorkout.map(({ durationTime }) => (parseInt(durationTime)))
            const totalTime = _.sum(workoutTimes)
            const payload = { result: true, allDays: data, sampleImageId, todayWorkout: newTodayWorkout, currentDayId, workoutTimes, totalTime, lastWorkoutDate }
            resolve(payload)
        } else {
            resolve({ result: false, })
        }
    })
}


export const getExercises = () => async (dispatch, getState) => {
    const { data } = await SQL.getExercises()
    dispatch({
        type: ActionTypes.GET_EXERCISES,
        payload: data
    })
}
