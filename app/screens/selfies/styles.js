import { StyleSheet } from 'react-native';
import { Colors, lightTheme, Dimensions } from '../../constants';


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
    },
    brag: {
        width: 30,
        height: 30,
        resizeMode: 'contain'
    },
    bragtext: {
        color: Colors.black,
        fontSize: 16,
        marginRight: 10
    },
    camera: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        marginHorizontal: 20
    },
    gallery: {
        width: Dimensions.deviceWidth,
        height: Dimensions.deviceWidth,
        backgroundColor: Colors.gray150,
    },
    imageContainer: {
        width: Dimensions.deviceWidth,
        height: Dimensions.deviceWidth,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.gray150,
    },
    image: {
        width: Dimensions.deviceWidth * 0.7,
        height: Dimensions.deviceWidth - 20,
    },
    close: {
        width: 30,
        height: 30,
        position: 'absolute',
        right: -40,
        top:0,      
    },
    note:{
        position:'absolute',
        alignSelf:'center',
        color:Colors.white,
        fontSize:16,
        marginTop:20
    }
});

export default styles