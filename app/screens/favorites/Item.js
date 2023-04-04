import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Colors, lightTheme, Dimensions, Strings, Screens } from '../../constants';
import { Header, TextButton, TimePicker, ImageButton } from '../../components';
import Images from '../../constants/images';
import { showCustomAlert } from '../../utils'
import { useNavigation } from '@react-navigation/native'
import { proDownloadStatuses } from '../../store/user/reducer'
import { DocumentDirectoryPath } from 'react-native-fs'
import { getTodayWorkout } from '../../store/workout/action'
import * as WorkoutImages from '../../assets/workout-images';

const imageWidth = Dimensions.deviceWidth * 0.3

const styles = (theme = lightTheme) => StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'space-between',
        width: Dimensions.deviceWidth,
        flexDirection: 'row',
        borderBottomColor: Colors.black,
        borderBottomWidth: 2,
        paddingHorizontal: 10,
    },
    image: {
        width: imageWidth,
        height: imageWidth * 0.7,
        marginVertical: 8,
    },
    text: {
        position: 'absolute',
        color: Colors.white,
        marginLeft: '5%',
        fontSize: 18,
        fontWeight: 'bold'
    },
    fade1: {
        position: 'absolute',
        flex: 1,
        height: '100%',
        width: Dimensions.deviceWidth,
        backgroundColor: Colors.gray200,
        opacity: 0.5
    },
    fade0: {
        position: 'absolute',
        flex: 1,
        height: '100%',
        width: Dimensions.deviceWidth,
        backgroundColor: Colors.gray150,
        opacity: 0.5
    }

});

const ItemComponent = ({
    dayId,
    fadeIndex,
    shuffles
}) => {
    const isShuffle = !Boolean(parseInt(dayId))
    const [data, setData] = useState([])
    const [workoutDetails, setWorkoutDetails] = useState({})
    const { navigate } = useNavigation()
    const title = isShuffle ? `${dayId.replace("Shuffle", "Shuffle ")}` : `Week ${parseInt(dayId / 7) + 1}, Day ${dayId % 7}`
    useEffect(() => {
        if (isShuffle) {
            getTodayWorkout(1, false, shuffles[dayId])
                .then(res => {
                    if (res.result) {
                        const payload = res.todayWorkout
                            .filter(i => i.exerciseId != '-1')
                            .filter((i, index) => index < 3)
                        setData(payload)
                        setWorkoutDetails(res)
                    } else {

                    }
                })
        } else {
            getTodayWorkout(dayId)
                .then(res => {
                    if (res.result) {
                        const payload = res.todayWorkout
                            .filter(i => i.exerciseId != '-1')
                            .filter((i, index) => index < 3)
                        setData(payload)
                        setWorkoutDetails(res)
                    } else {

                    }
                })
        }

    }, []);

    return (
        <TouchableOpacity
            style={styles().container}
            activeOpacity={1}
            onPress={() => {
                navigate(Screens.TodayWorkout, {
                    title: isShuffle ? dayId.replace("Shuffle", "Shuffle ") : `Day ${dayId}`,
                    ...workoutDetails
                })
            }}
        >
            {
                data.map(item => (
                    <Image
                        style={styles().image}
                        source={WorkoutImages[`workout${item.exerciseId}`]}
                    />
                ))
            }
            <View
                style={fadeIndex ? styles().fade1 : styles().fade0}
            />
            <Text allowFontScaling={false} style={styles().text}>{title}</Text>
        </TouchableOpacity>
    );
};



export default ItemComponent;
