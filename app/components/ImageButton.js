import React from 'react'
import { TouchableOpacity, Image } from 'react-native'


const ImageButton = ({
    uri,
    source,
    style,
    imageStyle,
    onPress,
    disabled
}) => {
    return (
        <TouchableOpacity disabled={disabled} style={style} onPress={onPress} activeOpacity={0.5}>
            <Image
                style={imageStyle}
                source={source ? source : { uri }}
            />
        </TouchableOpacity>
    )
}

export default ImageButton