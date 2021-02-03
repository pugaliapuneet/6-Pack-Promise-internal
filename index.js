/**
 * @format
 */

import { AppRegistry } from 'react-native';
import BackgroundFetch from "react-native-background-fetch";
import App from './App';
import { name as appName } from './app.json';
import { clearDeliveredNotifications } from './app/utils'

const headlessTask = async () => {  
    BackgroundFetch.finish();
}
BackgroundFetch.registerHeadlessTask(headlessTask)

AppRegistry.registerComponent(appName, () => App);
