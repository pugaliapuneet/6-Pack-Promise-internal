import { StyleSheet } from 'react-native';
import { Colors, lightTheme, Dimensions } from '../../constants';

const width = Dimensions.deviceWidth * 0.8

const styles = (theme = lightTheme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadImage: {
        width: width,
        height: width * 0.6,
        marginVertical: 30,
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode: 'stretch'
    },
    playImage: {
        width: 40,
        height: 40,
        resizeMode: 'contain'
    },
    smallBanner: {
        flex: 0,
        height: 35,
        width: Dimensions.deviceWidth,
        backgroundColor: Colors.red,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bannerText: {
        color: theme.text,
        fontSize: 18,
        fontWeight: '600'
    },
    button: {
        backgroundColor: Colors.white,
        width,
        height: 35,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        alignSelf: 'center',
        marginBottom: 50
    },

    buttonTxt: {

    },
    backgroundVideo: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
    },
    itemTxt: {
        color: Colors.white
    },
    itemBtn: {
        width: Dimensions.deviceWidth * 0.9,
        paddingVertical: 20,
        borderBottomColor: Colors.gray150,
        borderBottomWidth: 3
    },   

});

export default styles