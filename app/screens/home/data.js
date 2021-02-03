import { Strings, Images, Screens, Colors } from '../../constants';

const borderBottomWidth = 1
const borderTopWidth = 1
const borderRightWidth = 1
const borderLeftWidth = 1

export default [
    {
        name: Strings.eat,
        icon: Images.eat,
        screen: Screens.Eat,
        style: {
            borderBottomWidth,
            borderRightWidth
        }
    },
    {
        name: Strings.train,
        icon: Images.track,
        screen: Screens.Train,
        style: {
            borderLeftWidth,
            borderBottomWidth,
            borderRightWidth
        }
    },
    {
        name: Strings.learn,
        icon: Images.learn,
        screen: Screens.Learn,
        style: {
            borderLeftWidth,
            borderBottomWidth,
        }
    },
    {
        name: Strings.shuffle,
        icon: Images.shuffle,
        screen: Screens.Shuffle,
        style: {
            borderTopWidth,
            borderRightWidth

        }
    }, {
        name: Strings.favorites,
        icon: Images.favorites,
        screen: Screens.Favorites,
        style: {
            borderLeftWidth,
            borderTopWidth,
            borderRightWidth

        }
    }
    , {
        name: Strings.selfies,
        icon: Images.selfiles,
        screen: Screens.Selfies,
        style: {
            borderLeftWidth,
            borderTopWidth
        }
    }
]