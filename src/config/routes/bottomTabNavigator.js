import {createBottomTabNavigator} from 'react-navigation-tabs'

import MyMovies from '../../screens/myMovies'

import MovieStack from './movieStack'

import CustomBottomBar from '../../components/customBottomTabBar'

const BottomTabNavigator = createBottomTabNavigator(
  {
    MovieStack: {
      screen: MovieStack,
      navigationOptions: {},
    },
    MyMovies: {
      screen: MyMovies,
      navigationOptions: {},
    },
  },
  {
    tabBarComponent: CustomBottomBar,
    tabBarOptions: {
      order: ['MovieStack', 'MyMovies'],
      showIcon: true,
    },
  },
)

export default BottomTabNavigator
