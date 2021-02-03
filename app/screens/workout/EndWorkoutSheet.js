import React from 'react';
import {
    Modal,
    StyleSheet,
    View,
    SafeAreaView
} from 'react-native';
import { Colors, Dimensions, lightTheme } from '../../constants';
import { TextButton } from '../../components';
import { isIphoneX } from 'react-native-iphone-x-helper'

const width = Dimensions.deviceWidth * 0.96;

const styles = (theme = lightTheme) =>
    StyleSheet.create({
        container: {
            width: Dimensions.deviceWidth,           
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingBottom: isIphoneX() ? 30 : 0
        },

        endworkout: {
            color: 'red'
        },
        cancel: {
            color: 'blue'
        },
        button: {
            backgroundColor: 'white',
            borderRadius: 5,
            width,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            marginBottom: 10
        }

    });

const EndWorkoutModal = ({ visible, onClose, onEnd }) => {

    return (
        <View
            activeOpacity={1}
            style={styles().container}
            onPress={() => { onClose() }}>
            <TextButton
                name={'End Workout'}
                style={styles().button}
                textStyle={styles().endworkout}
                onPress={() => { onEnd(); }}
                activeOpacity={0.7}
            />
            <TextButton
                name={'Cancel'}
                style={styles().button}
                textStyle={styles().cancel}
                onPress={() => { onClose(); }}
                activeOpacity={0.7}
            />
        </View>
    );
};

export default EndWorkoutModal;
