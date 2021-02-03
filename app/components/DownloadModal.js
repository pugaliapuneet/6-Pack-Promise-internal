import React, { useEffect } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Colors, Dimensions, lightTheme, Strings } from '../constants';
import Images from '../constants/images';
import { ActionCreators } from '../store/actions';
import { proDownloadStatuses } from '../store/user/reducer';
import ImageButton from './ImageButton';

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
        title: {
            fontSize: 22,
            fontWeight: '600',
            marginVertical: 25
        },
        byteLabel: {
            fontSize: 18,
            fontWeight: '900',
            margin: 20
        },
        text: {
            margin: 20
        },
        mainContainer: {
            width: videoWidth,
            alignItems: 'center',
            justifyContent: 'flex-start',
            backgroundColor: Colors.white,
            borderRadius: 10
        },
        backgroundVideo: {
            width: '100%',
            height: '100%',
            backgroundColor: Colors.black,
        },
        closeButton: {
            position: 'absolute',
            right: 0,
            top: -30,
            zIndex: 10,
        },
        close: {
            width: 20,
            height: 20,
        },
    });

const DownloadComponent = ({
    visible,
    onClose,
    downloadManager,
    downloadStatus,
    downloadProgress
}) => {
    useEffect(() => {
        if (visible && downloadStatus != proDownloadStatuses.unzipped) {
            downloadManager()
        }
    }, [visible]);
    useEffect(() => {
        if (downloadProgress == 1 && downloadStatus == proDownloadStatuses.unzipped) {
            setTimeout(() => {
                onClose()
            }, 100);
        }
    }, [downloadStatus, downloadProgress]);
    const downloadedBytes = `${(downloadProgress * 101.5).toFixed(2)} / 101.5 MB Downloads`
    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType={'fade'}
            onRequestClose={() => {
                onClose();
            }}>
            <View style={styles().container}>
                <View style={styles().mainContainer}>
                    <ImageButton
                        source={Images.close}
                        style={styles().closeButton}
                        imageStyle={styles().close}
                        onPress={onClose}
                    />
                    <Text allowFontScaling={false} style={styles().title}>{Strings.downloadingExercises}</Text>
                    <Progress.Circle
                        progress={downloadProgress}
                        size={100}
                        showsText
                        formatText={(progress) => `${parseInt(progress * 100)} %`}
                    />
                    <Text allowFontScaling={false} style={styles().byteLabel}>{downloadedBytes}</Text>
                    <Text allowFontScaling={false} style={styles().text}>{Strings.downloadingDescription}</Text>
                </View>
            </View>
        </Modal>
    );
};

const mapStateToProps = ({ user }) => {
    const { downloadStatus, downloadProgress, proDownloadStatuses } = user
    return {
        downloadStatus, downloadProgress, proDownloadStatuses
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ActionCreators, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(DownloadComponent);
