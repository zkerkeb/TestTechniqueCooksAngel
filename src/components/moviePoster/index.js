import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {CommonText} from '../texts'
import AddMovies from '../addMovies'

import noImage from '../../static/images/noImage.png'

export default class MoviePoster extends Component {
  static propTypes = {
    item: PropTypes.object,
    onPress: PropTypes.func,
    myMoviesActions: PropTypes.object,
    isInMyMovies: PropTypes.bool,
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
              numberOfLines={1}
              size={12}
              color="white"
              textAlign="center">
              {item.title}
            </CommonText>
          </TextContainer>
        </MovieTouchable>
        <ButtonContainer>
          {/* <AddMovies
            addMovie={() => myMoviesActions.addMovie(item)}
            removeMovie={() => myMoviesActions.removeMovie(item.id)}
            isInMyMovies={isInMyMovies}></AddMovies> */}
        </ButtonContainer>
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
  height: 50px;
  width: 100px;
  background-color: ${props => props.theme.general.addMoviesSign};
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  align-items: center;
  justify-content: center;
  margin-top: -12px;
`
