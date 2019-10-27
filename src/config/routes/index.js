import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

import BottomTabNavigator from './bottomTabNavigator'
import MovieDetails from '../../screens/movieDetails'

import {headerOptions} from './utils'

const AppNavigator = createStackNavigator({
  BottomTabNavigator: {
    screen: BottomTabNavigator,
    navigationOptions: {
      header: () => null,
    },
  },
  MovieDetails: {
    screen: MovieDetails,
    navigationOptions: ({navigation}) => headerOptions(navigation),
  },
})

export default createAppContainer(AppNavigator)
