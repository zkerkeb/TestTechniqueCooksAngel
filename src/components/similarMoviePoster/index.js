import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {CommonText} from '../texts'
import noImage from '../../static/images/noImage.png'

export default class SimilarMoviePoster extends Component {
  static propTypes = {
    item: PropTypes.object,
    onPress: PropTypes.func,
  }

  render() {
    const {item, onPress} = this.props
    return (
      <MovieTouchable onPress={onPress}>
        <Poster
          defaultSource={noImage}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
          }}></Poster>
        <TextContainer>
          <CommonText numberOfLines={1} size={12}>
            {item.title}
          </CommonText>
        </TextContainer>
      </MovieTouchable>
    )
  }
}

const MovieTouchable = styled.TouchableOpacity`
  padding: 12px;
  height: 240px;
  width: 150px;
  margin: 0px 6px;
`

const TextContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 150px;
`

const Poster = styled.Image`
  border-radius: 8px;
  height: 200px;
  width: 150px;
`
