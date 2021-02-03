import React, { useEffect, createRef } from 'react';
import { Text, View, BackHandler, ActivityIndicator, Platform } from 'react-native';
import styles from './styles'
import { Strings, Images, Screens, Colors, Dimensions } from '../../constants';
import { Header, ImageButton, Banner } from '../../components'
import { Icon } from 'native-base'
import Video from "react-native-video"
import Swiper from 'react-native-swiper'
import moment from 'moment'
import _ from 'lodash'
import * as Videos from '../../assets/videos'
import * as Mp3files from '../../assets/sounds'
import { DocumentDirectoryPath } from 'react-native-fs'
import { showAlert, usePrevious } from '../../utils/index'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../store/actions'
import { sendToSlack } from '../../utils/slack';
import BackgroundTimer from 'react-native-background-timer';
import EndWorkoutSheet from './EndWorkoutSheet'
import AsyncStorage from "@react-native-community/async-storage"
import localKeys from '../../helpers/local-storage-keys'
import ActionSheet from "react-native-actions-sheet";
import { reset } from '../../navigation/RootNavigation';
import Tts from 'react-native-tts';
import FreeTalking from './speech'


const getStartAudios = (todayWorkout) => {
    let equipmentArray = [
        "1_WelcomeToSixPackPromise",
        ...todayWorkout.filter(i => i.equipmentSound != "Bodyweight").map(i => (i.equipmentSound.toUpperCase().replace(/ /g, '_')))
    ]
    equipmentArray = [...new Set(equipmentArray)]
    return equipmentArray.length > 1 ? equipmentArray : ['1_WelcomeToSixPackPromise', 'BODYWEIGHT']
}
const WorkoutScreen = (props) => {
    const { navigation, route: { params }, currentShuffleId } = props
    const title = params?.title
    const isShuffle = params?.isShuffle || false
    const todayWorkout = params?.todayWorkout || props.todayWorkout
    const currentDayId = params?.currentDayId || props.currentDayId
    const totalTime = params?.totalTime || props.totalTime
    const workoutTimes = params?.workoutTimes || props.workoutTimes


    const swipeRef = React.createRef();
    const [pause, setPause] = React.useState(true)
    const [selectedIndex, setSelectedIndex] = React.useState(0)
    const [pausedSeconds, setPausedSeconds] = React.useState(0)
    const [timeData, setTimeData] = React.useState({ passed: 0, seconds: workoutTimes[0] })
    const { passed, seconds } = timeData
    const [playComplSound, setComplSound] = React.useState(false)
    const [playBeepSound, setPlayBeepSound] = React.useState(false);
    const [visibleModal, setVisibleModal] = React.useState(false);


    useEffect(() => {
        AsyncStorage.getItem(localKeys.showedMusicPopup).then(
            payload => {
                if (!payload) {
                    AsyncStorage.setItem(localKeys.showedMusicPopup, "success").then(success => {
                        showAlert(Strings.ok, Strings.addMusic, Strings.workoutToYourFavoriteSongs)
                    })
                }
            }
        )
        return () => {

        }
    }, []);

    useEffect(() => {
        BackgroundTimer.runBackgroundTimer(
            () => {
                if (!pause) {
                    setTimeData(state => state.seconds == 0 ? state : ({ seconds: state.seconds - 1, passed: state.passed + 1 }));
                } else {
                    !playVideo && setPausedSeconds(state => state + 1);
                }
            },
            1000
        );
        return () => {
            BackgroundTimer.stopBackgroundTimer()
        }
    }, [pause, playVideo]);

    useEffect(() => {
        if (passed == (totalTime - 1)) {
            setPlayBeepSound(true);
        }
        if (passed == totalTime) {
            if (playComplSound !== 'done') {
                setComplSound(true);
            }
            return
        }
        const exerciseEndTime = _.sum(workoutTimes.filter((d, i) => i <= selectedIndex))
        if (passed == (exerciseEndTime - 1)) {
            setPlayBeepSound(true);
        }
        if (passed == exerciseEndTime) {
            swipeRef.current.scrollBy(1)
        }
    }, [passed]);

    const [playPauseSound, setPlayPauseSound] = React.useState(null)
    const oldPausedSeconds = usePrevious(pausedSeconds)
    const mp3Pauseed20 = Mp3files.mp_pause20
    const mp3Pauseed60 = Mp3files.mp_pause60

    useEffect(() => {
        if (!pause) {
            setPausedSeconds(0);
            setPlayPauseSound(null)
        } else {
            if (pausedSeconds == 20 && oldPausedSeconds == 19) {
                setPlayPauseSound('20')
                return
            }
            if (pausedSeconds == 60 && oldPausedSeconds == 59) {
                setPlayPauseSound('60')
                return
            }

            if (pausedSeconds == 25 || pausedSeconds == 65) {
                setPlayPauseSound(null)
            }
        }
    }, [pausedSeconds, pause]);


    const changeVideo = (index) => {
        setSelectedIndex(index)
        setPauseNameSound(false)
        setPause(true)
        setVideoPlay(true)
        setTimeData({
            passed: _.sum(workoutTimes.filter((d, i) => i < index)),
            seconds: workoutTimes[index]
        })
    }

    const [playLeftSound, setPlayLeftSound] = React.useState(null)
    const mp3Left30 = Mp3files.mp_11_30SecondsLeft
    const mp3Left10 = Mp3files.mp_13_10SecondsLeft
    const oldSeconds = usePrevious(seconds)
    useEffect(() => {
        if (seconds == 30 && oldSeconds == 31) {
            setPlayLeftSound('30')
            return
        }
        if (seconds == 10) {
            setPlayLeftSound('10')
            return
        }
        if (seconds == 28 || seconds == 8) {
            setPlayLeftSound(null)
        }
    }, [seconds, pause]);

    let equipmentArray = getStartAudios(todayWorkout)
    const [playVideo, setVideoPlay] = React.useState(true)
    const [pauseStartSound, setPauseStartSound] = React.useState(false)
    const [pauseNameSound, setPauseNameSound] = React.useState(true)
    const [audioIndex, setAudioIndex] = React.useState(0)

    const startAudioSource = Mp3files[`mp_${equipmentArray[audioIndex]}`] || { uri: `${DocumentDirectoryPath}/${equipmentArray[audioIndex]}.mp3` }
    const exerciseNameSound = todayWorkout[selectedIndex]?.exerciseNameSound || 'silence'
    const nameAudioSource = Mp3files[`mp_${exerciseNameSound}`] || { uri: `${DocumentDirectoryPath}/${exerciseNameSound}.mp3` }

    const shouldDuck = visibleModal === true ? false :
        (
            !Boolean(pauseStartSound) ||
            !Boolean(pauseNameSound) ||
            Boolean(playLeftSound) ||
            Boolean(playBeepSound) ||            
            Boolean(playPauseSound) && Boolean(pauseStartSound) && Boolean(pauseNameSound) ||
            playComplSound === true
        )
    const androidDucking = (shouldDuck) => {
        try {
            Tts.stop();
            Tts.setDucking(shouldDuck);
            Tts.speak(shouldDuck ? FreeTalking : 'Stop Ducking', {
                androidParams: {
                    KEY_PARAM_VOLUME: 0.0001,
                    KEY_PARAM_STREAM: 'STREAM_MUSIC',
                },
            });
            sendToSlack({ shouldDuck })
        } catch (error) {
            sendToSlack({ shouldDuck, error })
        }
    }
    useEffect(() => {
        if (Platform.OS === 'android') {
            androidDucking(shouldDuck);
        }
    }, [shouldDuck]);

    const renderItem = (item, index) => {
        const { sampleVideoPath, exerciseId, exerciseName } = item
        const isRest = exerciseName == 'Rest'
        const source = Videos[`video${isRest ? "Rest" : (sampleVideoPath ? sampleVideoPath : 17)}`] || { uri: `${DocumentDirectoryPath}/${sampleVideoPath}.mp4` }
        return (
            <View key={`${exerciseId}-${index}`} style={styles().slide} >
                {
                    selectedIndex === index ?
                        <Video
                            playInBackground={true}
                            mixWithOthers={shouldDuck ? 'duck' : "mix"}
                            rate={1}
                            resizeMode={'contain'}
                            repeat
                            paused={!playVideo}
                            source={source}
                            style={styles().backgroundVideo}
                            onError={(error) => {
                                sendToSlack({ type: "[VIDEO-ERROR]", isShuffle, source, error })
                            }}
                            onEnd={() => { }}
                        /> :
                        <View style={styles().backgroundVideo}><ActivityIndicator size={'large'} color={'white'} /></View>
                }
                <View style={styles().titleBanner}>
                    <Text allowFontScaling={false} style={{ color: 'white', fontSize: 16, }}>{exerciseName}</Text>
                </View>
                <View style={styles().timerWrapper}>
                    <View style={styles().secondsView}>
                        <Text allowFontScaling={false} style={styles().seconds}>{seconds}</Text>
                        <Text allowFontScaling={false} >Seconds</Text>
                        <ImageButton
                            imageStyle={styles().refresh}
                            source={Images.refreshWorkout}
                            style={styles().refreshBtn}
                            onPress={() => {
                                changeVideo(index)
                            }}
                        />
                    </View>
                </View>
                <View style={styles().playController}>
                    <ImageButton
                        imageStyle={[
                            styles().workoutPlay, { opacity: Boolean(passed) ? pauseNameSound ? 1 : 0.3 : 0.3 }
                        ]}
                        source={Images.workoutPlay(passed ? pauseNameSound ? pause : false : false)}
                        disabled={!Boolean(passed) || !pauseNameSound}
                        onPress={() => {
                            setPause(!pause)
                            setVideoPlay(!playVideo)
                        }}
                    />
                </View>
            </View>
        )
    }

    const actionSheetRef = createRef();
    const openWorkoutEndModal = () => {
        setVisibleModal(true);
        actionSheetRef.current?.setModalVisible();
    }
    const backAction = () => {
        openWorkoutEndModal();
        return true;
    };

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);
        return () =>
            BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);


    return (
        <View style={styles().container}>
            <Header
                title={(title && `${title} Workout`) || (isShuffle ? `Shuffle ${currentShuffleId} Workout` : `Day ${currentDayId} Workout`)}
                backWithText={"   "}
                leftAction={() => {
                    openWorkoutEndModal();
                }}
            />
            <View style={styles().container}>
                <View style={styles().timeProgress}>
                    <Text allowFontScaling={false} style={styles().totalTime}>Total Time Remaining: {moment((totalTime - passed) * 1000).format('mm:ss')}</Text>
                    <View style={[styles().progress, { width: `${100 * passed / totalTime}%` }]} />
                </View>
                <View style={styles().slide}>
                    <Swiper
                        ref={swipeRef}
                        loop={false}
                        scrollEnabled={Boolean(passed)}
                        activeDotColor={Colors.red}
                        dotColor={Colors.dotColor}
                        paginationStyle={{ position: 'absolute', bottom: Dimensions.calH(10) }}
                        onIndexChanged={(index) => changeVideo(index)}
                    >
                        {todayWorkout.map(renderItem)}
                    </Swiper>
                </View>
                <Banner
                    style={{ backgroundColor: Colors.red }}
                    label={Strings.endWorkout}
                    onPress={() => {
                        openWorkoutEndModal();
                    }}

                />
                {
                    !Boolean(pauseStartSound) &&
                    <Video
                        playInBackground={true}
                        mixWithOthers={'duck'}
                        key={`start-sound`}
                        source={startAudioSource}
                        paused={pauseStartSound}
                        onError={(error) => {

                        }}
                        onEnd={() => {
                            if (audioIndex == equipmentArray.length - 1) {
                                setPauseStartSound(true)
                                setPauseNameSound(false)
                            }
                            if (audioIndex < equipmentArray.length) {
                                setAudioIndex(audioIndex + 1)
                            }
                        }}
                    />
                }
                {
                    !Boolean(pauseNameSound) &&
                    <Video
                        playInBackground={true}
                        mixWithOthers={'duck'}
                        key={`audio-${selectedIndex}`}
                        source={nameAudioSource}
                        paused={pauseNameSound}
                        onError={(error) => {

                        }}
                        onEnd={() => {
                            Tts.stop()
                            setPause(false)
                            setPauseNameSound(true)
                        }}
                    />
                }
                {
                    Boolean(playLeftSound) &&
                    <Video
                        playInBackground={true}
                        mixWithOthers={'duck'}
                        key={`left-sound`}
                        source={playLeftSound == 30 ? mp3Left30 : mp3Left10}
                        onError={(error) => {

                        }}
                        onEnd={() => {
                            Tts.stop()
                        }}
                    />
                }
                {
                    Boolean(playPauseSound) && Boolean(pauseStartSound) && Boolean(pauseNameSound) &&
                    <Video
                        playInBackground={true}
                        mixWithOthers={'duck'}
                        key={`pause-sound`}
                        source={playPauseSound == 20 ? mp3Pauseed20 : mp3Pauseed60}
                        onError={(error) => {

                        }}
                        onEnd={() => {
                            Tts.stop()
                        }}
                    />
                }
                {
                    playComplSound === true &&
                    <Video
                        playInBackground={true}
                        mixWithOthers={'duck'}
                        key={`compl-sound`}
                        repeat={false}
                        source={Mp3files.mp_compl}
                        onError={(error) => {

                        }}
                        onEnd={() => {
                            Tts.stop();
                            setComplSound('done');
                            setTimeout(() => {
                                reset(Screens.WorkoutSuccess, { title, isShuffle, currentDayId })
                            }, 200);
                        }}

                    />
                }
                {
                    Boolean(playBeepSound) &&
                    <Video
                        playInBackground={true}
                        mixWithOthers={'duck'}
                        key={`beep-sound`}
                        source={Mp3files.mp_beep_sound}
                        onEnd={() => {                        
                            setPlayBeepSound(false);
                        }}

                    />
                }
            </View>
            <ActionSheet ref={actionSheetRef} containerStyle={{ backgroundColor: 'transparent' }}>
                <EndWorkoutSheet
                    onClose={() => {
                        actionSheetRef.current?.setModalVisible();
                        setVisibleModal(false);
                    }}
                    onEnd={() => {
                        Tts.stop()
                        setTimeout(() => {
                            navigation.goBack()
                        }, 200);
                        actionSheetRef.current?.setModalVisible();
                    }}
                />
            </ActionSheet>
        </View>
    );
};



const mapStateToProps = ({ user, workout, shuffle: { currentShuffleId } }) => {
    const { workoutTimes, totalTime, todayWorkout, currentDayId } = workout
    return {
        workoutTimes, totalTime, todayWorkout, currentDayId, currentShuffleId
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ActionCreators, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(WorkoutScreen);
