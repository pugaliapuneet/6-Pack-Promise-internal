import React, { useState } from 'react';
import { FlatList, Linking, Text, View } from 'react-native';
import { Header, ImageButton, TextButton, TimePicker } from '../../components';
import { Colors, Strings } from '../../constants';
import Images from '../../constants/images';
import styles from './styles';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../store/actions'
import PushNotification from 'react-native-push-notification';
import { localNotificationSchedule } from '../../utils';

const EatAlarmScreen = ({ navigation, data, setAlarmSchedule }) => {
    const [isReminder, setReminder] = useState(true)
    const onChangeAlarm = (notiData) => {
        const { name, reminder, notificationId, time } = notiData
        const payload = data.map(i => (i.notificationId == notificationId ? notiData : i))
        setAlarmSchedule(payload)
        if (reminder) {
            localNotificationSchedule({
                id: notificationId,
                message: `It's time for your ${name}!`,
                time
            });
        } else {
            PushNotification.cancelLocalNotifications({ id: `${notificationId}` })
        }
    }
    const linkBanner = () => {
        Linking.openURL("http://athleanx.com/athleanrx")
    }
    const renderItem = ({ item, index }) => {
        const { name, reminder, time } = item
        return (
            <View style={styles().item}>
                <Text allowFontScaling={false} style={styles().itemName}>{name}</Text>
                <TimePicker
                    textStyle={{ color: Colors.black, fontWeight: '400' }}
                    value={time}
                    opacity={!reminder}
                    onChangeTime={(time) => {
                        onChangeAlarm({ ...item, time })
                    }}
                />
                <ImageButton
                    imageStyle={styles().switch}
                    source={Images.switchIcon(reminder)}
                    onPress={() => onChangeAlarm({ ...item, reminder: !reminder })}
                />
            </View>
        )
    }
    return (
        <View style={styles().container}>
            <Header
                title={Strings.eatAlarm}
                backWithText={Strings.home}
            />
            <View style={styles().container}>
                <FlatList
                    removeClippedSubviews
                    initialNumToRender={20}
                    style={{ width: '100%' }}
                    data={data}
                    extraData
                    ListHeaderComponent={
                        <View style={styles().banner}>
                            <Text allowFontScaling={false} style={styles().H1}>{Strings.mealReminder}</Text>
                            <Text allowFontScaling={false} style={styles().choose}>{Strings.chooseReminder}</Text>
                        </View>
                    }
                    ListFooterComponent={
                        <View style={styles().bottomBanner}>
                            <View>
                                <Text allowFontScaling={false} style={styles().H2}>{Strings.axSuppelement}</Text>
                                <TextButton
                                    onPress={linkBanner}
                                    name={Strings.learnMore}
                                    textStyle={styles().learnmore}
                                />
                            </View>
                            <ImageButton
                                imageStyle={styles().switch}
                                source={Images.switchIcon(isReminder)}
                                onPress={() => setReminder(!isReminder)}
                            />
                        </View>
                    }
                    renderItem={renderItem}
                />
            </View>
        </View>
    );
};



const mapStateToProps = ({ user }) => {
    return {
        data: user.alarms
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ActionCreators, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(EatAlarmScreen);
