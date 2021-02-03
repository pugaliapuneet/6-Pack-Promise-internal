import { StyleSheet } from 'react-native';
import { Colors, lightTheme, Dimensions } from '../../constants';


const styles = (theme = lightTheme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    note: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: '500',
        marginVertical: 30
    }

});

export default styles