import {createStackNavigator} from 'react-navigation-stack'

import Home from '../../screens/home'

const MovieStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      header: () => null,
    },
  },
})

export default MovieStack
