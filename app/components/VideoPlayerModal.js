import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
import { Dimensions, Colors, lightTheme } from '../constants';
import Video from 'react-native-video';
import ImageButton from './ImageButton';
import Images from '../constants/images';
import * as Videos from '../assets/videos'
import { DocumentDirectoryPath } from 'react-native-fs'

const videoWidth = Dimensions.deviceWidth * 0.9;
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
    videoWrapper: {
      width: videoWidth,
      height: videoWidth * 0.6,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    backgroundVideo: {
      width: '100%',
      height: '100%',
      backgroundColor: Colors.black,
    },
    closeButton: {
      position: 'absolute',
      padding: 10,
      right: -10,
      top: -40,
      zIndex: 10,
    },
    close: {
      width: 20,
      height: 20,
    },
  });

const VideoPlayerComponent = ({ visible, onClose, playId, isAnato }) => {
  const source = Videos[`video${playId ? playId : 17}`] || { uri: `${DocumentDirectoryPath}/${playId}.mp4` }
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType={'fade'}
      onRequestClose={() => {
        onClose();
      }}>
      <View style={styles().container}>
        <View style={[styles().videoWrapper, isAnato && { height: videoWidth * 1.2 }]}>
          <ImageButton
            source={Images.close}
            style={styles().closeButton}
            imageStyle={styles().close}
            onPress={onClose}
          />
          <Video
            rate={1}
            playInBackground={true}
            resizeMode={'stretch'}
            source={source}
            style={styles().backgroundVideo}
            onEnd={() => { onClose(); }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default VideoPlayerComponent;
