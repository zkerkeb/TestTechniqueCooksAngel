import Entypo from './entypo'
import IonIcons from './ionIcons'
import FontAwesome from './fontAwesome'

export default typeIcons => {
  switch (typeIcons) {
    case 'Entypo':
      return Entypo
    case 'IonIcons':
      return IonIcons
    case 'FontAwesome':
      return FontAwesome
    default:
      return IonIcons
  }
}
