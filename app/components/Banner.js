import React from 'react';
import { SafeAreaView, Text, View, Image, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { Dimensions, Colors, lightTheme } from '../constants';
import { isIphoneX } from 'react-native-iphone-x-helper'
import { Icon } from 'native-base'
import { useNavigation } from '@react-navigation/native'

export const bottomTabHeight = () => {
    if (isIphoneX()) return { height: 75, paddingBottom: 15 }
    return { height: 60 }
}


const styles = (theme = lightTheme) => StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row',
        flex: 0,
        height: Dimensions.calH(60),
        width: Dimensions.deviceWidth,
        backgroundColor: Colors.gray600,
    },
    text: {
        fontSize: 16,
        fontWeight: '700',
        color: theme.text
    }
})


const BannerComponent = ({
    style,
    textStyle,
    label,
    onPress,
    bottom,
    rightIcon
}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            style={[styles().container, style, bottom && { ...bottomTabHeight() }]}
            disabled={!onPress}
            onPress={onPress}
        >
            <Text allowFontScaling={false} style={[styles().text, textStyle]}>{label}</Text>
            {rightIcon&&rightIcon()}
        </TouchableOpacity>
    );
};



export default BannerComponent;
