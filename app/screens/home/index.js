import React, { useEffect, useState } from 'react';
import { Image, Platform, Text, TouchableOpacity, View, Alert } from 'react-native';
import * as WorkoutImages from '../../assets/workout-images';
import { Header, ImageButton, DownloadModal, ReviewModal } from '../../components';
import { Images, Strings, Screens } from '../../constants';
import data from './data';
import styles from './styles';
import { itemSkus } from '../../helpers/iap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../store/actions'
import * as RNIap from 'react-native-iap';
import Splash from 'react-native-splash-screen'
import { sendToSlack } from '../../utils/slack';
import AsyncStorage from "@react-native-community/async-storage"
import localKeys from '../../helpers/local-storage-keys'
import InAppReview from "react-native-in-app-review";
import { showAlert, showCustomAlert } from '../../utils';
import notifee from '@notifee/react-native'

const isDev = false

const renderItem = ({ icon, name, screen, style }, { navigate }) => {
    return (
        <TouchableOpacity
            key={name}
            style={[styles().itemStyle, style]}
            activeOpacity={1}
            onPress={() => navigate(screen)}
        >
            <Image source={icon} style={styles().itemImage} />
            <Text allowFontScaling={false} style={styles().itemLabel}>{name}</Text>
        </TouchableOpacity>
    )
}
const HomeScreen = ({
    navigation,
    sampleImageId,
    setTodayWorkout,
    getExercises,
    setProDownloadStatus,
    updateFavoriteWorkouts,
    getSelfies,
    getEquipments,
    getShuffle,
    getPurchasedStatus,
    setPurchasedStatus,
    getAlarmSchedule,
    getCompleteWorkoutId
}) => {
    const [visibleDownload, setVisibleDownload] = useState(false)
    const [visibleReview, setVisibleReview] = useState(false)
    const checkProDownloadStatus = () => {
        AsyncStorage.getItem(localKeys.proDownloadStatus)
            .then(data => {
                if (data != 5) {
                    setVisibleDownload(true)
                }
            })
    }
    const checkInAppReview = () => {
        AsyncStorage.getItem(localKeys.shouldReview)
            .then(data => {
                if (data == null) {
                    AsyncStorage.setItem(localKeys.shouldReview, '1')
                    return
                }
                if (data == 2) {
                    setVisibleReview(true)
                } else {
                }
                const count = parseInt(data) + 1
                AsyncStorage.setItem(localKeys.shouldReview, `${count}`)
            })
    }

    const initIAP = async () => {
        try {
            await RNIap.initConnection();
            await RNIap.getProducts(itemSkus);
            const purchaseHistory = await RNIap.getPurchaseHistory()
            const restorePurchases = await RNIap.getAvailablePurchases();
            const isSubscribed = purchaseHistory.length || restorePurchases.length
            if (isSubscribed || isDev) {
                setPurchasedStatus()
                checkProDownloadStatus()
            }
            sendToSlack({ name: "[InitIAP]", isSubscribed, purchaseHistory: purchaseHistory.length, restorePurchases: restorePurchases.length })
        } catch (err) {
            if (isDev) {
                setPurchasedStatus()
                checkProDownloadStatus()
            }
            sendToSlack({ name: "[InitIAP ERROR]", err })
        }
    }
    const checkPowerManager = async () => {
        if (Platform.OS == 'android') {
            const powerManagerInfo = await notifee.getPowerManagerInfo();
            if (powerManagerInfo.activity) {
                AsyncStorage.getItem("powerManagerInfo")
                    .then(data => {
                        if (data == null) {
                            AsyncStorage.setItem('powerManagerInfo', '1')
                            showCustomAlert(
                                'Restrictions Detected',
                                'To ensure notifications are delivered, please adjust your settings to prevent the app from being killed',
                                "Cancel",
                                'Open Settings',
                                async () => {
                                    await notifee.openPowerManagerSettings()
                                }
                            )
                        }
                    })

            };
        }
    }
    useEffect(() => {
        getPurchasedStatus()
        setTodayWorkout();
        setProDownloadStatus();
        getExercises();
        updateFavoriteWorkouts();
        initIAP();
        getSelfies(),
            getEquipments()
        getShuffle()
        getAlarmSchedule()
        setTimeout(() => {
            Splash.hide()
        }, 100);
        getCompleteWorkoutId()
        checkInAppReview()
        sendToSlack({ name: "App Opened!" })
        checkPowerManager();
        return () => {
            RNIap.endConnection();
        }
    }, []);

    const handleBannerOnPress = () => {
        navigation.navigate(sampleImageId ? Screens.TodayWorkout : Screens.Learn)
    }

    const homeImage = sampleImageId ? WorkoutImages[`workout${sampleImageId}`] : Images.upgradePro
    const bannderText = sampleImageId ? Strings.todayWorkout : Strings.restday

    return (
        <View style={styles().container}>
            <Header
                headerStyle={styles().headerStyle}
                headerLeft={
                    <ImageButton
                        source={Images.search}
                        imageStyle={styles().headerIcon}
                        style={styles().search}
                        onPress={() => navigation.navigate(Screens.Search)}
                    />
                }
                headerRight={
                    <ImageButton
                        source={Images.setting}
                        imageStyle={styles().headerIcon}
                        style={styles().search}
                        onPress={() => navigation.navigate(Screens.Settings)}
                    />
                }
            >
                <Image style={styles().logo} source={Images.logo} />
            </Header>
            <View style={styles().container}>
                <TouchableOpacity
                    style={styles().bannerContainer}
                    activeOpacity={1}
                    onPress={handleBannerOnPress}
                >
                    <Image
                        style={styles().banner}
                        source={homeImage}
                    />
                    <View style={styles().smallBanner}>
                        <Text allowFontScaling={false} style={styles().bannerText}>{bannderText}</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles().bottomContainer}>
                    {data.map(item => renderItem(item, navigation))}
                </View>
            </View>
            <DownloadModal
                visible={visibleDownload}
                onClose={() => setVisibleDownload(false)}
            />
            <ReviewModal
                visible={visibleReview}
                onClose={() => {
                    setVisibleReview(false);
                }}
                onPressReview={() => {
                    setVisibleReview(false)
                    setTimeout(() => {
                        const isAvailable = InAppReview.isAvailable()
                        if (isAvailable) {
                            InAppReview.RequestInAppReview()
                        } else {
                            showAlert(Strings.ok, "In App Review does not support.")
                        }
                    }, 300);
                }}
            />
        </View>
    );
};


const mapStateToProps = ({ user, workout }) => {
    return {
        sampleImageId: workout.sampleImageId
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ActionCreators, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
