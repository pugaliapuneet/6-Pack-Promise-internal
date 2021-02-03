
export const ENDPOINT = "https://athleanx.com"
export const PRIVACY_POLICY = `${ENDPOINT}/privacy-policy`
export const ASSETS_DOWNLOAD_URL = `${ENDPOINT}/6ppdnld/patch.50.com.mi.AthleanX.obb`
export const SUBSCRIBE_ENDPOINT = "http://ax-admin.athleanx.com/app-handler.php"
export const YOUTUBE_CHANNELID = "UCe0TLA0EsQbE-MjuHXevj2A"
export const GOOGLE_API_KEY = "AIzaSyAbZkIBUM-jF5s2ITUsmT8249uiJ5Fu-xI"
/*
 AIzaSyCqC2jb4EPF8AXt6T9TuMVDtubDgGrRTDw
 AIzaSyAbZkIBUM-jF5s2ITUsmT8249uiJ5Fu-xI

 AIzaSyAlVV1zgZmuvFQmfqaC020z1hFKHtXeuLQ
 AIzaSyC34OIEjuiiUekdllYzY3FLPeSEvZCYkDM
*/
export const YOUTUBE_DATA3_API_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${YOUTUBE_CHANNELID}&order=date&key=${GOOGLE_API_KEY}&maxResults=11`

import WService from './WebService'
import { safeGetOr } from '../utils/fp'
var wservice = new WService()
export const subscribe = (email) => {
    return new Promise((resolve, reject) => {
        wservice.subscribe(email)
            .then(res => {
                resolve(res)
            }).catch(err => {
                resolve(err)
            })
    })
}

export const getYoutubeVideoList = () => {
    return new Promise((resolve, reject) => {
        wservice.getYoutubeVideoList()
            .then(({ items }) => {
                resolve({
                    data: items.map(i => ({
                        videoId: safeGetOr('', 'id.videoId')(i),
                        publishedAt: safeGetOr('', 'snippet.publishedAt')(i),
                        title: safeGetOr('', 'snippet.title')(i),
                        description: safeGetOr('', 'snippet.description')(i),
                        thumbnail: safeGetOr('', 'snippet.thumbnails.high.url')(i)
                    })),
                    success: true
                })
            }).catch(err => {
                console.log("[getYoutubeVideoList]", err)
                resolve({
                    success: false,
                    message: err?.message,
                    data:[]
                })
            })
    })
}
