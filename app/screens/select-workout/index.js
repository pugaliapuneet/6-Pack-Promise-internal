
import React from 'react';
import { SafeAreaView, Text, View, Image, TouchableOpacity } from 'react-native';
import styles from './styles'
import { Strings, Screens } from '../../constants';
import TimePicker from './time-picker'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../store/actions'


const SelectWorkout = ({ navigation, workoutTime, setWorkoutTime }) => {
    return (
        <View style={styles().container}>
            <Text allowFontScaling={false} style={styles().title}>{Strings.workoutTitle}</Text>
            <TimePicker value={workoutTime}  onChangeTime={setWorkoutTime}/>
            <Text allowFontScaling={false} style={styles().text}>{Strings.workoutNote}</Text>
            <TouchableOpacity
                style={styles().button}
                onPress={() => { navigation.navigate(Screens.Subscribe) }}
            >
                <Text allowFontScaling={false} style={styles().done}>{Strings.done}</Text>
            </TouchableOpacity>
        </View>
    );
};

const mapStateToProps = ({ user }) => {

    return {
        workoutTime:user.workoutTime
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ActionCreators, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(SelectWorkout);
