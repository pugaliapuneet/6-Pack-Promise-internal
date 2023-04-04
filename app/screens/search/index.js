import React, { useEffect, useState } from 'react';
import { FlatList, Image, ImageBackground, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as WorkoutImages from '../../assets/workout-images';
import { Header, UpgradeProModal, VideoPlayerModal, DownloadModal } from '../../components';
import { Colors, Strings } from '../../constants';
import Images from '../../constants/images';
import * as SQL from '../../helpers/database';
import styles from './styles';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../store/actions'
import freeVideos from '../../constants/free-videos'

const SearchScreen = ({ navigation, isPurchasedFullVersion, setPurchasedStatus }) => {
    const [data, setData] = React.useState([])
    const [result, setResult] = React.useState([])
    const [search, setSearchValue] = React.useState(null)
    const [visible, setVisible] = React.useState(false)
    const [visibleUpgradePro, setVisibleUpgradePro] = React.useState(false)
    const [visibleDownload, setVisibleDownload] = useState(false)

    const handleSearch = () => {
        const filteredData = result.filter(item => {
            const searchData = item?.NAME && item.NAME.toUpperCase()
            const textData = search && search.toUpperCase()
            return searchData.indexOf(textData) > -1
        })
        setData(filteredData)
    }

    useEffect(() => {
        SQL.SqlQuery().then(res => {
            if (res.result) {
                setData(res.data)
                let payload = {}
                res.data.map(i => {
                    payload = { ...payload, [i.EQUIPMENT]: 1 }
                })
                setResult(res.data)
            }
        })
    }, []);

    useEffect(() => {
        handleSearch()
    }, [search]);

    const [playURI, setPlayURI] = React.useState('')
    const [isAnato, setAnato] = React.useState(false)
    const handleVideoPlay = (item, anatomyCode = false) => {
        const uri = anatomyCode ? item["ANATOMY LISTING CODE"] : item?.VIDEO
        setPlayURI(uri)
        setAnato(anatomyCode)
        setVisible(true)
    }

    const renderItem = ({ item, index }) => {
        const { ID, NAME, EQUIPMENT } = item
        const time = item['60 Seconds'] == 'NA' ? 30 : 60
        const equipImageName = EQUIPMENT.toLowerCase().replace(/ /g, '_')
        const icon = Images.workoutTypes[equipImageName] || Images.workoutTypes.bodyweight
        const unlock = isPurchasedFullVersion || freeVideos.includes(ID)
        return (
            <TouchableOpacity
                style={styles().item}
                activeOpacity={1}
                onPress={()=>handleVideoPlay(item, true)}
            >
                <Image
                    style={styles().icon}
                    source={icon}
                />
                <View style={styles().labelWrapper}>
                    <Text allowFontScaling={false} style={styles().text}>{NAME}</Text>
                    <Text allowFontScaling={false} style={styles().time}>{`${time} Seconds`}</Text>
                </View>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        if (unlock) {
                            handleVideoPlay(item)
                        } else {
                            setVisibleUpgradePro(true)
                        }

                    }}
                >
                    <ImageBackground
                        style={styles().image}
                        source={WorkoutImages[`workout${ID}`]}
                    >
                        <Image
                            source={unlock ? Images.videoPlay : Images.lock}
                            style={styles().playIcon}
                        />
                    </ImageBackground>
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles().container}>
            <Header headerStyle={styles().headerStyle}>
                <View style={styles().searchWrapper}>
                    <Image
                        style={styles().search}
                        source={Images.search}
                    />
                    <TextInput
                        style={styles().input}
                        placeholderTextColor={Colors.gray200}
                        placeholder={Strings.search}
                        returnKeyType={'done'}
                        onChangeText={text => setSearchValue(text)}
                        value={search}
                    />
                </View>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles().cancelButton}
                    onPress={() => { navigation.goBack() }}
                >
                    <Text allowFontScaling={false} style={styles().cancel}>{Strings.cancel}</Text>
                </TouchableOpacity>
            </Header>
            <View style={styles().container}>
                <FlatList
                    removeClippedSubviews
                    nestedScrollEnabled
                    initialNumToRender={20}
                    style={{ width: '100%' }}
                    data={data}
                    renderItem={renderItem}
                />
            </View>
            <VideoPlayerModal
                visible={visible}
                onClose={() => setVisible(false)}
                playId={playURI}
                isAnato={isAnato}
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




const mapStateToProps = ({ user }) => {

    return {
        isPurchasedFullVersion: user.isPurchasedFullVersion
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ActionCreators, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
