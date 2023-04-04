import React from 'react';
import { FlatList, Image, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import * as WorkoutImages from '../../assets/workout-images';
import { Banner, Header, VideoPlayerModal } from '../../components';
import { Colors, Images, Strings, Screens } from '../../constants';
import styles from './styles';
import moment from 'moment'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../store/actions'


const TodayWorkoutScreen = (props) => {
    const { navigation, route: { params } } = props
    const title = params?.title
    const todayWorkout = params?.todayWorkout || props.todayWorkout
    const currentDayId = params?.currentDayId || props.currentDayId
    const totalTime = params?.totalTime || props.totalTime

    const [playURI, setPlayURI] = React.useState('')
    const [visible, setVisible] = React.useState(false)
    const [isAnato, setAnato] = React.useState(false)
    const handleVideoPlay = (item, anatomyCode = false) => {
        const uri = anatomyCode ? item?.anatomyCode : item?.sampleVideoPath
        setPlayURI(uri)
        setAnato(anatomyCode)
        setVisible(true)
    }
    const renderItem = ({ item, index }) => {
        const equipImageName = item?.equipmentSound?.toLowerCase().replace(/ /g, '_')
        const icon = Images.workoutTypes[equipImageName] || Images.workoutTypes.bodyweight
        const isRest = item.exerciseName == 'Rest'

        return (
            <TouchableOpacity
                key={`${index}`}
                style={styles().item}
                activeOpacity={1}
                onPress={() => { handleVideoPlay(item, true) }}
                disabled={isRest}
            >
                <Image
                    style={styles().icon}
                    source={isRest ? null : icon}
                />
                <View style={styles().labelWrapper}>
                    <Text allowFontScaling={false} style={styles().text}>{item?.exerciseName}</Text>
                    <Text allowFontScaling={false} style={styles().time}>{`${item?.durationTime} seconds`}</Text>
                </View>
                <TouchableOpacity onPress={() => { handleVideoPlay(item) }} activeOpacity={1} disabled={isRest}>
                    <ImageBackground
                        style={styles().image}
                        source={isRest ? null : WorkoutImages[`workout${item.exerciseId}`]}
                    >
                        <Image style={styles().playicon} source={!isRest && (item.locked == 'FREE' ? Images.videoPlay : Images.lock)} />
                    </ImageBackground>
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles().container}>
            <Header
                title={title || `Day ${currentDayId}`} // Need to change according to schedule
                backWithText={title ? Strings.favorites : Strings.home}
            />
            <View style={styles().container}>
                <Banner
                    label={`${Strings.totalWorkout} ${moment(totalTime * 1000).format('mm:ss')}`}
                />
                <FlatList
                    removeClippedSubviews
                    nestedScrollEnabled
                    initialNumToRender={20}
                    style={{ width: '100%' }}
                    data={todayWorkout}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index}
                />
                <Banner
                    bottom
                    style={{ backgroundColor: Colors.red }}
                    label={Strings.startWorkout}
                    onPress={() => {
                        navigation.navigate(Screens.Workout, { title, ...params })
                    }}
                />
            </View>
            <VideoPlayerModal
                playId={playURI}
                isAnato={isAnato}
                visible={visible}
                onClose={() => { setVisible(false) }}
            />
        </View>
    );
};

const mapStateToProps = ({ user, workout }) => {
    return {
        totalTime: workout.totalTime,
        currentDayId: workout.currentDayId,
        todayWorkout: workout.todayWorkout,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ActionCreators, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(TodayWorkoutScreen);
