import React from 'react'
import { TouchableOpacity, Image, Text } from 'react-native'


const TextButton = ({
    style,
    textStyle,
    name,
    onPress,
    disabled,
    activeOpacity
}) => {
    return (
        <TouchableOpacity disabled={disabled} style={style} onPress={onPress} activeOpacity={activeOpacity||0.6}>
            <Text allowFontScaling={false} style={textStyle}>{name}</Text>
        </TouchableOpacity>
    )
}

export default TextButton