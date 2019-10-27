import Entypo from './entypo'
import IonIcons from './ionIcons'

export default typeIcons => {
  switch (typeIcons) {
    case 'Entypo':
      return Entypo
    case 'IonIcons':
      return IonIcons
    default:
      return IonIcons
  }
}
