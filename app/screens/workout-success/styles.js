import { StyleSheet } from 'react-native';
import { Colors, lightTheme, Dimensions } from '../../constants';

import { isIphoneX } from 'react-native-iphone-x-helper'

export const screenTop = () => {
    if (isIphoneX()) return { paddingTop: 35 }
    if (Platform.OS === 'ios') return { paddingTop: 20 }
    return {}
}

const { calH, calW } = Dimensions




const styles = (theme = lightTheme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
        alignItems: 'center',
        justifyContent: 'flex-start',
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
    timeProgress: {
        width: Dimensions.deviceWidth,
        alignItems: 'center',
        justifyContent: 'center',
        height: calH(35),
        backgroundColor: 'grey'
    },
    slide: {
        height: calH(500),
    },
    finishedWrapper: {
        backgroundColor: Colors.white,
        width: Dimensions.deviceWidth,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20
    },
    finished: {
        color: Colors.black,
        fontSize: 30
    },
    favoriteContainer: {
        height: calH(80),
        alignItems: 'center',
        justifyContent: 'center',
    },
    favoriteBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    favorite: {
        width: 30,
        height: 30,
    },
    favoriteText: {
        fontSize: 18,
        color: Colors.white,
        marginLeft: 5
    },
    successContainer: {
        height: calH(300),
        borderBottomWidth: 1,
        borderBottomColor: Colors.white,
        justifyContent: 'space-between'
    },
    successBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    successImage: {
        width: calW(80),
        height: calW(80)
    },
    successText: {
        marginTop: 10,
        color: Colors.white,
        fontSize: 18
    },
    bragBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        flexDirection: 'row'
    },
    bragText: {
        color: Colors.white,
        fontSize: 20,
        fontWeight: 'bold',
    },
    brag: {
        marginLeft: 10,
        width: 30,
        height: 30,
        resizeMode: 'contain',
        tintColor: Colors.white
    }


});

export default styles