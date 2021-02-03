
import { ActionTypes } from "../ActionTypes";
import trains from '../../helpers/train'

const initialState = {
    currentShuffleId: 1,
    selectedEquipments: ["Bodyweight"],
    equipmentType: 1,
    shuffle: [],
    preDefinedShuffles: {}
};

export const ShuffleReducer = (
    state = initialState,
    action) => {
    switch (action.type) {
        case ActionTypes.UPDATE_EQUIPMENTS:
            return {
                ...state,
                ...action.payload
            }
        case ActionTypes.UPDATE_SHUFFLE:
            return {
                ...state,
                shuffle: action.payload
            }
        case ActionTypes.UPDATE_CURRENT_SHUFFLE_ID:
            return {
                ...state,
                currentShuffleId: action.payload
            }
        case ActionTypes.PREDEFINED_SHUFFLES:
            return {
                ...state,
                preDefinedShuffles: action.payload
            }
        default:
            return state;
    }
};
