import React from 'react';
import {
    Image, 
    Modal, 
    StyleSheet,
    Text,
    View
} from 'react-native';
import { Colors, Dimensions, lightTheme, Strings } from '../constants';
import Images from '../constants/images';
import ImageButton from './ImageButton';
import TextButton from './TextButton';

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
            height: width * 0.4,
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
            marginTop: 15,
            marginBottom: 10,
            fontSize: 15,
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
        reviewBtn: {
            paddingHorizontal: 10,
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

const ReviewComponent = ({ visible, onClose, onPressReview }) => {



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
                        <Text allowFontScaling={false} style={styles().title}>{Strings.motivateOthers}</Text>
                        <Image source={Images.review} style={styles().image} />
                        <Text allowFontScaling={false} style={styles().description}>
                            {Strings.ifYouHaveKindWords}
                        </Text>
                        <TextButton
                            style={styles().reviewBtn}
                            textStyle={styles().unlock}
                            onPress={onPressReview}
                            name={Strings.reviewTheApp}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default ReviewComponent;
