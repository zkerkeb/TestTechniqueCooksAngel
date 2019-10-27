import PropTypes from 'prop-types'
import React, {Component} from 'react'
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
  height: 240px;
  margin: 0px 6px;
  padding: 12px;
  width: 150px;
`

const TextContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 150px;
`

const Poster = styled.Image`
  border-radius: 8px;
  height: 200px;
  width: 150px;
`
