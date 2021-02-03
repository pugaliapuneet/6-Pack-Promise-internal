import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, FlatList, Linking } from 'react-native';
import { Header, TextButton, ImageButton } from '../../components';
import { Strings, Dimensions, lightTheme, Colors, Screens } from '../../constants';
import styles from './styles';
import { getMealDay } from '../../helpers/database'
import HTML from "react-native-render-html";
import Images from '../../constants/images';
import { safeGetOr } from '../../utils/fp'
import { updateHtmlContent } from '../../utils'
import Swiper from 'react-native-swiper'


const listMeals = ["", "Breakfast", "Snack", "Lunch", "Dinner", ""]
const meals = ["Breakfast", "Snack", "Lunch", "Dinner"]
const gestureConfig = {
    velocityThreshold: 0.01,
    directionalOffsetThreshold: 80
};

const EatScreen = ({ navigation }) => {
    const swipeRef = React.createRef()
    const flatlistRef = React.useRef(null)
    const [data, setData] = React.useState([])
    const [indexSelected, setIndexSelected] = React.useState(1)
    const [ranIndex, setRanIndex] = React.useState(0)
    const [snIndex, setSnIndex] = React.useState(0)

    const handleChange = (index, disable = false) => {
        setIndexSelected(index);
        flatlistRef.current.scrollToIndex({ index: index - 1 })
        if (!disable) {
            const dep = index - indexSelected
            swipeRef.current.scrollBy(dep)
        }
    }

    useEffect(() => {
        getMealDay().then(res => {
            if (res.result) {
                setData(res.data)
            }
        })
    }, []);

    const linkBanner = () => {
        Linking.openURL("http://athleanx.com/athleanrx")
    }

    const onShuffle = () => {
        const ranIndex = Math.floor(Math.random() * 55)
        const snIndex = ranIndex % 3
        setRanIndex(ranIndex);
        setSnIndex(snIndex);
    }

    const selectedMeal = listMeals[indexSelected]
    let breakfast = safeGetOr("", `[${ranIndex}].Breakfast`)(data)
    let lunch = safeGetOr("", `[${ranIndex}].Lunch`)(data)
    let snack = safeGetOr("", `[${ranIndex}].Snack${snIndex + 1}`)(data)
    let dinner = safeGetOr("", `[${ranIndex}].Dinner`)(data)
    const mealPlan = ["", breakfast, snack, lunch, dinner]
    const mealData = mealPlan[indexSelected]


    return (
        <View style={styles().container}>
            <Header
                title={Strings.eat}
                backWithText={Strings.home}
                headerRight={
                    <ImageButton
                        source={Images.eatAlram}
                        style={{ paddingHorizontal: 10 }}
                        imageStyle={styles().alram}
                        onPress={() => { navigation.navigate(Screens.EatAlarm) }}
                    />
                }
            />
            <View style={styles().container}>
                <View style={styles(lightTheme).smoothWrappper}>
                    <FlatList
                        ref={flatlistRef}
                        data={listMeals}
                        horizontal
                        renderItem={({ item, index }) => (
                            <TextButton name={item}
                                style={styles().tab}
                                disabled={index == 0 || index == 5}
                                textStyle={[
                                    styles().tabText, index == indexSelected && { color: Colors.red }
                                ]}
                                onPress={() => handleChange(index)}
                            />
                        )}
                        keyExtractor={(item, index) => `${index}-list`}
                    />
                </View>
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles().button}
                    onPress={onShuffle}
                >
                    <Image style={styles().image} source={Images.eatShuffle} />
                    <Text allowFontScaling={false} style={{ color: 'white' }}>{Strings.shuffle}</Text>
                </TouchableOpacity>
                <View
                    style={{ flex: 1, width: Dimensions.deviceWidth }}
                >
                    <Text allowFontScaling={false} style={styles().label}>{selectedMeal}</Text>
                    <HTML
                        html={updateHtmlContent(mealData)}
                        tagsStyles={{
                            "li": {
                                paddingLeft: 0,
                                color: "white",
                                fontSize: 15,
                                fontFamily: "Helvetica"
                            },
                        }}
                        imagesMaxWidth={Dimensions.deviceWidth}
                        allowFontScaling={false}
                    />
                    <View style={{ flex: 1, width: Dimensions.deviceWidth, position: 'absolute' }}>
                        <Swiper
                            ref={swipeRef}
                            loop={false}
                            onIndexChanged={(index) => { handleChange(index + 1, true) }}
                        >
                            {meals.map((i) => <View style={{ flex: 1 }}></View>)}
                        </Swiper>
                    </View>
                </View>
                <View style={styles().bottomTextWrap} >
                    <Text allowFontScaling={false} style={styles().bottomText}>{Strings.athleanRxSupplements}</Text>
                </View>
                <ImageButton
                    source={Images.eatBanner}
                    style={styles().bottomBanner}
                    imageStyle={styles().bottomBanner}
                    onPress={linkBanner}
                />
            </View>
        </View>
    );
};



export default EatScreen;
