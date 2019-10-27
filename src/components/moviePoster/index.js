import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {CommonText} from '../texts'

import noImage from '../../static/images/noImage.png'

export default class MoviePoster extends Component {
  static propTypes = {
    isInMyMovies: PropTypes.bool,
    item: PropTypes.object,
    myMoviesActions: PropTypes.object,
    onPress: PropTypes.func,
  }

  render() {
    const {item, onPress, myMoviesActions, isInMyMovies} = this.props
    return (
      <>
        <MovieTouchable onPress={onPress}>
          <Poster
            defaultSource={noImage}
            source={{
              uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
            }}></Poster>
          <AddOrRemoveMovie
            onPress={() =>
              isInMyMovies
                ? myMoviesActions.removeMovie(item.id)
                : myMoviesActions.addMovie(item)
            }>
            <CommonText color="white" weight={600}>
              {isInMyMovies ? '-' : '+'}
            </CommonText>
          </AddOrRemoveMovie>
          <TextContainer>
            <CommonText
              color="white"
              numberOfLines={1}
              size={12}
              textAlign="center">
              {item.title}
            </CommonText>
          </TextContainer>
        </MovieTouchable>
        <ButtonContainer></ButtonContainer>
      </>
    )
  }
}

const ButtonContainer = styled.View`
  align-items: center;
  justify-content: center;
`

const TextContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding: 12px;
  width: 100px;
`

const MovieTouchable = styled.TouchableOpacity`
  padding: 6px;
`
const Poster = styled.Image`
  border-radius: 12px;
  height: 150px;
  width: 100px;
  z-index: 2;
`
const AddOrRemoveMovie = styled.TouchableOpacity`
  align-items: center;
  background-color: ${props => props.theme.general.addMoviesSign};
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  height: 50px;
  justify-content: center;
  margin-top: -12px;
  width: 100px;
`
