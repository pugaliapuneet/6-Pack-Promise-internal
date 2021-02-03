import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { Header, TextButton, UpgradeProModal, DownloadModal } from '../../components';
import { Strings, Colors, Dimensions, lightTheme } from '../../constants';
import styles from './styles';
import TrainItem from './Item'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../store/actions'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { ScrollView } from 'react-native-gesture-handler';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

const Weeks = [1, 1, 2, 3, 4, 5, 6, 7, 8, 8]
const Days = [1, 2, 3, 4, 5, 6, 7]

const TrainScreen = ({
    navigation,
    completeWorkoutId,
    currentDayId,
    allDays,
    setTodayWorkout,
    user,
    setPurchasedStatus
}) => {

    const [visibleUpgradePro, setVisibleUpgradePro] = useState(false)
    const [visibleDownload, setVisibleDownload] = useState(false)
    const [indexSelected, setIndexSelected] = useState(1)
    const flatlistRef = React.useRef(null)


    const handleChange = (index, animated = true) => {

        if (index == 0 || index == 9) return null
        setIndexSelected(index);
        flatlistRef.current.scrollToIndex({ index: index - 1, animated })
    }

    useEffect(() => {
        setTimeout(() => {
            try {
                handleChange(parseInt(currentDayId / 7) + 1, false)
            } catch (error) {

            }
        }, 250);
    }, [])

    const onSwipe = (value) => {
        handleChange(indexSelected + value)
    }
    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };
    return (
        <View style={styles().container}>
            <Header
                title={Strings.train}
                backWithText={Strings.home}
            />
            <View style={styles().container}>
                <View style={styles(lightTheme).smoothWrappper}>
                    <FlatList
                        ref={flatlistRef}
                        data={Weeks}
                        horizontal
                        renderItem={({ item, index }) => (
                            <TextButton
                                key={`Week ${index + 1}`}
                                name={(index == 0 || index == 9) ? '' : `Week ${item}`}
                                style={styles().tab}
                                textStyle={[
                                    styles().tabText, index == indexSelected && { color: Colors.red }
                                ]}
                                onPress={() => handleChange(index)}
                            />
                        )}
                        keyExtractor={item => `${item}-list`}
                    />
                </View>
                <GestureRecognizer
                    onSwipeLeft={(state) => indexSelected != 8 && onSwipe(1)}
                    onSwipeRight={(state) => indexSelected != 1 && onSwipe(-1)}
                    config={config}
                    style={{ flex: 1 }}
                >
                    {Days.map((item, index) => (
                        <TrainItem
                            {...user}
                            key={`index-${index}`}
                            name={index}
                            indexSelected={indexSelected - 1}
                            currentDayId={currentDayId}
                            completeWorkoutId={completeWorkoutId}
                            setTodayWorkout={setTodayWorkout}
                            allDays={allDays}
                            day={item}
                            setVisibleUpgradePro={setVisibleUpgradePro}
                            setVisibleDownload={setVisibleDownload}
                        />
                    ))}
                </GestureRecognizer>

            </View>
            <UpgradeProModal
                visible={visibleUpgradePro}
                onClose={() => setVisibleUpgradePro(false)}
                setVisibleDownload={setVisibleDownload}
                setPurchasedStatus={setPurchasedStatus}
            />
            <DownloadModal
                visible={visibleDownload}
                onClose={() => setVisibleDownload(false)}
            />
        </View>
    );
};




const mapStateToProps = ({ user, workout }) => {
    return {
        user,
        workout,
        completeWorkoutId: workout.completeWorkoutId,
        allDays: workout.allDays,
        currentDayId: workout.currentDayId,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ActionCreators, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(TrainScreen);
