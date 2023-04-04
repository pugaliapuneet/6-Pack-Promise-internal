import React, { useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from './RootNavigation';
import { Platform } from 'react-native'
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import BackgroundFetch from "react-native-background-fetch";
import BackgroundTimer from 'react-native-background-timer';
// Screens
import Screens from './screen-names'

import IntroSlides from '../screens/intro-slides'
import SelectWorkout from '../screens/select-workout'
import Subscribe from '../screens/subscribe'
import Home from '../screens/home'
import Search from '../screens/search'
import Settings from '../screens/settings'
import Eat from '../screens/eat'
import Train from '../screens/train'
import Learn from '../screens/learn'
import Shuffle from '../screens/shuffle'
import Favorites from '../screens/favorites'
import Selfies from '../screens/selfies'
import TodayWorkout from '../screens/today-workout'
import EatAlarm from '../screens/eat-alarm'
import Workout from '../screens/workout'
import WorkoutSuccess from '../screens/workout-success'
import { clearDeliveredNotifications } from '../utils'

PushNotification.configure({
    onRegister: function (token) {


    },
    onNotification: (notification) => {
    },
    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },
    popInitialNotification: false,
    requestPermissions: true,
});

const options = { headerShown: false }

const AppStack = createStackNavigator();

function AppStackScreen() {
    useEffect(() => {
        BackgroundFetch.configure({
            minimumFetchInterval: 15,
            stopOnTerminate: false,
            startOnBoot: true,
            enableHeadless: true
        }, () => {
            clearDeliveredNotifications()
            BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA);
        }, (error) => {
        });
        BackgroundFetch.status((status) => {
        });
        clearDeliveredNotifications();
        BackgroundTimer.runBackgroundTimer(
            () => { clearDeliveredNotifications() },
            600000
        );
        return () => {
            BackgroundTimer.stopBackgroundTimer()
        }
    }, []);
    return (
        <NavigationContainer
            ref={navigationRef}
        >
            <AppStack.Navigator
                screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}
                initialRouteName={Screens.IntroSlides}
            >
                <AppStack.Screen
                    name={Screens.IntroSlides}
                    component={IntroSlides}
                    options={options}
                />
                <AppStack.Screen
                    name={Screens.SelectWorkout}
                    component={SelectWorkout}
                    options={options}
                />
                <AppStack.Screen
                    name={Screens.Subscribe}
                    component={Subscribe}
                    options={options}
                />
                <AppStack.Screen
                    name={Screens.Home}
                    component={Home}
                    options={options}
                />
                <AppStack.Screen
                    name={Screens.Settings}
                    component={Settings}
                    options={options}
                />
                <AppStack.Screen
                    name={Screens.Search}
                    component={Search}
                    options={options}
                />
                <AppStack.Screen
                    name={Screens.Eat}
                    component={Eat}
                    options={options}
                />
                <AppStack.Screen
                    name={Screens.Train}
                    component={Train}
                    options={options}
                />
                <AppStack.Screen
                    name={Screens.Learn}
                    component={Learn}
                    options={options}
                />
                <AppStack.Screen
                    name={Screens.Shuffle}
                    component={Shuffle}
                    options={options}
                />
                <AppStack.Screen
                    name={Screens.Favorites}
                    component={Favorites}
                    options={options}
                />
                <AppStack.Screen
                    name={Screens.Selfies}
                    component={Selfies}
                    options={options}
                />
                <AppStack.Screen
                    name={Screens.TodayWorkout}
                    component={TodayWorkout}
                    options={options}
                />
                <AppStack.Screen
                    name={Screens.EatAlarm}
                    component={EatAlarm}
                    options={options}
                />
                <AppStack.Screen
                    name={Screens.Workout}
                    component={Workout}
                    options={options}
                />
                <AppStack.Screen
                    name={Screens.WorkoutSuccess}
                    component={WorkoutSuccess}
                    options={options}
                />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}

export default AppStackScreen;
