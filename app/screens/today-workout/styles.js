import { StyleSheet } from 'react-native';
import { Colors, lightTheme, Dimensions } from '../../constants';


const styles = (theme = lightTheme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
        alignItems: 'center',
        justifyContent: 'flex-start'
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
        fontSize: 16
    },
    icon: {
        width: 30,
        height: 30
    },
    image: {
        width: 80,
        height: 50,
        alignItems:'center',
        justifyContent:'center'
    },
    playicon:{
        width:20,height:20,
        resizeMode:'contain'
    }


});

export default styles