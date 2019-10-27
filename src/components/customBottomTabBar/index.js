import {Dimensions} from 'react-native'
import posed from 'react-native-pose'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import styled from 'styled-components'
import CustomBottomBarElement from '../customBottomTabBarElement'

import isIphoneX from '../../utils/isIphoneX'

const BarContainer = styled.View`
  background-color: ${props => props.theme.general.menu};
  flex-direction: row;
  height: ${isIphoneX ? '75px' : '45px'};
  overflow: visible;
`

const windowWidth = Dimensions.get('window').width
const tabWidth = windowWidth / 2

const AbsoluteBottomElementCap = styled.View`
  background-color: ${props => props.theme.general.badgeMenu};
  top: -10px;
  position: absolute;
  height: 40px;
  width: 40px;
  box-shadow: 0px 8px 6px #0000003f;
  border-radius: 48px;
  z-index: 1;
  justify-content: center;
  align-items: center;
`

const AbsoluteBottomElementContainer = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
  position: absolute;
  height: 30px;
  z-index: 1;
  width: 30px;
  width: ${tabWidth};
`

const AbsoluteBottomElementCapAnimated = posed(AbsoluteBottomElementCap)({
  link0: {x: 0},
  link1: {x: tabWidth},
})

export default class CustomBottomBar extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  }

  render() {
    const {navigation} = this.props
    return (
      <>
        <BarContainer>
          <AbsoluteBottomElementContainer>
            <AbsoluteBottomElementCapAnimated
              pose={`link${navigation.state.index}`}
              index={navigation.state.index}
            />
          </AbsoluteBottomElementContainer>
          {navigation.state.routes.map((tab, index) => (
            <CustomBottomBarElement
              {...tab}
              navigation={navigation}
              key={tab.routeName}
              index={index}
            />
          ))}
        </BarContainer>
      </>
    )
  }
}
