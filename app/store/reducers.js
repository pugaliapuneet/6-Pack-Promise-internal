import { combineReducers } from 'redux'
import { UserReducer } from './user/reducer'
import { WorkoutReducer } from './workout/reducer'
import { ShuffleReducer } from './shuffle/reducer'

export default combineReducers({
    user: UserReducer,
    workout: WorkoutReducer,
    shuffle: ShuffleReducer
})
