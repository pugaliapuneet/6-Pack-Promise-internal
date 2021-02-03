
import moment from 'moment';
import { Icon } from 'native-base';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Dimensions, Colors, lightTheme } from '../constants';



const styles = (theme = lightTheme) => StyleSheet.create({
    timeWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dot: {
        fontSize: 20,
        color: theme.text
    },
    time: {
        width: 25,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.text
    },
    icon: {
        fontSize: 25,
        color: Colors.red
    },
    fade: {
        height: '100%',
        position: 'absolute',
        width: '100%'
    }
});

const TimePicker = ({ textStyle, value, opacity, onChangeTime }) => {
    const [time, setTime] = React.useState(value || '08:00')
    const handleIncreasement = (value) => {
        setTime(moment(time, 'HH:mm').add(value, 'minutes').format('HH:mm'))
    }
    useEffect(() => {
        onChangeTime && onChangeTime(time)
    }, [time]);

    const hours = time.split(":")[0]
    const mins = time.split(":")[1]
    return (
        <View style={styles().timeWrapper}>

            <TouchableOpacity
                onPress={() => handleIncreasement(-15)}
                style={{ marginRight: 3 }}
            >
                <Icon name={'minuscircle'}
                    type={'AntDesign'}
                    style={styles().icon}
                />
            </TouchableOpacity>
            <Text allowFontScaling={false} style={[styles().time, textStyle && textStyle]}>{hours}</Text>
            <Text allowFontScaling={false} style={[styles().dot, textStyle && textStyle]} >:</Text>
            <Text allowFontScaling={false} style={[styles().time, textStyle && textStyle]} >{mins}</Text>
            <TouchableOpacity
                onPress={() => handleIncreasement(15)}
                style={{ marginLeft: 3 }}
            >
                <Icon name={'pluscircle'}
                    type={'AntDesign'}
                    style={styles().icon}
                />
            </TouchableOpacity>
            {Boolean(opacity) && <View style={[styles().fade, { backgroundColor: '#ffffff90' }]} />}
        </View>
    );
};



export default TimePicker;
