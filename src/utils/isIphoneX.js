import { Dimensions, Platform } from 'react-native'

const d = Dimensions.get('window')
const isIphoneX =
  Platform.OS === 'ios' && (d.height > 800 || d.width > 800) ? true : false

export default isIphoneX
