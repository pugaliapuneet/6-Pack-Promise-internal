import React from 'react';
import {
    Modal,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import { Colors, Dimensions, lightTheme, Strings } from '../../constants';
import { Icon } from 'native-base'
import Swiper from 'react-native-swiper'
import Images from '../../constants/images';
import { TextButton } from '../../components';

const levels = [
    {
        name: "Basic Level",
        description: "I train a few times per month"
    },
    {
        name: "Next Level",
        description: "I train 2~3 days a week"
    },
    {
        name: "Max Level",
        description: "I train 4~5 days a week"
    },
    {
        name: "X-Treme Level",
        description: "I am Athlean"
    }
]

const allEquipments = [
    "Bodyweight", "Tennis Ball", "Chinup Bar",
    "Dumbbell", "Resistance Band", "Physioball"
]

const width = Dimensions.deviceWidth * 0.9;
const imageSize = Dimensions.deviceWidth * 0.19;
const leveImageSize = Dimensions.deviceWidth * 0.25;

const styles = (theme = lightTheme) =>
    StyleSheet.create({
        container: {
            width: Dimensions.deviceWidth,
            height: Dimensions.deviceHeight,
            backgroundColor: '#000000cc',
            alignItems: 'center',
            justifyContent: 'center',
        },
        title: {
            fontSize: 20,
            fontWeight: 'bold',
            alignSelf: 'center',
            marginVertical: 5,
            color: Colors.black
        },
        label: {
            fontSize: 13,
            alignSelf: 'center',
            marginTop: 5,
            marginBottom: 15,
            color: Colors.black
        },
        slide: {
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
        },
        mainContainer: {
            width,
            minHeight: imageSize * 5.8,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Colors.white,
            borderRadius: 10,
            padding: width * 0.05
        },
        item: {
            marginBottom: 15,
            alignItems: 'center',
            justifyContent: 'flex-start',
        },
        itemText: {
            width: imageSize,
            textAlign: 'center',
            fontSize: 12,
            color: Colors.black,
            marginTop: 5
        },
        centerItem: {
            marginHorizontal: width * 0.1
        },
        imageWrapper: {
            borderColor: 'white',
            borderWidth: Dimensions.px2 * 1.5,
            borderRadius: 5
        },

        image: {
            height: imageSize,
            width: imageSize,
            borderRadius: 2
        },
        button: {
            alignSelf: 'flex-end',
            backgroundColor: Colors.red,
            borderRadius: 3,
            paddingVertical: 5,
            paddingHorizontal: 15,
            marginRight: 10
        },
        buttonTxt: {
            color: Colors.white,
            fontSize: 16,
            fontWeight: '600'
        },
        equipmentsContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignSelf: 'center',
            justifyContent: 'space-between',
            height: imageSize * 3.3
        },
        levelsWrapper: {
            height: imageSize * 3.3,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',

        },
        levels: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        levelImage: {
            width: leveImageSize,
            height: leveImageSize,
            borderRadius: 10,
            marginHorizontal: 10
        },
        levelName: {
            fontSize: 16,
            fontWeight: 'bold',
            marginVertical: 10
        },
        icon: {
            color: Colors.red,
            fontSize: 30
        }

    });

const EquipmentModal = ({
    visible,
    onClose,
    setEquipments,
    selectedEquipments,
    equipmentType,
    setVisibleUpgradePro,
    user: { isPurchasedFullVersion },
    generateTraining
}) => {
    const swipeRef = React.createRef()

    const updateEquipments = (value, selected, index) => {
        if (index > 2 && !isPurchasedFullVersion) {
            onClose()
            setTimeout(() => {
                setVisibleUpgradePro(true)
            }, 300);
            return
        }
        const payload = {
            selectedEquipments: selected ? selectedEquipments.filter(i => i != value) : [...selectedEquipments, value],
            equipmentType
        }
        setEquipments(payload)

    }

    const renderSelectEquipment = () => {
        return (
            <TouchableOpacity style={styles().slide} activeOpacity={1}>
                <Text allowFontScaling={false} style={styles().title}>{Strings.selectYourEquipment}</Text>
                <Text allowFontScaling={false} style={styles().label}>{Strings.bodyweightAlways}</Text>
                <View style={styles().equipmentsContainer}>
                    {allEquipments.map((item, index) => {
                        const isSelected = selectedEquipments.includes(item)
                        return (
                            <TouchableOpacity
                                activeOpacity={0.6}
                                style={[
                                    styles().item,
                                    (index == 1 || index == 4) && styles().centerItem
                                ]}
                                disabled={!index}
                                onPress={() => { updateEquipments(item, isSelected, index) }}
                            >
                                <View style={[styles().imageWrapper, isSelected && { borderColor: 'red' }]}>
                                    <Image
                                        style={styles().image}
                                        source={Images.equipments[index]}
                                    />
                                </View>
                                <Text allowFontScaling={false} style={styles().itemText}>{item}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
                <TextButton
                    name={Strings.next}
                    style={styles().button}
                    textStyle={styles().buttonTxt}
                    onPress={() => {
                        swipeRef.current.scrollBy(1)
                    }}
                />
            </TouchableOpacity>
        )
    }
    const handleIncreasement = (value) => {
        const payload = {
            selectedEquipments,
            equipmentType: equipmentType + value
        }
        setEquipments(payload)
    }
    const renderFitnessLevel = () => {
        const { name, description } = levels[equipmentType - 1]
        return (
            <TouchableOpacity style={styles().slide} activeOpacity={1}>
                <Text allowFontScaling={false} style={styles().title}>{Strings.chooseYourFintess}</Text>
                <Text allowFontScaling={false} style={styles().label}>{' '}</Text>
                <View style={styles().levelsWrapper}>
                    <View style={styles().levels}>

                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={() => handleIncreasement(-1)}
                            disabled={equipmentType == 1}
                        >
                            <Icon name={'minuscircle'}
                                type={'AntDesign'}
                                style={styles().icon}
                            />
                        </TouchableOpacity>
                        <Image
                            style={styles().levelImage}
                            source={Images.fitnessLevels[equipmentType - 1]}
                        />
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={() => handleIncreasement(1)}
                            disabled={equipmentType == 4}
                        >
                            <Icon name={'pluscircle'}
                                type={'AntDesign'}
                                style={styles().icon}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text allowFontScaling={false} style={styles().levelName}>{name}</Text>
                    <Text>{description}</Text>

                </View>
                <TextButton
                    name={Strings.shuffle}
                    style={styles().button}
                    textStyle={styles().buttonTxt}
                    onPress={() => {
                        onClose();
                        setTimeout(() => {
                            generateTraining()
                        }, 300);
                    }}
                />
            </TouchableOpacity>
        )
    }
    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType={'fade'}
            onRequestClose={() => {
                onClose();
            }}>
            <TouchableOpacity
                style={styles().container}
                onPress={onClose}
                activeOpacity={1}
            >
                <View style={styles().mainContainer}>
                    <Swiper
                        ref={swipeRef}
                        nestedScrollEnabled
                        loop={false}
                        activeDotColor={Colors.red}
                        dotColor={Colors.gray500}
                        paginationStyle={{ bottom: 5 }}
                        onIndexChanged={(index) => { }}
                    >
                        {renderSelectEquipment()}
                        {renderFitnessLevel()}
                    </Swiper>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

export default EquipmentModal;
