import { StyleSheet } from 'react-native';
import { Colors, lightTheme, Dimensions } from '../../constants';

const switchRate = 42 / 67

const styles = (theme = lightTheme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center'
    },
    banner: {
        borderBottomColor: Colors.gray200,
        borderBottomWidth: 0.2,
        width: Dimensions.deviceWidth,
    },
    bottomBanner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 30,
        padding: 8,
        borderTopColor: Colors.gray200,
        borderTopWidth: 0.2,
        borderBottomColor: Colors.gray200,
        borderBottomWidth: 0.2,
        width: Dimensions.deviceWidth,
    },
    itemName: {
        fontSize: 18,
        color: Colors.black,
        width: '40%'
    },
    switch: {
        height: 40 * switchRate,
        width: 40
    },
    item: {
        paddingVertical: 15,
        width: Dimensions.deviceWidth,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderBottomColor: Colors.gray200,
        borderBottomWidth: 0.2
    },
    H1: {
        fontSize: 25,
        color: Colors.black,
        alignSelf: 'center',
        marginTop: 15
    },
    H2: {
        fontSize: 20,
        color: Colors.black,
        fontWeight: "400",
        alignSelf: 'center',
    },
    choose: {
        fontWeight: "200",
        alignSelf: 'center',
        marginVertical: 5
    },
    learnmore: {
        textDecorationLine: 'underline',
        marginTop: 5,
        color: Colors.red
    }


});

export default styles