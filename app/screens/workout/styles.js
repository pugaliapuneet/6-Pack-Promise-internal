import { StyleSheet } from 'react-native';
import { Colors, lightTheme, Dimensions } from '../../constants';
import Color from '../../color-theme/colors';
import { isIphoneX } from 'react-native-iphone-x-helper'

export const screenTop = () => {
    if (isIphoneX()) return { paddingTop: 35 }
    if (Platform.OS === 'ios') return { paddingTop: 20 }
    return {}
}

const { calH, calW } = Dimensions

const bannerWidth = Dimensions.deviceWidth * 0.7


const styles = (theme = lightTheme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
        // alignItems: 'center',
        // justifyContent: 'flex-start',
    },
    progress: {
        height: '100%',
        width: '70%',
        backgroundColor: Colors.red,
        position: 'absolute',
        alignSelf: 'flex-start'
    },
    totalTime: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        zIndex: 1
    },
    titleBanner: {
        backgroundColor: Colors.gray200,
        height: calH(32),
        width: Dimensions.deviceWidth,
        alignItems: 'center',
        justifyContent: 'center'
    },
    backgroundVideo: {
        width: Dimensions.deviceWidth,
        height: calH(255),
        alignItems:'center',
        justifyContent:'center'
    },
    timeProgress: {
        width: Dimensions.deviceWidth,
        alignItems: 'center',
        justifyContent: 'center',
        height: calH(35),
    },
    slide: {
        height: calH(500),
    },
    timerWrapper: {
        width: Dimensions.deviceWidth,
        paddingTop: 20,
        paddingBottom: 5,
        backgroundColor: '#dcdcdc',
        alignItems: 'center',
        justifyContent: 'center',
        height: calH(100),
    },
    secondsView: {
        width: calW(80),
        alignItems: 'center',
        justifyContent: 'center'
    },
    seconds: {
        fontWeight: '700',
        fontSize: calW(40)
    },
    refreshBtn: {
        position: 'absolute',
        right: -30,
        top: 0
    },
    refresh: {
        width: 25,
        height: 25,
        resizeMode: 'contain'
    },
    workoutPlay: {
        width: calH(30),
        height: calH(30),
        resizeMode: 'contain',
        margin: calH(10)
    },
    playController: {
        width: Dimensions.deviceWidth,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 2,
        borderBottomColor: Colors.white,
        height: calH(80),
    }

});

export default styles