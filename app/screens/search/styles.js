import { StyleSheet } from 'react-native';
import { Colors, lightTheme, Dimensions } from '../../constants';


const styles = (theme = lightTheme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5
    },
    search: {
        width: 25,
        height: 25
    },
    cancelButton: {
        width: Dimensions.deviceWidth * 0.22,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchWrapper: {
        width: Dimensions.deviceWidth * 0.78,
        height: 40,
        backgroundColor: Colors.white,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 5
    },
    input: {
        width: Dimensions.deviceWidth * 0.8 - 50,
        fontSize: 14,
        color: Colors.black
    },
    item: {
        paddingVertical: 8,
        width: Dimensions.deviceWidth,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderBottomColor: Colors.gray200,
        borderBottomWidth: 2
    },
    labelWrapper: {
        paddingHorizontal: 10,
        width: '70%'
    },
    text: {
        color: theme.text,
        fontSize: 16,
        fontWeight: '800',
    },
    time: {
        marginTop: 5,
        color: Colors.red,
        fontSize: 12
    },
    cancel: {
        color: Colors.red,
        fontSize: 15
    },
    icon: {
        width: 30,
        height: 30
    },
    image: {
        width: 60,
        height: 40,
        alignItems:'center',
        justifyContent:'center'
    },
    playIcon:{
        width: 20,
        height: 20,
        resizeMode:'contain'
    }


});

export default styles