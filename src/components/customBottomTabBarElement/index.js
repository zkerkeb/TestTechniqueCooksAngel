import posed from 'react-native-pose'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import styled from 'styled-components'
import IconEntypo from 'react-native-vector-icons/Entypo'

const TabBarContainer = styled.TouchableOpacity`
  align-items: center;
  flex: 1;
  z-index: 4;
  justify-content: flex-start;
`

const IconAnimationEntypo = posed(IconEntypo)({
  isFocused: {y: -5},
  isNotFocused: {y: 5},
})

const returnIcon = (route, isFocused) => {
  const tintColor = isFocused ? '#ffffff' : '#000000'
  switch (route) {
    case 'MovieStack':
      return (
        <IconAnimationEntypo
          pose={isFocused ? 'isFocused' : 'isNotFocused'}
          size={isFocused ? 20 : 15}
          name="video"
          color={tintColor}
        />
      )
    case 'MyMovies':
      return (
        <IconAnimationEntypo
          pose={isFocused ? 'isFocused' : 'isNotFocused'}
          size={isFocused ? 20 : 15}
          name="list"
          color={tintColor}
        />
      )

    default:
      return (
        <IconAnimationEntypo
          pose={isFocused ? 'isFocused' : 'isNotFocused'}
          size={isFocused ? 25 : 20}
          name="home"
          color={tintColor}
        />
      )
  }
}

export default class CustomBottomTabBarElement extends Component {
  handleNavigation = location => {
    const {navigation} = this.props
    navigation.navigate(location)
  }

  render() {
    const {index, routeName, navigation} = this.props
    const isFocused = navigation.state.index === index
    return (
      <TabBarContainer
        isActive={isFocused}
        onPress={() => this.handleNavigation(routeName)}>
        <TabElementAnimated pose={isFocused ? 'elevated' : 'down'}>
          {returnIcon(routeName, isFocused)}
        </TabElementAnimated>
      </TabBarContainer>
    )
  }
}

const TabElement = styled.View`
  align-items: center;
  border-radius: 128px;
  height: 30px;
  justify-content: center;
  width: 30px;
`

const TabElementAnimated = posed(TabElement)({
  down: {y: 0, transition: {duration: 1000}},
  elevated: {y: 0, transition: {duration: 1000}},
})

CustomBottomTabBarElement.propTypes = {
  actions: PropTypes.object,
  index: PropTypes.number,
  navigation: PropTypes.object,
  routeName: PropTypes.string,
}
