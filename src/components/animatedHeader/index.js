import posed from 'react-native-pose'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import styled from 'styled-components'

import {CommonText} from '../texts'
import icons from '../icons'
import isIphoneX from '../../utils/isIphoneX'

const FontAwesome = icons('FontAwesome')

export default class AnimatedHeaderComponent extends Component {
  static propTypes = {
    animateHeader: PropTypes.func,
    filter: PropTypes.string,
    headerAnimation: PropTypes.string,
    selectFilter: PropTypes.func,
  }

  render() {
    const {selectFilter, animateHeader, headerAnimation, filter} = this.props
    return (
      <>
        <HollowHeader></HollowHeader>
        <AnimatedHeader pose={headerAnimation}>
          <FilterPicker
            contentContainerStyle={{
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              paddingTop: isIphoneX ? 64 : 32,
            }}>
            <FilterRow
              onPress={() => selectFilter('popularity.desc')}
              isSelected={filter === 'popularity.desc'}>
              <CommonText color="#000000">popularité ⬇</CommonText>
            </FilterRow>
            <FilterRow
              onPress={() => selectFilter('popularity.asc')}
              isSelected={filter === 'popularity.asc'}>
              <CommonText color="#000000">popularité ⬆</CommonText>
            </FilterRow>
            <FilterRow
              onPress={() => selectFilter('release_date.desc')}
              isSelected={filter === 'release_date.desc'}>
              <CommonText color="#000000">date de sortie ⬇</CommonText>
            </FilterRow>
            <FilterRow
              onPress={() => selectFilter('release_date.asc')}
              isSelected={filter === 'release_date.asc'}>
              <CommonText color="#000000">date de sortie ⬆</CommonText>
            </FilterRow>
          </FilterPicker>
          <HeaderMenu onPress={animateHeader}>
            <FilterTouchable onPress={animateHeader}>
              <FontAwesome color="white" name="filter"></FontAwesome>
            </FilterTouchable>
          </HeaderMenu>
        </AnimatedHeader>
      </>
    )
  }
}

const HeaderMenu = styled.TouchableOpacity`
  align-items: center;
  height: ${isIphoneX ? '100px' : '80px'};
  justify-content: center;
  padding: 0px 12px;
  width: 100%;
`
const HollowHeader = styled(HeaderMenu)`
  position: relative;
`

const FilterPicker = styled.ScrollView`
  height: ${isIphoneX ? '220px' : '200px'};
`
const FilterRow = styled.TouchableOpacity`
  align-items: center;
  background-color: ${props =>
    props.isSelected ? '#0000003f' : 'transparent'};
  justify-content: flex-end;
  padding: 8px;
  width: 100%;
`

const FilterTouchable = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.general.badgeMenu};
  border-radius: 30px;
  bottom: -30px;
  height: 60px;
  padding: 0px 12px;
  position: absolute;
  width: 60px;
  z-index: 3;
`

const Header = styled.View`
  background-color: ${props => props.theme.general.header};
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  box-shadow: 0px 0px 10px #0000003d;
  height: ${isIphoneX ? '320px' : '280px'};
  position: absolute;
  width: 100%;
  z-index: 2;
`

const AnimatedHeader = posed(Header)({
  visible: {y: 0, transition: {duration: 1000}},
  invisible: {y: -200, transition: {duration: 1000}},
})
