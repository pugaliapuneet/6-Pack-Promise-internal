import { StyleSheet } from 'react-native';
import { Colors, lightTheme, Dimensions } from '../../constants';


const switchRate = 42 / 67

const styles = (theme = lightTheme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.gray10,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    save: {
        fontSize: 18,
        color: Colors.white
    },
    switch: {
        height: 40 * switchRate,
        width: 40,       
    },

});

export default styles