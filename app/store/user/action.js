import {ActionTypes} from '../ActionTypes';
import RNBackgroundDownloader from 'react-native-background-downloader';
import {unzip} from 'react-native-zip-archive';
import {DocumentDirectoryPath} from 'react-native-fs';
import {proDownloadStatuses} from './reducer';
import AsyncStorage from '@react-native-community/async-storage';
import localKeys from '../../helpers/local-storage-keys';
import {reset} from '../../navigation/RootNavigation';
import {Screens} from '../../constants';
import Splash from 'react-native-splash-screen';
import Alarms from './alarms';
import moment from 'moment';
import {ASSETS_DOWNLOAD_URL, getYoutubeVideoList} from '../../helpers/api';
import {localNotificationSchedule} from '../../utils';
import database from '@react-native-firebase/database';

export const localUpdateDownloadStatus = (value) => {
  return new Promise(async (resolve, reject) => {
    await AsyncStorage.setItem(localKeys.proDownloadStatus, `${value}`);
    resolve({result: true});
  });
};

const _setProDownloadStatus = (status, dispatch) => {
  if (status) {
    localUpdateDownloadStatus(status);
    dispatch({
      type: ActionTypes.UPDATE_PRO_DOWNLOAD_STATUS,
      payload: status,
    });
  } else {
    AsyncStorage.getItem(localKeys.proDownloadStatus).then((data) => {
      if (data == 0 || data) {
        dispatch({
          type: ActionTypes.UPDATE_PRO_DOWNLOAD_STATUS,
          payload: data,
        });
      }
    });
  }
};
export const setProDownloadStatus = (status = null) => (dispatch) => {
  _setProDownloadStatus(status, dispatch);
};

export const downloadManager = () => (dispatch, getState) => {
  const destination = `${RNBackgroundDownloader.directories.documents}/AthleanX.obb`;
  RNBackgroundDownloader.download({
    id: 'AthleanX',
    url: ASSETS_DOWNLOAD_URL,
    destination,
  })
    .begin((expectedBytes) => {
      _setProDownloadStatus(proDownloadStatuses.downloading, dispatch);
    })
    .progress((percent) => {
      dispatch({type: ActionTypes.SET_DOWNLOAD_PROGRESS, payload: percent});
    })
    .done(() => {
      _setProDownloadStatus(proDownloadStatuses.downloaded, dispatch);
      const targetPath = DocumentDirectoryPath;
      const charset = 'UTF-8';
      unzip(destination, targetPath, charset)
        .then((path) => {
          _setProDownloadStatus(proDownloadStatuses.unzipped, dispatch);
          dispatch({type: ActionTypes.SET_DOWNLOAD_PROGRESS, payload: 1});
        })
        .catch((error) => {
          _setProDownloadStatus(proDownloadStatuses.corrupted, dispatch);
        });
    })
    .error((error) => {
      _setProDownloadStatus(proDownloadStatuses.noDownload, dispatch);
    });
};

export const updateFavoriteWorkouts = (id = null) => async (
  dispatch,
  getState,
) => {
  const {
    user: {favoriteIds},
  } = getState();
  let localIds = await AsyncStorage.getItem(localKeys.favoriteWorkouts);
  localIds = localIds ? JSON.parse(localIds) : [];
  let payload = [...favoriteIds, ...localIds];
  payload = [...new Set(payload)];
  if (id !== null) {
    payload = payload.includes(id)
      ? payload.filter((i) => id != i)
      : [...payload, id];
  }
  await AsyncStorage.setItem(
    localKeys.favoriteWorkouts,
    JSON.stringify(payload),
  );
  dispatch({type: ActionTypes.UPDATE_FAVORITE_WORKOUTS, payload});
};

export const updateSelfies = (data, remove = false) => async (
  dispatch,
  getState,
) => {
  const {
    user: {selfies},
  } = getState();
  let payload = remove
    ? selfies.filter((i) => i.uri != data.uri)
    : [...selfies, data];
  await AsyncStorage.setItem(localKeys.selfies, JSON.stringify(payload));
  dispatch({type: ActionTypes.UPDATE_SELFIES, payload});
};

export const getSelfies = () => async (dispatch) => {
  let localIds = await AsyncStorage.getItem(localKeys.selfies);
  let payload = localIds ? JSON.parse(localIds) : [];
  dispatch({type: ActionTypes.UPDATE_SELFIES, payload});
};

export const getWorkoutTime = () => async (dispatch) => {
  const payload = await AsyncStorage.getItem(localKeys.workoutStartTime);

  if (payload) {
    dispatch({type: ActionTypes.UPDATE_WORKOUT_TIME, payload});
    reset(Screens.Home);
  } else {
    Splash.hide();
    localNotificationSchedule({
      id: 0,
      message: "It's time for your ab workout!",
      time: '08:00',
    });
    dispatch({type: ActionTypes.UPDATE_WORKOUT_TIME, payload: '08:00'});
  }
};

export const setWorkoutTime = (payload) => async (dispatch) => {
  const disable = await AsyncStorage.getItem(localKeys.enableWorkoutReminder);
  if (disable !== 'disable') {
    localNotificationSchedule({
      id: 0,
      message: "It's time for your ab workout!",
      time: payload,
    });
  }
  await AsyncStorage.setItem(localKeys.workoutStartTime, payload);
  dispatch({type: ActionTypes.UPDATE_WORKOUT_TIME, payload});
};

export const getPurchasedStatus = () => async (dispatch) => {
  const payload = await AsyncStorage.getItem(localKeys.purchasedFullVersion);
  dispatch({
    type: ActionTypes.UPDATE_PURCHASED_FULL_VERSION,
    payload: Boolean(payload),
  });
};

export const setPurchasedStatus = () => async (dispatch) => {
  await AsyncStorage.setItem(localKeys.purchasedFullVersion, 'true');
  dispatch({type: ActionTypes.UPDATE_PURCHASED_FULL_VERSION, payload: true});
};

export const getAlarmSchedule = () => async (dispatch) => {
  let payload = await AsyncStorage.getItem(localKeys.alarmSchedule);
  payload = payload ? JSON.parse(payload) : Alarms;
  payload.forEach((element) => {
    const {notificationId, name, reminder, time} = element;
    if (reminder) {
      localNotificationSchedule({
        id: notificationId,
        message: `It's time for your ${name}!`,
        time,
      });
    }
  });
  dispatch({type: ActionTypes.UPDATE_EAT_ALARMS, payload});
};

export const setAlarmSchedule = (payload) => async (dispatch) => {
  await AsyncStorage.setItem(localKeys.alarmSchedule, JSON.stringify(payload));
  dispatch({type: ActionTypes.UPDATE_EAT_ALARMS, payload});
};
export const setSubscribedEmail = (email) => async (dispatch) => {
  await AsyncStorage.setItem(localKeys.subscribeEmail, email);
  dispatch({type: ActionTypes.SET_SUBSCRIBE_EMAIL, payload: email});
};
export const getSubscribedEmail = () => async (dispatch) => {
  const payload = await AsyncStorage.getItem(localKeys.subscribeEmail);
  dispatch({type: ActionTypes.SET_SUBSCRIBE_EMAIL, payload});
};

export const getLatestYoutubeVideos = () => async (dispatch) => {
  database()
    .ref(`YoutubeVideos/${moment().format('YYYY-MM-DD')}`)
    .once('value')
    .then((snapshot) => {
      const data = snapshot.val();
      console.log('[getLatestYoutubeVideos]-firebase', data);
      if (data) {
        dispatch({type: ActionTypes.GET_YOUTUBE_VIDEOS, payload: data});
      } else {
        getYoutubeVideoList().then(({data, success}) => {
          if (success) {
            database()
              .ref(`YoutubeVideos/${moment().format('YYYY-MM-DD')}`)
              .set(data);
          }
          dispatch({type: ActionTypes.GET_YOUTUBE_VIDEOS, payload: data});
        });
      }
    });
};
