import React, { useState, useEffect } from 'react';
import { FlatList, Image, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import * as WorkoutImages from '../../assets/workout-images';
import { Banner, Header, VideoPlayerModal, UpgradeProModal, DownloadModal } from '../../components';
import { Colors, Images, Strings, Screens } from '../../constants';
import styles from './styles';
import EquipmentModal from './EquipmentModal';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../store/actions'
import Templates from './templates'
import * as SQL from '../../helpers/database';
import { getTodayWorkout } from '../../store/workout/action'
import moment from 'moment'
import { safeGetOr } from '../../utils/fp';
import freeVideos from '../../constants/free-videos'

const ranDom = () => Math.floor(Math.random() * 10) % 2 + 1

const ShuffleScreen = (props) => {
    const { selectedEquipments, equipmentType, setShuffle, shuffle, navigation, setPurchasedStatus, getCurrentShuffleId, updatePreDefinedShuffles } = props
    const isPurchasedFullVersion = safeGetOr(false, 'user.isPurchasedFullVersion')(props)
    const [visible, setVisible] = React.useState(false)
    const [visibleUpgradePro, setVisibleUpgradePro] = React.useState(false)
    const [visibleDownload, setVisibleDownload] = useState(false)
    const [showEquipModal, setShowEquipModal] = React.useState(false)
    const [data, setData] = useState([])
    const [totalTime, setTotalTime] = useState(0)

    const [workoutDetails, setWorkoutDetails] = useState({})

    const [playURI, setPlayURI] = React.useState('')
    const [isAnato, setAnato] = React.useState(false)

    const handleVideoPlay = (item, unlock, anatomyCode = false) => {
        const uri = anatomyCode ? item?.anatomyCode : item?.sampleVideoPath
        if (!unlock && !anatomyCode) {
            setVisibleUpgradePro(true)
            return
        }
        setPlayURI(uri)
        setAnato(anatomyCode)
        setVisible(true)
    }

    useEffect(() => {
        getCurrentShuffleId()
        updatePreDefinedShuffles({})
        if (shuffle.length == 0) {
            generateTraining()
            setTimeout(() => {
                setShowEquipModal(true)
            }, 500);
        } else {

        }
    }, []);

    useEffect(() => {
        if (shuffle.length) {
            getTodayWorkout(1, false, shuffle)
                .then(res => {
                    if (res.result) {
                        const payload = res.todayWorkout
                        console.log('res => ', res)
                        setData(payload)
                        setWorkoutDetails(res)
                        setTotalTime(res.totalTime)
                    }
                })
        }

    }, [shuffle]);



    const generateTraining = async () => {
        const level = equipmentType
        let arrTemp = [];
        let arrFinal = [];
        let queryWhere = `(EQUIPMENT="${selectedEquipments.join(`" OR EQUIPMENT="`)}")`
        let templateWhere = "0";
        let query = "";
        let exerciseOrder = ["CATEGORY_TDR", "CATEGORY_T", "CATEGORY_O", "CATEGORY_M", "CATEGORY_BUR", "CATEGORY_L"];
        const restPoints = [0, 4, 6, 8, 11];
        const restTimes = [0, 45, 30, 30, 30];
        const restPtsForLevel = restPoints[level]
        let minLevel = 0;
        let maxLevel = 3;
        const ranIndex = ranDom()
        let template = JSON.parse(Templates[ranIndex][level])
        let usedExe = "0";
        let i = 1;
        let randomSeconds;
        let pts = 0;
        let ptsUsed = 0
        let tempInt = 0
        for (let category of exerciseOrder) {
            templateWhere = "0";
            maxLevel = 0;
            minLevel = 0;
            for (let it = 0; it < template.length; it++) {
                if (template[it] < 0) {

                }
                if (template[it] > 0) {
                    templateWhere += "," + `${it}`;
                    if (it > maxLevel) {
                        maxLevel = it;
                    }
                    if (maxLevel == 0) {
                        minLevel = it;
                    }
                }
            }
            query = "select * from ex where (\"30 Seconds\" in (" + templateWhere + ") OR " +
                "\"60 Seconds\" in (" + templateWhere + ") )" +
                " AND " + category + "=1 AND " + queryWhere + "AND EQUIPMENT != 'Bodyweight' AND ID not in (" + usedExe + ") ORDER BY RANDOM() LIMIT 1";

            let res1 = await SQL.queryExercise(query)

            if (!res1.data.length) {
                query = "select * from ex where (\"30 Seconds\" in (" + templateWhere + ") OR " +
                    "\"60 Seconds\" in (" + templateWhere + ") )" +
                    " AND " + category + "=1 AND " + queryWhere + " AND ID not in (" + usedExe + ") ORDER BY RANDOM() LIMIT 1";
                res1 = await SQL.queryExercise(query)
            }
            let dic = res1.data[0]
            let dicEx = {}
            // while (dic["60 Seconds"] == 'NA') {
            //     res1 = await SQL.queryExercise(query)
            //     dic = res1.data[0]
            // }
            if (Object.keys(dic).length != 0) {
                dicEx = {
                    ex: dic?.ID
                }
                usedExe += "," + dic?.ID
                if (dic["60 Seconds"] > maxLevel) {
                    randomSeconds = 30
                } else if (dic["30 Seconds"] < minLevel) {
                    randomSeconds = 60
                    ptsUsed = dic["60 Seconds"] == 'NA' ? parseInt(dic.PTS) : dic["60 Seconds"]
                    pts += ptsUsed;
                    tempInt = parseInt(template[ptsUsed])
                    tempInt--;
                    template[ptsUsed] = tempInt;
                } else {
                    randomSeconds = 30 * ranDom()
                    let tempColName = `${randomSeconds} Seconds`
                    const tempInt1 = template[dic[tempColName]]
                    if (tempInt1 == 0) {
                        randomSeconds = randomSeconds == 30 ? 60 : 30
                    }
                }
                ptsUsed = dic[`${randomSeconds} Seconds`] == 'NA' ? parseInt(dic.PTS) : parseInt(dic[`${randomSeconds} Seconds`])
                dicEx = {
                    ...dicEx,
                    time: parseInt(randomSeconds),
                    category: category.replace('CATEGORY_', ''),
                    pts: ptsUsed
                }
                arrTemp = [...arrTemp, dicEx]
                tempInt = parseInt(template[ptsUsed])
                tempInt--;
                template[ptsUsed] = tempInt;
            }
        }
        arrTemp = arrTemp.reverse()
        for (let index = 0; index < arrTemp.length; index++) {
            pts = pts + arrTemp[index].pts
            arrFinal = [...arrFinal, arrTemp[index]]
            if (pts >= parseInt(restPtsForLevel) && index < 5) {
                const resTemp = {
                    ex: "-1",
                    time: parseInt(restTimes[level])
                }
                pts = 0
                arrFinal = [...arrFinal, resTemp]
            }
        }
        setShuffle(arrFinal)
    }

    const renderItem = ({ item, index }) => {
        const equipImageName = item?.equipmentSound?.toLowerCase().replace(/ /g, '_')
        const icon = Images.workoutTypes[equipImageName] || Images.workoutTypes.bodyweight
        const isRest = item.exerciseName == 'Rest'
        const unlock = isPurchasedFullVersion || freeVideos.includes(item.ID)
        return (
            <TouchableOpacity
                key={`${index}`} style={styles().item}
                activeOpacity={1}
                onPress={() => { handleVideoPlay(item, unlock, true) }}
                disabled={isRest}
            >
                <Image
                    style={styles().icon}
                    source={isRest ? null : icon}
                />
                <View style={styles().labelWrapper}>
                    <Text allowFontScaling={false} style={styles().text}>{item?.exerciseName}</Text>
                    <Text allowFontScaling={false} style={styles().time}>{`${item?.durationTime} seconds`}</Text>
                </View>
                <TouchableOpacity onPress={() => { handleVideoPlay(item, unlock) }} activeOpacity={1} disabled={isRest}>
                    <ImageBackground
                        style={styles().image}
                        source={isRest ? null : WorkoutImages[`workout${item.exerciseId}`]}
                    >
                        <Image style={styles().playicon} source={!isRest && (unlock ? Images.videoPlay : Images.lock)} />
                    </ImageBackground>
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles().container}>
            <Header
                title={Strings.shuffleWorkout}
                backWithText={Strings.home}
            />
            <View style={styles().container}>
                <View style={styles().topBanner}>
                    <View style={styles().button} />
                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles().button}
                        onPress={() => generateTraining()}
                    >
                        <Image style={styles().buttonImage} source={Images.eatShuffle} />
                        <Text allowFontScaling={false} style={{ color: 'white' }}>{Strings.reShuffle}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles().button}
                        onPress={() => setShowEquipModal(true)}
                    >
                        <Image style={styles().buttonImage} source={Images.equipment} />
                        <Text allowFontScaling={false} style={{ color: 'white' }}>{Strings.equipment}</Text>
                    </TouchableOpacity>
                </View>
                <Banner
                    label={`${Strings.totalWorkout} ${moment(totalTime * 1000).format('mm:ss')}`}
                />
                <FlatList
                    nestedScrollEnabled
                    removeClippedSubviews
                    initialNumToRender={20}
                    style={{ width: '100%' }}
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index}
                />
                <Banner
                    bottom
                    style={{ backgroundColor: Colors.red }}
                    label={Strings.startWorkout}
                    onPress={() => {
                        if (!isPurchasedFullVersion) {
                            setVisibleUpgradePro(true)
                            return
                        }
                        if (Object.keys(workoutDetails).length) {
                            navigation.navigate(Screens.Workout, { isShuffle: true, ...workoutDetails })
                        }
                    }}
                />
            </View>
            <VideoPlayerModal
                onClose={() => setVisible(false)}
                visible={visible}
                playId={playURI}
                isAnato={isAnato}
            />
            <EquipmentModal
                {...props}
                onClose={() => setShowEquipModal(false)}
                setVisibleUpgradePro={setVisibleUpgradePro}
                visible={showEquipModal}
                generateTraining={() => { generateTraining() }}
            />
            <UpgradeProModal
                visible={visibleUpgradePro}
                onClose={() => setVisibleUpgradePro(false)}
                setVisibleDownload={setVisibleDownload}
                setPurchasedStatus={setPurchasedStatus}
            />
            <DownloadModal
                visible={visibleDownload}
                onClose={() => setVisibleDownload(false)}
            />

        </View>
    );
};



const mapStateToProps = ({ user, shuffle }) => {
    const { selectedEquipments, equipmentType } = shuffle
    return {
        user,
        selectedEquipments,
        equipmentType,
        shuffle: shuffle.shuffle
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ActionCreators, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(ShuffleScreen);
