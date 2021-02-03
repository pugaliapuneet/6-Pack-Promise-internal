import { Alert, Platform } from 'react-native';
import React from 'react'
import PushNotification from 'react-native-push-notification'
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import moment from 'moment'
import { safeGetOr } from './fp';
import _ from 'lodash'
import { start, stop } from "react-native-beep-tone";
import BackgroundTimer from 'react-native-background-timer';


export const showAlert = (confirmText, title, message, onPress) =>
    Alert.alert(title, message, [{ text: confirmText, onPress: onPress || null }], { cancelable: false })

export const showCustomAlert = (title, message, cancelText, confirmText, onConfirm, onCancel) =>
    Alert.alert(
        title,
        message,
        [{ text: cancelText, style: 'cancel', onPress: onCancel }, { text: confirmText, onPress: onConfirm || null }],
        { cancelable: false }
    )

export const usePrevious = (value) => {
    const ref = React.useRef();
    React.useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

export const validemail = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined

export const replaceSpecialSymbols = text => text && text
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/\n\n/g, '\n')
    .replace(/\\/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')

export const updateHtmlContent = (value) => {
    return `<body>${value}</body>`
        .replace(/<b>/g, '<ul><li>•  ')
        .replace(/<\/b>/g, "</li></ul>")
        .replace(/<br>/g, "")
        .replace(/‚Äô/g, "'")
        .replace(/¬Ω/g, "0,5")
        .replace(/Breakfast/g, "")
        .replace(/Lunch/g, "")
        .replace(/Dinner/g, "")
        .replace(/Snack #1/g, "")
        .replace(/Snack #2/g, "")
        .replace(/Snack #3/g, "")
        .replace(/Snack#2/g, "")

}

export const localNotificationSchedule = ({
    id,
    message,
    time
}, enable = true) => {
    const current = new Date()
    let fireDate = new Date(moment(time, "HH:mm").toDate())
    fireDate = (current.valueOf() < fireDate.valueOf()) ? fireDate : new Date(moment(time, "HH:mm").add(1, 'day').toDate())
    PushNotification.getScheduledLocalNotifications(
        (notifications) => {
            const data = notifications || []
            const exist = data.find(i => i.id == id)
            if (!Boolean(exist)) {
                if (enable) {
                    PushNotification.localNotificationSchedule({
                        id,
                        message,
                        visibility: 'public',
                        repeatType: 'day',
                        date: fireDate,
                    });
                }
            } else {
                if (exist?.message == message) {
                    PushNotification.cancelLocalNotifications({ id: `${id}` })
                    setTimeout(() => {
                        if (enable) {
                            PushNotification.localNotificationSchedule({
                                id,
                                message,
                                visibility: 'public',
                                repeatType: 'day',
                                date: fireDate,
                            });
                        }
                    }, 500);
                }
            }
        }
    )
}

export const clearDeliveredNotifications = () => {
    const Notification = Platform.OS == 'ios' ? PushNotificationIOS : PushNotification
    Notification.getDeliveredNotifications((notificaitons) => {
        if (notificaitons.length == 0) return
        const lastIndentifier = _.sortBy(notificaitons, item => item.date).reverse()[0].identifier
        const Ids = notificaitons.filter(i => i.identifier != lastIndentifier).map((i) => (i.identifier))
        Notification.removeDeliveredNotifications(Ids)
    });
}

