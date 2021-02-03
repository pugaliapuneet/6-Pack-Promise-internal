import React from 'react';
import { SafeAreaView, Text, View, Image, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { Dimensions, Colors, lightTheme, Screens } from '../constants';
import { isIphoneX } from 'react-native-iphone-x-helper'
import { Icon } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { reset } from '../navigation/RootNavigation'

export const headerHeight = () => {
    if (isIphoneX()) return { height: 85, paddingTop: 35 }
    if (Platform.OS === 'ios') return { height: 75, paddingTop: 20 }
    return { height: 55 }
}


const styles = (theme = lightTheme) => StyleSheet.create({
    container: {
        flex: 0,
        backgroundColor: theme.header,
        ...headerHeight(),
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    flex: {
        flexDirection: 'row'
    },
    text: {
        color: 'red',
        fontSize: 15
    },
    backIcon: {
        color: 'red'
    },
    left: {
        ...headerHeight(),
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 0
    },
    backWithText: {
        ...headerHeight(),
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        flexDirection: 'row'
    },
    right: {
        ...headerHeight(),
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 0
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
        color: theme.text,
    }
})


const HeaderComponent = ({
    headerStyle,
    headerLeft,
    headerRight,
    title,
    headerTitle,
    backWithText,
    leftAction,
    children,
    resetRoot
}) => {
    const { canGoBack, goBack } = useNavigation()
    const handleLeftAction = () => {
        if (leftAction) {
            leftAction()
            return
        }
        if (resetRoot) {
            reset(Screens.Home)
            return
        }
        canGoBack() && goBack()
    }
    return (
        <View style={[styles().container, headerStyle && headerStyle]}>
            {children && children}
            {headerLeft && <View style={styles().left}>{headerLeft}</View>}
            {backWithText &&
                <TouchableOpacity
                    style={styles().backWithText}
                    activeOpacity={0.7}
                    onPress={handleLeftAction}
                >
                    <Icon type={'Feather'} name={'chevron-left'} style={styles().backIcon} />
                    <Text allowFontScaling={false} style={styles().text}>{backWithText}</Text>
                </TouchableOpacity>}

            {title && <Text allowFontScaling={false} style={styles().title}>{title}</Text>}
            {headerTitle && headerTitle()}
            {headerRight && <View style={styles().right}>{headerRight}</View>}
        </View >
    );
};



export default HeaderComponent;
