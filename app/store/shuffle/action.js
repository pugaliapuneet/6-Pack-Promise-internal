import { ActionTypes } from '../ActionTypes'
import * as SQL from '../../helpers/database'
import trains from '../../helpers/train'
import moment from 'moment'
import _ from 'lodash'
import AsyncStorage from "@react-native-community/async-storage"
import localKeys from '../../helpers/local-storage-keys'

export const getEquipments = () => async (dispatch) => {
    const localData = await AsyncStorage.getItem(localKeys.equipments)
    const payload = localData ? JSON.parse(localData) : {}
    if (localData) {
        dispatch({ type: ActionTypes.UPDATE_EQUIPMENTS, payload })
    }
}

export const getCurrentShuffleId = () => async (dispatch) => {
    const payload = await AsyncStorage.getItem(localKeys.currentShuffleId)
    if (payload) {
        dispatch({ type: ActionTypes.UPDATE_CURRENT_SHUFFLE_ID, payload })
    }
}

export const setCurrentShuffleId = (value) => async (dispatch) => {
    await AsyncStorage.setItem(localKeys.currentShuffleId, `${value}`)
    dispatch({ type: ActionTypes.UPDATE_CURRENT_SHUFFLE_ID, payload: value })
}


export const updatePreDefinedShuffles = (data) => async (dispatch, getState) => {
    const { shuffle: { preDefinedShuffles } } = getState()
    let local = await AsyncStorage.getItem(localKeys.preDefinedShuffles)
    local = local ? JSON.parse(local) : {}
    const payload = { ...local, ...preDefinedShuffles, ...data }
    await AsyncStorage.setItem(localKeys.preDefinedShuffles, JSON.stringify(payload))
    dispatch({ type: ActionTypes.PREDEFINED_SHUFFLES, payload })
}

export const setEquipments = (payload) => async (dispatch) => {
    await AsyncStorage.setItem(localKeys.equipments, JSON.stringify(payload))
    dispatch({ type: ActionTypes.UPDATE_EQUIPMENTS, payload })
}

export const getShuffle = () => async (dispatch) => {
    const localData = await AsyncStorage.getItem(localKeys.shuffle)
    const payload = localData ? JSON.parse(localData) : {}
    if (localData) {
        dispatch({ type: ActionTypes.UPDATE_SHUFFLE, payload })
    }
}

export const setShuffle = (payload) => async (dispatch) => {
    await AsyncStorage.setItem(localKeys.shuffle, JSON.stringify(payload))
    dispatch({ type: ActionTypes.UPDATE_SHUFFLE, payload })
}
