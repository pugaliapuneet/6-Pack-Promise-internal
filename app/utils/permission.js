import { showCustomAlert } from './index'
import { Platform } from 'react-native'
import { check, openSettings, PERMISSIONS, request, RESULTS } from 'react-native-permissions'

export const handleCheckPermissions = () => {
    setTimeout(async () => {
        let isOpendPopup = false
        if (Platform.OS === 'android') {
            const storagePermission = await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)
            if (storagePermission !== RESULTS.GRANTED) {
                await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)
            }

        } else {
            const storagePermissionCamera = await check(PERMISSIONS.IOS.CAMERA)
            if (storagePermissionCamera !== RESULTS.GRANTED) {
                if (storagePermissionCamera === RESULTS.BLOCKED) {
                    isOpendPopup = true
                    handleOpenSetting(
                        `Your device dosen't support camera!`,
                        'This app would like to access your camera to attach photos to your selfies.',
                    )
                } else {
                    await request(PERMISSIONS.IOS.CAMERA)
                }

            }
            const storagePermissionPhoto = await check(PERMISSIONS.IOS.PHOTO_LIBRARY)
            if (storagePermissionPhoto !== RESULTS.GRANTED) {
                if (storagePermissionPhoto === RESULTS.BLOCKED) {
                    if (!isOpendPopup) {
                        isOpendPopup = true
                        handleOpenSetting(
                            `Your device dosen't support photo library!`,
                            'This app would like to access your Photo Library to attach photos to your selfies.',
                        )
                    }

                } else {
                    await request(PERMISSIONS.IOS.PHOTO_LIBRARY)
                }
            }
            const storagePermissionPhotoSave = await check(PERMISSIONS.IOS.MICROPHONE)
            if (storagePermissionPhotoSave !== RESULTS.GRANTED) {
                if (storagePermissionPhotoSave === RESULTS.BLOCKED) {
                    if (!isOpendPopup) {
                        handleOpenSetting(
                            `Your device dosen't support photo library additions!`,
                            'This app would like to access your Photo Library to attach photos to your selfies.',
                        )
                    }
                } else {
                    await request(PERMISSIONS.IOS.MICROPHONE)
                }
            }
        }
    }, 1000)
}

const handleOpenSetting = (title, message) => {
    showCustomAlert(title, message, `Ok`, 'Open Settings', () => openSettings()
    )
}