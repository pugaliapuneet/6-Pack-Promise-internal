import { StyleSheet } from 'react-native';
import { Colors, lightTheme, Dimensions } from '../../constants';

const bannderRate = 197 / 640

const styles = (theme = lightTheme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    smoothWrappper: {
        flex: 0,
        width: Dimension.deviceWidth,
        height: 40,
        borderBottomColor: Colors.black,
        borderBottomWidth: 2,
    },
    tab: {
        width: Dimension.deviceWidth / 3,
        alignItems: 'center',
        height: 40,
        justifyContent: 'center',
    },
    tabText: {
        color: Colors.white,
        fontSize: 20
    },
    button: {
        width: Dimensions.deviceWidth,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.gray200
    },
    image: {
        width: 50,
        height: 30,
        resizeMode: 'contain'
    },
    bottomBanner: {
        width: Dimensions.deviceWidth,
        height: bannderRate * Dimensions.deviceWidth,
        alignSelf: 'flex-end'
    },
    label: {
        color: Colors.white,
        fontSize: 20,
        marginTop: 20,
        marginLeft: 15,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dot: {
        color: Colors.white,
        fontSize: 8
    },
    text: {
        marginLeft: 10,
        width: Dimensions.deviceWidth * 0.85,
        color: Colors.white,
        fontSize: 18,
        marginVertical: 5
    },
    alram: {
        width: 30,
        height: 30,
        resizeMode: 'contain'
    },
    bottomTextWrap: {
        borderTopColor: Colors.gray900,
        borderTopWidth: 8,
        paddingTop: 10,
        paddingBottom: 2
    },
    bottomText: {
        color: Colors.white,
        fontSize: 14,
        backgroundColor: Colors.gray200,
        width: Dimensions.deviceWidth,
        textAlign: 'center',
        paddingVertical: 3
    }
});

export default styles