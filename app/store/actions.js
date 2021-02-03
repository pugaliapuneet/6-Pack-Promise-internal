import * as UserActions from './user/action'
import * as WorkoutActions from './workout/action'
import * as Suffleactions from './shuffle/action'

export const ActionCreators = Object.assign(
    {},
    UserActions,
    WorkoutActions,
    Suffleactions
)
