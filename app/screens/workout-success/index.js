import moment from 'moment';
import React, { useEffect } from 'react';
import { Text, View, Image, Share } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Banner, Header, TextButton, UpgradeProModal, DownloadModal } from '../../components';
import { Colors, Screens, Strings } from '../../constants';
import { ActionCreators } from '../../store/actions';
import styles from './styles';
import Images from '../../constants/images';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { reset } from '../../navigation/RootNavigation'
import { safeGetOr } from '../../utils/fp';


const WorkoutSuccessScreen = (props) => {
    const {
        route: { params },
        favoriteIds,
        updateFavoriteWorkouts,
        setCompleteWorkoutId,
        shuffle,
        setCurrentShuffleId,
        currentShuffleId,
        updatePreDefinedShuffles,
        setTodayWorkout
    } = props
    const currentDayId = params?.currentDayId || props.currentDayId
    const title = params?.title
    const isShuffle = params?.isShuffle
    const isPurchasedFullVersion = safeGetOr(false, 'user.isPurchasedFullVersion')(props)
    const [visibleUpgradePro, setVisibleUpgradePro] = React.useState(false)
    const [visibleDownload, setVisibleDownload] = React.useState(false)


    useEffect(() => {        
        if (!isPurchasedFullVersion) {
            setTimeout(() => {
                setVisibleUpgradePro(true)
            }, 1000);
        }
        if (!title) {
            if (isShuffle) {
                setCurrentShuffleId(parseInt(currentShuffleId) + 1)
            } else {
                setCompleteWorkoutId(props.currentDayId)
            }
        }
        updateFavoriteWorkout()

    }, []);

    const updateFavoriteWorkout = async () => {
        if (!title && !isShuffle) {
            await setTodayWorkout(props.currentDayId + 1, true)
        }
    }

    const appShare = async () => {
        try {
            await Share.share({
                url: 'http://tinyurl.com/ox2yzsh',
                message: Strings.appShareDescription,
            });
        } catch (error) {
        }
    }
    const updateFavorite = () => {
        if (title && title.includes('Shuffle')) {
            const shuffleId = title.replace("Shuffle ", "Shuffle")
            updateFavoriteWorkouts(shuffleId)
            return
        }

        if (isShuffle) {
            const shuffleId = `Shuffle${currentShuffleId - 1}`
            updateFavoriteWorkouts(`Shuffle${currentShuffleId - 1}`)
            updatePreDefinedShuffles({ [shuffleId]: shuffle })
        } else {
            updateFavoriteWorkouts(currentDayId)
        }
    }

    const isFavorite = favoriteIds.includes(isShuffle ? `Shuffle${currentShuffleId - 1}` :
        (title && title.includes('Shuffle') ? title.replace("Shuffle ", "Shuffle") : currentDayId))

    return (
        <View style={styles().container}>
            <Header
                title={(title && `${title} Workout`) || (isShuffle ? `Shuffle ${currentShuffleId - 1} Workout` : `Day ${currentDayId} Workout`)}
                backWithText={Screens.Home}
                resetRoot
            />
            <View style={styles().container}>
                <View style={styles().timeProgress}>
                    <Text allowFontScaling={false} style={styles().totalTime}>{"Total Time Remaining: 0:00 Min"}</Text>
                </View>
                <View style={styles().slide}>
                    <View style={styles().favoriteContainer}>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={styles().favoriteBtn}
                            onPress={() => { updateFavorite() }}
                        >
                            <Image
                                source={Images.favorite(isFavorite)}
                                style={styles().favorite}
                            />
                            <Text allowFontScaling={false} style={styles().favoriteText} >{isFavorite ? Strings.workoutFavorited : Strings.favoriteThisWorkout}</Text>
                        </TouchableOpacity>
                    </View>
                    <TextButton
                        disabled
                        name={Strings.finished}
                        style={styles().finishedWrapper}
                        textStyle={styles().finished}
                    />
                    <View style={styles().successContainer}>
                        <View style={styles().successBtn}>
                            <Image
                                source={Images.success}
                                style={styles().successImage}
                            />
                            <Text allowFontScaling={false} style={styles().successText} >{Strings.yourProgressHas}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles().bragBtn}
                            onPress={appShare}
                        >
                            <Text allowFontScaling={false} style={styles().bragText} >{Strings.brag}</Text>
                            <Image
                                source={Images.brag}
                                style={styles().brag}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <Banner
                    style={{ backgroundColor: Colors.red }}
                    label={Strings.endWorkout}
                    onPress={() => {
                        reset(Screens.Home)
                    }}
                />
            </View>
            <UpgradeProModal
                visible={visibleUpgradePro}
                onClose={() => setVisibleUpgradePro(false)}
                setVisibleDownload={setVisibleDownload}
                setPurchasedStatus={props.setPurchasedStatus}
            />
            <DownloadModal
                visible={visibleDownload}
                onClose={() => setVisibleDownload(false)}
            />
        </View>
    );
};



const mapStateToProps = ({ user, workout, shuffle: { shuffle, currentShuffleId } }) => {
    return {
        shuffle,
        currentShuffleId,
        user,
        favoriteIds: user.favoriteIds,
        currentDayId: workout.currentDayId
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ActionCreators, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(WorkoutSuccessScreen);
