import { createStackNavigator} from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from '../screens/home';
import Quizz from '../screens/quizz';
import Options from '../screens/options'

const screens = {
    Home: {
        screen: Home
    },
    Quizz : {
        screen: Quizz
    },
    Options: {
        screen: Options
    }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);