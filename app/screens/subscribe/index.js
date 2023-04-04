import React from 'react';
import { SafeAreaView, Text, View, Image, TextInput, Linking, TouchableOpacity, } from 'react-native';
import styles from './styles'
import { Strings, Images, Screens } from '../../constants';
import { Header } from '../../components'
import { Icon } from 'native-base'
import { PRIVACY_POLICY } from '../../helpers/api'
import { showAlert, validemail } from '../../utils/index'
import { subscribe } from '../../helpers/api'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../store/actions'

const SubscribeScreen = ({ navigation , setSubscribedEmail}) => {
    const [email, setEmail] = React.useState('')
    const openPrivacy = () => {
        Linking.openURL(PRIVACY_POLICY)
    }
    const navigateHome = () => {
        navigation.navigate('Home')
    }

    const handleSubscribe = () => {
        if (!email?.length) {
            showAlert(Strings.ok, Strings.pleaseEnterEmail, "")
            return
        }
        if (validemail(email)) {
            showAlert(Strings.ok, Strings.pleaseEnterValidEmail, "")
            return
        }
        setSubscribedEmail(email)
        subscribe(email).then(res => {
            navigateHome()
        })

    }

    return (
        <View style={styles().container}>
            <Header
                title={Strings.subscribe}
                backWithText={Strings.home}
                leftAction={navigateHome}
            />
            <View style={styles().container}>
                <View>
                    <TouchableOpacity
                        style={styles().closebutton}
                        activeOpacity={0.6}
                        onPress={navigateHome}
                    >
                        <Icon type={'AntDesign'}
                            name={'close'}
                            style={styles().close}
                        />
                    </TouchableOpacity>
                    <View style={styles().adsWrapper}>
                        <Text allowFontScaling={false} style={styles().title} >{Strings.whyStop}</Text>
                        <Image
                            style={styles().adsImage}
                            source={Images.subscribe}
                        />
                        <Text allowFontScaling={false} style={styles().text} >{Strings.enterYour}</Text>
                        <View style={styles().inputWrapper}>
                            <Text allowFontScaling={false} style={styles().label} >{Strings.email}</Text>
                            <TextInput
                                style={styles().input}
                                placeholder={'example@email.com'}
                                placeholderTextColor={'grey'}
                                autoCapitalize={'none'}
                                keyboardType={'email-address'}
                                returnKeyType={'done'}
                                onChangeText={text => { setEmail(text) }}
                                value={email}
                            />
                        </View>
                        <View style={styles().flexWrapper}>
                            <View style={[styles().flexWrapper, { marginVertical: 20, paddingHorizontal:0 }]}>
                                <Icon type={'MaterialIcons'}
                                    name={'radio-button-unchecked'}
                                    style={styles().checkbox}
                                    onPress={navigateHome}
                                />
                                <Text allowFontScaling={false} style={styles().label} >{Strings.alreadySubscribed}</Text>
                            </View>
                            <TouchableOpacity
                                style={styles().button}
                                activeOpacity={0.6}
                                onPress={handleSubscribe}
                            >
                                <Text allowFontScaling={false} style={styles().label}>{Strings.subscribe}</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity activeOpacity={0.6} onPress={openPrivacy}>
                            <Text allowFontScaling={false} style={styles().privacy}>{Strings.privacy}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

const mapStateToProps = ({ user }) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ActionCreators, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(SubscribeScreen);
