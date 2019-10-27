import PropTypes from 'prop-types'
import React, {Component} from 'react'
import styled from 'styled-components'

import {CommonText} from '../texts'

export default class Rate extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    rateObject: PropTypes.object,
  }

  render() {
    const {onPress, rateObject = {}} = this.props
    return (
      <RateContainer>
        <RateTouchable
          rate={1}
          selected={rateObject.rate === 1}
          onPress={() => onPress(1)}>
          <CommonText weight="bold" size={12}>
            1
          </CommonText>
        </RateTouchable>
        <RateTouchable
          rate={2}
          selected={rateObject.rate === 2}
          onPress={() => onPress(2)}>
          <CommonText weight="bold" size={12}>
            2
          </CommonText>
        </RateTouchable>
        <RateTouchable
          rate={3}
          selected={rateObject.rate === 3}
          onPress={() => onPress(3)}>
          <CommonText weight="bold" size={12}>
            3
          </CommonText>
        </RateTouchable>
        <RateTouchable
          rate={4}
          selected={rateObject.rate === 4}
          onPress={() => onPress(4)}>
          <CommonText weight="bold" size={12}>
            4
          </CommonText>
        </RateTouchable>
        <RateTouchable
          rate={5}
          selected={rateObject.rate === 5}
          onPress={() => onPress(5)}>
          <CommonText weight="bold" size={12}>
            5
          </CommonText>
        </RateTouchable>
        <RateTouchable
          rate={6}
          selected={rateObject.rate === 6}
          onPress={() => onPress(6)}>
          <CommonText weight="bold" size={12}>
            6
          </CommonText>
        </RateTouchable>
        <RateTouchable
          rate={7}
          selected={rateObject.rate === 7}
          onPress={() => onPress(7)}>
          <CommonText weight="bold" size={12}>
            7
          </CommonText>
        </RateTouchable>
        <RateTouchable
          rate={8}
          selected={rateObject.rate === 8}
          onPress={() => onPress(8)}>
          <CommonText weight="bold" size={12}>
            8
          </CommonText>
        </RateTouchable>
        <RateTouchable
          rate={9}
          selected={rateObject.rate === 9}
          onPress={() => onPress(9)}>
          <CommonText weight="bold" size={12}>
            9
          </CommonText>
        </RateTouchable>
        <RateTouchable
          rate={10}
          selected={rateObject.rate === 10}
          onPress={() => onPress(10)}>
          <CommonText weight="bold" size={12}>
            10
          </CommonText>
        </RateTouchable>
      </RateContainer>
    )
  }
}

const RateContainer = styled.View`
  align-self: center;
  background-color: ${props => props.theme.general.rateBackground}
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  flex-direction: row;
  padding:12px;
`

const RateTouchable = styled.TouchableOpacity`
  align-items: center;
  background-color: ${props =>
    props.selected
      ? props.rate >= 5
        ? props.theme.general.rateGood
        : props.theme.general.rateBad
      : props.theme.general.rate};
  border-radius: 25px;
  height: 25px;
  justify-content: center;
  margin: 0px 2px 0px 2px;
  width: 25px;
`
