import idx from 'idx'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import styled from 'styled-components'

import {CommonText} from '../texts'

export default class MyMoviesPoster extends Component {
  static propTypes = {
    item: PropTypes.object,
    onPress: PropTypes.func,
    rateObject: PropTypes.object,
  }

  render() {
    const {item, onPress, rateObject} = this.props
    return (
      <MovieTouchable onPress={onPress}>
        <Poster
          source={{
            uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
          }}></Poster>
        <TextContainer>
          <CommonText color="white" numberOfLines={1} size={12}>
            {item.title}
          </CommonText>
        </TextContainer>
        {idx(rateObject, _ => _.rate) ? (
          <MyRate rate={rateObject.rate}>
            <CommonText color="white" size={10}>
              <CommonText color="white" size={14}>
                {rateObject.rate}
              </CommonText>
              /10
            </CommonText>
          </MyRate>
        ) : null}
      </MovieTouchable>
    )
  }
}

const MyRate = styled.View`
  align-items: center;
  background-color: ${props =>
    props.rate >= 5
      ? props.theme.general.rateGood
      : props.theme.general.rateBad};
  border-radius: 6px;
  bottom: 30px;
  height: 20px;
  justify-content: center;
  position: absolute;
  right: 12px;
  width: 40px;
`

const MovieTouchable = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  padding: 8px;
`

const TextContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 100px;
`

const Poster = styled.Image`
  border-radius: 8px;
  height: 150px;
  width: 100px;
`
