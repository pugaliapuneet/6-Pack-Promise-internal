
import { ActionTypes } from "../ActionTypes";
import trains from '../../helpers/train'

const initialState = {
    currentDayId: 0,
    completeWorkoutId: null,
    sampleImageId: 54,
    todayWorkout: trains[0],
    exercises: [],
    allDays: [],
    workoutTimes: [],
    totalTime: 0,
};

export const WorkoutReducer = (
    state = initialState,
    action) => {
    switch (action.type) {
        case ActionTypes.SET_TODAY_WORKOUT:
            return {
                ...state,
                ...action.payload
            }
        case ActionTypes.GET_EXERCISES:
            return {
                ...state,
                exercises: action.payload
            }
        case ActionTypes.SET_COMPLETED_WORKOUT_ID:
            return {
                ...state,
                completeWorkoutId: action.payload
            }

        default:
            return state;
    }
};
