
import React, { useEffect } from 'react';
import { SafeAreaView, Text, View, Image, TouchableOpacity } from 'react-native';
import styles from './styles'
import { Icon } from 'native-base'
import moment from 'moment'

const TimePicker = ({ onChangeTime, value }) => {
    const [time, setTime] = React.useState('08:00')
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
                style={{ marginRight: 10 }}
            >
                <Icon name={'minuscircle'}
                    type={'AntDesign'}
                    style={styles().icon}
                />
            </TouchableOpacity>
            <Text allowFontScaling={false} style={styles().time}>{hours}</Text>
            <Text allowFontScaling={false} style={styles().dot}>:</Text>
            <Text allowFontScaling={false} style={styles().time}>{mins}</Text>
            <TouchableOpacity
                onPress={() => handleIncreasement(15)}
                style={{ marginLeft: 10 }}
            >
                <Icon name={'pluscircle'}
                    type={'AntDesign'}
                    style={styles().icon}
                />
            </TouchableOpacity>
        </View>
    );
};



export default TimePicker;
