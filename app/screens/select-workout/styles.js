import { StyleSheet } from 'react-native';
import { Colors, lightTheme, Dimensions } from '../../constants';



const styles = (theme = lightTheme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: theme.text,
        fontSize: 25
    },
    text: {
        color: theme.text,
        fontSize: 20,
        alignSelf:'center',
        textAlign:'center',
        paddingHorizontal:Dimensions.px10
    },
    button: {
        width: 100,
        height: 40,
        backgroundColor: theme.text,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        alignSelf: 'flex-end',
        margin: 20
    },
    done: {
        color: theme.background,
        fontSize: 14
    },
    icon: {
        color: theme.text
    },
    timeWrapper: {
        marginVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dot: {
        fontSize: 50,
        color: theme.text
    },
    time: {
        width: Dimensions.px50 * 1.5,
        textAlign: 'center',
        fontSize: 50,
        color: theme.text
    }
});

export default styles