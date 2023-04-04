import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Image,
  Platform,
} from 'react-native';
import { Dimensions, Colors, lightTheme, Strings } from '../constants';
import Video from 'react-native-video';
import ImageButton from './ImageButton';
import Images from '../constants/images';
import { Icon } from 'native-base';
import TextButton from './TextButton';
import * as RNIap from 'react-native-iap';
import { productId } from '../helpers/iap'
import { showAlert } from '../utils'
import { sendToSlack } from '../utils/slack';

const width = Dimensions.deviceWidth * 0.85;

const data = [
  'All 105 Ab exercises',
  '90 day program',
  'Shuffle a workout',
  '90 day meal plan',
  'Favorite a workout for later!',
];

const styles = (theme = lightTheme) =>
  StyleSheet.create({
    container: {
      width: Dimensions.deviceWidth,
      height: Dimensions.deviceHeight,
      backgroundColor: '#000000cc',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 20,
    },
    mainContainer: {
      width,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.white,
      borderRadius: 10,
      paddingHorizontal: 5,
      paddingBottom: 10,
    },
    closeButton: {
      alignSelf: 'flex-end',
      padding: 20,
      paddingRight: 0,
    },
    image: {
      width: width - 20,
      height: width * 0.5,
      resizeMode: 'stretch',
    },
    close: {
      width: 20,
      height: 20,
    },
    title: {
      color: Colors.red,
      fontSize: 20,
      fontWeight: '500',
      marginVertical: 15,
    },
    description: {
      width: '95%',
      fontSize: 14,
      marginTop: 5,
      marginBottom: 10,
      fontSize: 13,
    },
    itemStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '95%',
    },
    itemText: {
      marginLeft: 10,
      fontSize: 12,
    },
    unlockButton: {
      width: 80,
      height: 35,
      borderRadius: 5,
      backgroundColor: '#009922',
      alignSelf: 'flex-end',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
      marginRight: 5
    },
    unlock: {
      color: Colors.white,
      fontSize: 16,
    },
  });

const UpgradeProComponent = ({ visible, url, onClose, setVisibleDownload, setPurchasedStatus }) => {
  const initIAP = async () => {
    try {
      await RNIap.initConnection();
    } catch (err) {
    }
  }
  useEffect(() => {
    initIAP()
    return () => {
      RNIap.endConnection();
    }
  }, []);

  const renderItem = (item) => {
    return (
      <View style={styles().itemStyle}>
        <Icon type={'Octicons'} name={'primitive-dot'} style={{ fontSize: 20 }} />
        <Text allowFontScaling={false} style={styles().itemText}>{item}</Text>
      </View>
    );
  };
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
      onClose()
      setTimeout(() => {
        setVisibleDownload(true)
      }, 200);
    } catch (err) {
      sendToSlack({ name: '[IAP Request ERROR]', err })
      onClose()
    }

  }
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType={'fade'}
      onRequestClose={() => {
        onClose();
      }}>
      <View style={styles().container}>
        <View>
          <ImageButton
            source={Images.close}
            style={styles().closeButton}
            imageStyle={styles().close}
            onPress={onClose}
          />
          <View style={styles().mainContainer}>
            <Text allowFontScaling={false} style={styles().title}>{Strings.upgradeToPro}</Text>
            <Image source={Images.upgradePro} style={styles().image} />
            <Text allowFontScaling={false} style={styles().description}>
              {Strings.upgradeToProEnjoy}
            </Text>
            <View>{data.map(renderItem)}</View>
            <TextButton
              style={styles().unlockButton}
              textStyle={styles().unlock}
              onPress={() => {
                purchaseFullVersion()
              }}
              name={'Unlock'}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default UpgradeProComponent;
