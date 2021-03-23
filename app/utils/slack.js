import axios from 'axios'
import { Platform } from 'react-native'
export const sendToSlack = (data) => { 
  // return 
  let textToSend = data
  if (!(data instanceof String)) {
    textToSend = JSON.stringify({  ...data, createdAt: new Date(), OS: Platform.OS, Version: Platform.Version })
  }
  console.log(textToSend)
  // return axios.post('https://hooks.slack.com/services/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', {
  //   text: textToSend
  // })
}