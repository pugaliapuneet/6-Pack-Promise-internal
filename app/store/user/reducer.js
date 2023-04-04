
import { ActionTypes } from "../ActionTypes";
import Alarms from './alarms'

export const proDownloadStatuses = {
    noPro: 0,
    noDownload: 1,
    downloading: 2,
    paused: 3,
    downloaded: 4,
    unzipped: 5,
    corrupted: 6
}

const initialState = {
    profile: {},
    favoriteIds: [],
    selfies: [],
    workoutTime: "08:00",
    subscribeEmail: null,
    youtubeVideos: [],
    isPurchasedFullVersion: false,
    downloadStatus: 0,
    downloadProgress: 0,
    proDownloadStatuses,
    loading: false,
    refreshing: false,
    alarms: Alarms,
    error: false,
    errorMsg: "",
};

export const UserReducer = (
    state = initialState,
    action) => {
    switch (action.type) {
        case ActionTypes.UPDATE_PRO_DOWNLOAD_STATUS:
            return {
                ...state,
                downloadStatus: action.payload
            }
        case ActionTypes.SET_DOWNLOAD_PROGRESS:
            return {
                ...state,
                downloadProgress: action.payload
            }
        case ActionTypes.UPDATE_FAVORITE_WORKOUTS:
            return {
                ...state,
                favoriteIds: action.payload
            }
        case ActionTypes.UPDATE_SELFIES:
            return {
                ...state,
                selfies: action.payload
            }
        case ActionTypes.UPDATE_WORKOUT_TIME:
            return {
                ...state,
                workoutTime: action.payload
            }
        case ActionTypes.UPDATE_PURCHASED_FULL_VERSION
            :
            return {
                ...state,
                isPurchasedFullVersion: action.payload
            }
        case ActionTypes.UPDATE_EAT_ALARMS:
            return {
                ...state,
                alarms: action.payload
            }
        case ActionTypes.SET_SUBSCRIBE_EMAIL:
            return {
                ...state,
                subscribeEmail: action.payload
            }
        case ActionTypes.GET_YOUTUBE_VIDEOS:
            return {
                ...state,
                youtubeVideos: action.payload
            }

        default:
            return state;
    }
};
