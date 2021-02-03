import { StyleSheet } from 'react-native';
import { Colors, lightTheme, Dimensions } from '../../constants';
import Color from '../../color-theme/colors';

const bannerWidth = Dimensions.deviceWidth * 0.7


const styles = (theme = lightTheme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
        alignItems: 'center',
        justifyContent: 'center'
    },
    flexWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    title: {
        color: Colors.black,
        fontSize: 20,
        alignSelf: 'center',
        marginVertical: 20
    },
    adsWrapper: {
        borderRadius: 10,
        backgroundColor: Colors.white,
        width: Dimensions.deviceWidth * 0.95,
        zIndex: 0
    },
    adsImage: {
        width: bannerWidth,
        height: bannerWidth * 0.7,
        alignSelf: 'center',
        borderRadius: 3,
        resizeMode: 'contain'
    },
    text: {
        padding: 10
    },
    label: {
        color: Colors.black,
        fontSize: 16,
        fontWeight: '600'
    },
    inputWrapper: {
        height: 50,
        width: '95%',
        borderColor: Colors.gray430,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'center',
        paddingHorizontal: 5,
        borderWidth: 1,
        borderRadius: 10
    },
    button: {
        height: 45,
        borderColor: Colors.gray200,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 5,
        borderWidth: 1,
        borderRadius: 10
    },

    input: {
        fontSize: 16,
        maxWidth: '85%',
        paddingRight: 10
    },
    checkbox: {
        color: Colors.gray430,
        paddingRight: 10
    },
    privacy: {
        textDecorationLine: 'underline',
        fontSize: 16,
        margin: 10
    },
    close: {
        color: Color.gray500,
        fontSize: 40
    },
    closebutton: {
        alignSelf: 'flex-end'
    }

});

export default styles