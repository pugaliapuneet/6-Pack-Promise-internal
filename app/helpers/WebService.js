import { ENDPOINT, SUBSCRIBE_ENDPOINT, YOUTUBE_DATA3_API_URL } from './api'

import NetworkHelper from './NetworkHelper'

function WService() {
  this.url = ENDPOINT
}

WService.prototype.makeUrl = function (resource) {
  var url = this.url + resource
  return url
}

WService.prototype.subscribe = function (email) {
  return NetworkHelper.requestPost(SUBSCRIBE_ENDPOINT, { email, type: "PAID" })
}
WService.prototype.getYoutubeVideoList = function () {
  return NetworkHelper.requestGet(YOUTUBE_DATA3_API_URL)
}


module.exports = WService
