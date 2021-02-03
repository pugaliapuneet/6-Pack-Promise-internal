import { StyleSheet } from 'react-native';
import { Colors, lightTheme, Dimensions } from '../../constants';
import Color from '../../color-theme/colors';
import { Right } from 'native-base';

const headerIconWidth = 25
const logoRate = 265 / 88

const styles = (theme = lightTheme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: 40 * logoRate,
        height: 40
    },
    bannerContainer: {
        width: Dimensions.deviceWidth,
        flex: 3
    },
    banner: {
        width: Dimensions.deviceWidth,
        flex: 1,
        resizeMode:'contain'
    },
    bottomContainer: {
        flex: 4,
        paddingHorizontal: 20,
        paddingVertical: 30,
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    headerStyle: {
        backgroundColor: Colors.black,
        flexDirection: 'row'
    },
    search: {
        padding: 10
    },
    headerIcon: {
        height: headerIconWidth,
        width: headerIconWidth
    },
    smallBanner: {
        flex: 0,
        height: 35,
        backgroundColor: Colors.red,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bannerText: {
        color: theme.text,
        fontSize: 18,
        fontWeight: '600'
    },
    itemImage: {
        width: Dimensions.px40,
        height: Dimensions.px40
    },
    itemStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '33.3%',
        height: Dimensions.deviceHeight * 0.23,
        borderColor: Colors.gray200
    },
    itemLabel: {
        color: theme.text,
        fontSize: 18,
        fontWeight: '600',
        marginTop: 10
    }
});

export default styles