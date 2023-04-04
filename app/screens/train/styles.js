import { StyleSheet } from 'react-native';
import { Colors, lightTheme, Dimensions } from '../../constants';


const styles = (theme = lightTheme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.gray10,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    smoothWrappper: {
        flex: 0,
        width: Dimension.deviceWidth,
        height: 60,
        borderBottomColor: Colors.black,
        borderBottomWidth: 2,
    },
    tab: {
        width: Dimension.deviceWidth / 3,
        alignItems: 'center',
        height: 60,
        justifyContent: 'center',
    },
    tabText: {
        color: Colors.white,
        fontSize: 20
    }


});

export default styles