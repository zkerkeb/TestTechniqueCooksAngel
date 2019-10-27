import PropTypes from 'prop-types'
import React, {Component} from 'react'
import styled from 'styled-components'

import {CommonText} from '../texts'

export default class AddMovies extends Component {
  static propTypes = {
    addMovie: PropTypes.func,
    isInMyMovies: PropTypes.bool,
    removeMovie: PropTypes.func,
  }

  render() {
    const {isInMyMovies, addMovie, removeMovie} = this.props
    return (
      <AddMoviesButton
        onPress={() => (!isInMyMovies ? addMovie() : removeMovie())}>
        <TextContainer>
          <CommonText size={10}>
            {!isInMyMovies ? 'AJOUTER À MA LISTE' : 'RETIRER DE MA LISTE'}
          </CommonText>
        </TextContainer>
        <SignContainer>
          <CommonText size={20}>{!isInMyMovies ? '+' : '-'}</CommonText>
        </SignContainer>
      </AddMoviesButton>
    )
  }
}

const SignContainer = styled.View`
  background-color: ${props => props.theme.general.addMoviesSign};
  padding: 4px 12px;
`
const TextContainer = styled.View`
  align-items: center;
  padding: 0px 12px;
`

const AddMoviesButton = styled.TouchableOpacity`
  align-items: center;
  background-color: ${props => props.theme.general.addMoviesText};
  border-radius: 8px;
  flex-direction: row;
  overflow: hidden;
`
