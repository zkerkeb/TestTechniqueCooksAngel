import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {CommonText} from '../texts'

export default class AddMovies extends Component {
  static propTypes = {
    isInMyMovies: PropTypes.bool,
    addMovie: PropTypes.func,
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
  padding: 4px 12px;
  background-color: ${props => props.theme.general.addMoviesSign};
`
const TextContainer = styled.View`
  align-items: center;
  padding: 0px 12px;
`

const AddMoviesButton = styled.TouchableOpacity`
  background-color: ${props => props.theme.general.addMoviesText};
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
`
