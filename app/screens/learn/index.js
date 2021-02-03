import React, { useEffect } from 'react';
import { FlatList, Image, ImageBackground, Linking, TouchableOpacity, View, ActivityIndicator, Platform } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Header, TextButton } from '../../components';
import { Strings } from '../../constants';
import Images from '../../constants/images';
import { ActionCreators } from '../../store/actions';
import styles from './styles';
import YouTube, { YouTubeStandaloneAndroid, YouTubeStandaloneIOS } from 'react-native-youtube'
import { replaceSpecialSymbols } from '../../utils';


const LearnScreen = ({ navigation, videos, getLatestYoutubeVideos }) => {

    useEffect(() => {
        if (videos.length == 0) {
            getLatestYoutubeVideos()
        }
    }, []);

    const bannerImage = videos.length ? { uri: videos[0].thumbnail } : Images.unlockBanner
    const openYoutubeVideoChannel = () => {
        Linking.openURL("https://www.youtube.com/user/JDCav24/videos")
    }
    const videoPlayHandler = (videoId) => {
        if (Platform.OS == 'android') {
            YouTubeStandaloneAndroid.playVideo({
                apiKey: 'AIzaSyAhIgxrgI_A_EBFwRO3fnRuzXFCjs3dvic', // Your YouTube Developer API Key
                videoId,
                autoplay: true, // Autoplay the video
                startTime: 0, // Starting point of video (in seconds)
            })
                .then(() => { })
                .catch(errorMessage => { });
        } else {
            YouTubeStandaloneIOS.playVideo(videoId)
                .then((message) => {                   
                 })
                .catch(errorMessage => {                    
                });
        }

    }

    return (
        <View style={styles().container}>
            <Header
                title={Strings.learn}
                backWithText={Strings.home}
            />
            <View style={styles().container}>
                <ImageBackground
                    source={bannerImage}
                    style={styles().loadImage}
                >
                    {
                        Boolean(videos.length) && <TouchableOpacity
                            onPress={() => {
                                videoPlayHandler(videos[0].videoId)
                            }}
                        >
                            <Image
                                style={styles().playImage}
                                source={Images.play}
                            />
                        </TouchableOpacity>
                    }
                </ImageBackground>
                <TextButton
                    name={Strings.moreVideos}
                    style={styles().smallBanner}
                    textStyle={styles().bannerText}
                    onPress={openYoutubeVideoChannel}
                />
                <FlatList
                    data={videos}
                    renderItem={({ item, index }) => <TextButton
                        name={replaceSpecialSymbols(item.title)}
                        textStyle={styles().itemTxt}
                        style={styles().itemBtn}
                        onPress={() => { videoPlayHandler(item.videoId) }}
                    />}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={
                        <TextButton
                            name={Strings.checkoutMoreVideos}
                            style={styles().button}
                            textStyle={styles().buttonTxt}
                            onPress={openYoutubeVideoChannel}
                        />
                    }
                    keyExtractor={item => item.videoId}
                />
            </View>
        </View>
    );
};




const mapStateToProps = ({ user }) => {
    return {
        videos: user.youtubeVideos
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ActionCreators, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(LearnScreen);
