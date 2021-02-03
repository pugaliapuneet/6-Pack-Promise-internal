import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Platform } from 'react-native';
import { Header, TextButton, Banner, ImageButton } from '../../components';
import { Colors, Dimensions, lightTheme, Strings, Images } from '../../constants';
import styles from './styles';
import { handleCheckPermissions } from '../../utils/permission'
import ImagePicker from 'react-native-image-picker';
import { showCustomAlert, showAlert } from '../../utils';
import { DocumentDirectoryPath, scanFile, copyFile, writeFile, readFile } from 'react-native-fs'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../store/actions'
import { safeGetOr } from '../../utils/fp';
import Share from 'react-native-share'

const Weeks = [1, 1, 2, 3, 4, 5, 6, 7, 8, 8]

export const options = {
    title: 'Upload a clear picture',
    maxWidth: 600,
    maxHeight: 800,
    quality: 0.5,
    storageOptions: {
        skipBackup: true,
        waitUntilSaved: true,
        cameraRoll: true,
        path: 'images'
    }
}

const SelfiesScreen = ({ navigation, selfies, updateSelfies, currentDayId }) => {
    const refGallery = React.useRef(null)
    useEffect(() => {
        handleCheckPermissions()
        const initialIndex = parseInt(currentDayId / 7) + 1
        setTimeout(() => {
            handleChange(initialIndex, false)
        }, 100);
    }, []);

    const [indexSelected, setIndexSelected] = useState(1)
    const [bragImage, setBragImage] = useState('')
    const flatlistRef = React.useRef(null)
    const handleChange = (index, animated = true) => {
        if (index == 0 || index == 9) return null
        setIndexSelected(index);
        const images = selfies.filter(i => i.weekIndex == index) || []
        if (images.length) {
            setBragImage(images[0].uri)
        } else {
            setBragImage(null)
        }
        flatlistRef.current.scrollToIndex({ index: index - 1, animated })
    }
    const onViewRef = React.useRef(({ changed }) => {
        const url = safeGetOr('', '[0].item.uri')(changed)
        setBragImage(safeGetOr('', '[0].item.uri')(changed))
    })
    const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 })
    const weekImages = selfies.filter(i => i.weekIndex == indexSelected) || []
    const handChangeImage = () => {
        ImagePicker.showImagePicker(options, response => {
            if (response.didCancel) {

            } else if (response.error) {

            } else if (response.customButton) {

            } else {
                const fileName = `seflies-week${indexSelected}-${new Date().getTime()}`;
                const filePath = `${DocumentDirectoryPath}/${fileName}`
                if (Platform.OS == 'android') {
                    updateSelfies({ weekIndex: indexSelected, uri: response.uri })
                } else {
                    copyFile(response.uri, filePath)
                        .then(() => {
                            updateSelfies({ weekIndex: indexSelected, uri: filePath })
                        });
                }
                if (weekImages.length) {
                    setTimeout(() => {
                        refGallery.current.scrollToEnd([{ animated: false }])
                    }, 100);
                }
                setBragImage(Platform.OS == 'android'?response.uri:filePath)
            }
        })

    }

    const renderItem = ({ item, index }) => {
        return (
            <View style={styles().imageContainer}>
                <View style={styles().image}>
                    <Image
                        style={styles().image}
                        source={{ uri: item.uri }}
                    />
                    <TouchableOpacity
                        style={styles().close}
                        onPress={() => {
                            showCustomAlert(Strings.confirmDeleteSelfie, "", Strings.no, Strings.yes, () => {
                                if (weekImages.length > 1 && weekImages.length == (index + 1)) {
                                    setTimeout(() => {
                                        refGallery.current.scrollToIndex({ index: weekImages.length - 2 })
                                        setBragImage(weekImages[index - 1].uri)
                                    }, 200);
                                } else if (index == 0) {
                                    setBragImage(null)
                                }

                                updateSelfies(item, true)
                            })
                        }}
                    >
                        <Image
                            source={Images.close}
                            style={{ width: '100%', height: '100%' }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }


    const handleBrag = async (url) => {
        if (weekImages.length == 0) {
            showAlert(Strings.ok, Strings.sorry, Strings.youDonthaveSelfie)
        } else {
            const base64Data = await readFile(url, 'base64')
            var imageData = `data:image/png;base64,` + base64Data;
            await Share.open({
                url: imageData,
                message: Strings.shareDescription
            });
        }
    }
    return (
        <View style={styles().container}>
            <Header
                title={Strings.selfies}
                backWithText={Strings.home}
                headerRight={
                    <ImageButton
                        source={Images.camera}
                        imageStyle={styles().camera}
                        onPress={() => { handChangeImage() }}
                    />}
            />
            <View style={styles().container}>
                <View style={styles(lightTheme).smoothWrappper}>
                    <FlatList
                        ref={flatlistRef}
                        data={Weeks}
                        horizontal
                        renderItem={({ item, index }) => (
                            <TextButton
                                name={(index == 0 || index == 9) ? '' : `Week ${item}`}
                                style={styles().tab}
                                textStyle={[
                                    styles().tabText, index == indexSelected && { color: Colors.red }
                                ]}
                                onPress={() => handleChange(index)}
                            />
                        )}
                        keyExtractor={(_, key) => `${key.toString()}-list`}
                    />
                </View>
                <View style={styles().gallery}>
                    <FlatList
                        ref={refGallery}
                        onViewableItemsChanged={onViewRef.current}
                        viewabilityConfig={viewConfigRef.current}
                        contentContainerStyle={styles().gallery}
                        data={weekImages}
                        horizontal
                        pagingEnabled
                        extraData
                        renderItem={renderItem}
                        nestedScrollEnabled
                        contentContainerStyle={{ backgroundColor: 'grey' }}
                    />
                    {!Boolean(weekImages?.length) && <Text allowFontScaling={false} style={styles().note}>{Strings.notSelfiesFound}</Text>}
                </View>
                <Banner
                    style={{ backgroundColor: Colors.white }}
                    label={Strings.brag}
                    rightIcon={() => (<Image source={Images.brag} style={styles().brag} />)}
                    textStyle={styles().bragtext}
                    onPress={() => { handleBrag(bragImage) }}
                />
            </View>
        </View>
    );
};




const mapStateToProps = ({ user, workout }) => {
    return {
        selfies: user.selfies,
        currentDayId: workout.currentDayId,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ActionCreators, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(SelfiesScreen);
