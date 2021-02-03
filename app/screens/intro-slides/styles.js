import { StyleSheet } from 'react-native';
import { Colors, lightTheme, Dimensions } from '../../constants';

const imageWidth = Dimensions.deviceWidth * 0.8

const styles = (theme = lightTheme) => StyleSheet.create({
    slide: {
        flex: 1,
        backgroundColor: theme.background
    },
    image: {
        width: imageWidth,
        height: imageWidth * 0.75,
        alignSelf: 'center',
        resizeMode: 'contain'
    },
    flex: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flexStart: {
        flex: 1,
    },
    text: {
        margin: 20,
        color: theme.text,
        lineHeight: 25
    },
    done: {
        color: theme.text,
        fontSize: 18,
        fontWeight: '600'
    },
    button: {
        margin: 10,
        height: 45,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    activeDot: {
        backgroundColor: theme.activeDot,
    },
    dot: {
        backgroundColor: theme.dot
    },
    doneBtn: {
        width: Dimensions.deviceWidth * 0.8,
        backgroundColor: 'green',
        top: Dimensions.deviceHeight * 0.35,
        zIndex: 1000000
    },
    _doneBtn: {
        width: Dimensions.deviceWidth * 0.8,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
});

export default styles