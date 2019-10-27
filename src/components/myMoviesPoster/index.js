import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import idx from 'idx'

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
  position: absolute;
  background-color: ${props =>
    props.rate >= 5
      ? props.theme.general.rateGood
      : props.theme.general.rateBad};
  bottom: 30px;
  height: 20px;
  width: 40px;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  right: 12px;
`

const MovieTouchable = styled.TouchableOpacity`
  padding: 8px;
  justify-content: center;
  align-items: center;
`

const TextContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 100px;
`

const Poster = styled.Image`
  height: 150px;
  width: 100px;
  border-radius: 8px;
`
