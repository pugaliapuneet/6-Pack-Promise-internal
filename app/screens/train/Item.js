import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Colors, lightTheme, Dimensions, Strings, Screens } from '../../constants';
import { Header, TextButton, TimePicker, ImageButton } from '../../components';
import Images from '../../constants/images';
import { showCustomAlert } from '../../utils'
import { useNavigation } from '@react-navigation/native'
import { proDownloadStatuses } from '../../store/user/reducer'
import { DocumentDirectoryPath } from 'react-native-fs'

const styles = (theme = lightTheme) => StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
        width: Dimensions.deviceWidth,
        height: 65,
        flexDirection: 'row',
        borderBottomColor: Colors.black,
        borderBottomWidth: 2,
        paddingHorizontal: 10,
    },
    text: {
        color: theme.text,
        fontSize: 18,
        fontWeight: '600'
    },
    rest: {
        color: theme.text,
        fontSize: 18,
        fontWeight: '600',
    },
    button: {
        width: 110,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.white,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        paddingVertical: 8,
    },
    buttonLabel: {
        color: theme.text,
        fontSize: 18
    },
    checked: {
        width: 32,
        height: 32
    },

});

const ItemComponent = ({
    allDays,
    indexSelected,
    currentDayId,
    name,
    isLast,
    day,
    setTodayWorkout,
    setVisibleUpgradePro,
    isPurchasedFullVersion,
    downloadStatus,
    setVisibleDownload,
    completeWorkoutId
}) => {
    const { navigate } = useNavigation()
    const dayId = (indexSelected * 7 + day)
    const dayIndex = dayId - 1
    const dayExerciseData = allDays[dayIndex]
    const isChecked = (completeWorkoutId == dayId && currentDayId == dayId) || (dayId < currentDayId)
    const isRest = dayExerciseData?.training_Namber == 0
    const moveWorkoutAlert = () => {
        showCustomAlert(
            '',
            Strings.areYouSureYouWantToMove(indexSelected + 1, day),
            Strings.cancel,
            Strings.yes,
            () => {
                setTodayWorkout(dayId)
            })
    }
    const downloadAndNormalActions = () => {
        if (downloadStatus != proDownloadStatuses.unzipped) {
            setVisibleDownload(true)
            return
        }
        if (currentDayId == dayId) {
            if (isRest) return
            navigate(Screens.TodayWorkout)
            return
        }
        if (dayIndex != 56) {
            moveWorkoutAlert()
        }
    }
    const handleOnPress = () => {
        if (dayIndex < 7) {
            if (currentDayId == dayId) {
                if (isRest) return
                navigate(Screens.TodayWorkout)
            } else {
                moveWorkoutAlert()
            }
            // } else if (isPurchasedFullVersion || __DEV__) {
        } else if (isPurchasedFullVersion) {
            downloadAndNormalActions()
        } else {
            setVisibleUpgradePro(true)
        }
    }
    return (
        <TouchableOpacity
            style={[styles().container, isLast && { borderBottomColor: 0 }, dayId == currentDayId && { backgroundColor: Colors.red }]}
            activeOpacity={0.9}
            onPress={handleOnPress}
        >
            <Text allowFontScaling={false} style={styles().text}>{`Day ${name + 1}`}</Text>
            {isRest ? <Text allowFontScaling={false} style={styles().rest}>{Strings.rest}</Text> :
                <ImageButton
                    imageStyle={styles().checked}
                    source={isChecked ? Images.checked : Images.unchecked}
                    onPress={handleOnPress}
                />
            }
        </TouchableOpacity>
    );
};



export default ItemComponent;
