
import React, { useEffect } from 'react';
import { Platform, Text, View, Image, } from 'react-native';
import { Strings, Screens } from '../../constants';
import AppIntroSlider from 'react-native-app-intro-slider';
import styles from './styles'
import slides from './data'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../store/actions'
import { handleCheckPermissions } from '../../utils/permission'
import { Colors, lightTheme, Dimensions } from '../../constants';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import PushNotificationIOS from '@react-native-community/push-notification-ios'


const _renderItem = ({ item }) => {
    return (
        <View style={styles().slide}>
            <View style={styles().flex}>
                <Image source={item.image} style={styles().image} />
            </View>
            <View style={styles().flexStart}>
                <Text allowFontScaling={false} style={styles().text}>{item.text}</Text>
            </View>
        </View>
    );
}

const IntroSlides = ({ navigation, getWorkoutTime, getSubscribedEmail }) => {

    useEffect(() => {
        getWorkoutTime()
        getSubscribedEmail()
        if (Platform.OS == 'ios') {
            PushNotificationIOS.setApplicationIconBadgeNumber(0)
        }

    }, []);

    const onPressDone = () => {
        navigation.navigate(Screens.SelectWorkout)
    }

    return (
        <AppIntroSlider
            data={slides}
            renderItem={_renderItem}
            activeDotStyle={styles().activeDot}
            dotStyle={styles().dot}
            renderDoneButton={() => (
                <View style={[styles().button, styles().doneBtn]}>
                    <TouchableOpacity
                        style={styles()._doneBtn}
                        onPress={onPressDone}
                        activeOpacity={0.8}
                    >
                        <Text allowFontScaling={false} style={styles().done} >{Strings.begin}</Text>
                    </TouchableOpacity>
                </View>
            )}
            renderNextButton={() => (<View style={styles().button} />)}
            bottomButton
        />
    );
};




const mapStateToProps = ({ user }) => {
    return { user }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ActionCreators, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(IntroSlides);
