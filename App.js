import React from 'react';
import { AppearanceProvider } from 'react-native-appearance';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import MainApp from './app/navigation/AppNavigator';
import reducers from './app/store/reducers';
import { LogBox, Dimensions, StyleSheet, View, Platform, StatusBar } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import 'react-native-gesture-handler'

LogBox.ignoreAllLogs();

const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
  iosContainer: {
    width,
    height
  },
  androidContainer: {
    width: '100%',
    height: '100%'
  }
})

function App() {
  const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
  return (
    <AppearanceProvider>
      <Provider store={store}>
        {
          Platform.OS === 'ios' ?
            <KeyboardAwareScrollView
              scrollEnabled={false}
            >
              <View style={styles.iosContainer}>
                <StatusBar barStyle={'light-content'} />
                <MainApp />
              </View>
            </KeyboardAwareScrollView>
            :
            <View style={styles.androidContainer}>
              <StatusBar barStyle={'light-content'} />
              <MainApp />
            </View>
        }
      </Provider>
    </AppearanceProvider>
  );
}

export default App
