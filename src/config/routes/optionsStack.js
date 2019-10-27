import {createStackNavigator} from 'react-navigation-stack'

import Options from '../../screens/options'

const OptionsStack = createStackNavigator({
  BottomTabNavigator: {
    screen: Options,
    navigationOptions: {
      header: () => null,
    },
  },
})

export default OptionsStack
