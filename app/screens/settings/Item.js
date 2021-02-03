import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Colors, lightTheme, Dimensions } from '../../constants';
import { Header, TextButton,ImageButton,  TimePicker } from '../../components';
import Images from '../../constants/images';

const styles = (theme = lightTheme) => StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'space-between',
        width: Dimensions.deviceWidth,
        height: 65,
        flexDirection: 'row',
        borderBottomColor: Colors.black,
        borderBottomWidth: 2,
        paddingVertical: 8,
        paddingHorizontal: 15,
    },
    text: {
        color: theme.text,
        fontSize: 20,
        fontWeight: '600'
    },
    button: {
        width: Dimensions.calW(120),
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.white,
        borderWidth: 1,
        borderRadius: 5,
        padding: Dimensions.px10,
        paddingVertical: Dimensions.px8,
    },
    buttonLabel: {
        color: theme.text,
        fontSize: 16
    },

});

const ItemComponent = ({ name, buttonLabel, isLast, onChangeTime, onPress, value, onToggle }) => {
    return (
        <View style={[styles().container, isLast && { borderBottomColor: 0 }]}>
            <Text allowFontScaling={false} style={styles().text}>{name}</Text>
            {!onChangeTime ? (
                onToggle ? <ImageButton
                    imageStyle={styles().switch}
                    source={Images.switchIcon(value)}
                    onPress={() => {onToggle()}}
                /> :
                    <TextButton
                        name={buttonLabel}
                        textStyle={styles().buttonLabel}
                        style={styles().button}
                        onPress={onPress}
                    />
            ) :
                <TimePicker
                    value={value}
                    onChangeTime={onChangeTime}
                />
            }
        </View>
    );
};



export default ItemComponent;
