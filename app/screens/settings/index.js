import React, { useEffect } from 'react';
import { Linking, View } from 'react-native';
import * as RNIap from 'react-native-iap';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Header } from '../../components';
import { Screens, Strings } from '../../constants';
import { ActionCreators } from '../../store/actions';
import { showAlert, showCustomAlert, localNotificationSchedule } from '../../utils/index';
import { sendToSlack } from '../../utils/slack';
import SettingItem from './Item';
import styles from './styles';
import { productId } from '../../helpers/iap'
import localKeys from '../../helpers/local-storage-keys'
import AsyncStorage from "@react-native-community/async-storage"


const SettingsScreen = ({ navigation, setTodayWorkout, workoutTime, setWorkoutTime, setPurchasedStatus }) => {
    const [loading, setLoading] = React.useState(false)
    const [exerciseReminder, setExerciseReminder] = React.useState(true)
    const getReminderVisible = async () => {
        const disable = await AsyncStorage.getItem(localKeys.enableWorkoutReminder)
        setExerciseReminder(disable === 'disable' ? false : true)
    }
    useEffect(() => {
        getReminderVisible();
    }, [])
    const linkBanner = () => {
        Linking.openURL("http://athleanx.com")
    }

    const contactUs = () => {
        const message = `mailto:support@athleanx.com?subject=6PP Support Query`
        Linking.openURL(message)
    }
    const confirmReset = () => {
        showCustomAlert(
            Strings.reset,
            Strings.pleaseConfirmThatYouWant,
            Strings.cancel,
            Strings.reset,
            () => { setTodayWorkout(1) }
        )
    }
    const checkLoading = () => {
        if (loading) {
            setLoading(false)
            setTimeout(() => {
                showAlert('Ok', "Restore unsuccessful", '')
            }, 100)
        }

    }
    const purchaseFullVersion = async () => {
        try {
          const data = await RNIap.requestPurchase(productId);
          if (Platform.OS == 'ios') {
            await RNIap.finishTransactionIOS(data.transactionId)
          } else {
            await RNIap.acknowledgePurchaseAndroid(data.purchaseToken)
          }
          sendToSlack({ name: '[IAP Request Success]', productId })
          setPurchasedStatus()
        } catch (err) {
          sendToSlack({ name: '[IAP Request ERROR]', err })
        }
    }
    const restorePurchases = async () => {

        try {
            setLoading(true)
            setTimeout(() => {
                checkLoading()
            }, 10000);
            const purchases = await RNIap.getAvailablePurchases();
            if (purchases.length) {
                setPurchasedStatus()
            }
            sendToSlack({ type: "[restorePurchases]", success: purchases.length })
            setLoading(false)
            setTimeout(() => {
                if (purchases.length) {
                    showAlert('Ok', "Restore successful", "You restored your purchases successfully!")
                } else {
                    showAlert('Ok', "Restore unsuccessful", "")
                }
            }, 300)

        } catch (err) {
            sendToSlack({ type: "[restorePurchases]", errMessage: err.message })
            setLoading(false)
            setTimeout(() => {
                showAlert('Ok', "Restore unsuccessful", err.message)
            }, 300)
        }
    }
    const onToggle = async () => {
        await AsyncStorage.setItem(localKeys.enableWorkoutReminder, exerciseReminder ? "disable" : 'enable')
        setExerciseReminder(!exerciseReminder);
        localNotificationSchedule({
            id: 0,
            message: "It's time for your ab workout!",
            time: workoutTime
        }, !exerciseReminder)
    }
    return (
        <View style={styles().container}>
            <Header
                title={Strings.settings}
                backWithText={Strings.home}
            />
            <View style={styles().container}>
                <SettingItem
                    name={Strings.newsletter}
                    buttonLabel={Strings.subscribe}
                    onPress={() => navigation.navigate(Screens.Subscribe)}
                />
                <SettingItem
                    name={Strings.feebackSupport}
                    buttonLabel={Strings.contactus}
                    onPress={contactUs}
                />
                <SettingItem
                    name={Strings.exerciseReminder}
                    buttonLabel={Strings.subscribe}
                    onToggle={() => { onToggle() }}
                    value={exerciseReminder}
                />
                <SettingItem
                    name={Strings.reminderTime}
                    buttonLabel={Strings.subscribe}
                    onChangeTime={setWorkoutTime}
                    value={workoutTime}
                />
                <SettingItem
                    name={Strings.purchase}
                    buttonLabel={Strings.purchase}
                    onPress={() => { purchaseFullVersion() }}
                />
                <SettingItem
                    name={Strings.restorePurchases}
                    buttonLabel={Strings.restore}
                    onPress={() => { restorePurchases() }}
                />
                <SettingItem
                    name={Strings.resetProgram}
                    buttonLabel={Strings.reset}
                    onPress={confirmReset}
                />
                <SettingItem
                    name={Strings.aboutATHLEANX}
                    buttonLabel={Strings.about}
                    onPress={linkBanner}
                    isLast />
            </View>
            <Spinner
                visible={loading}
                textContent={'Restoring...'}
                textStyle={{ color: 'white' }}
            />
        </View>
    );
};

const mapStateToProps = ({ user }) => {
    return {
        workoutTime: user.workoutTime
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ActionCreators, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
