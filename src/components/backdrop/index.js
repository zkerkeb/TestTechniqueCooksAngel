import PropTypes from 'prop-types'
import React, {Component} from 'react'
import styled from 'styled-components'

import {CommonText} from '../texts'
import noImage from '../../static/images/noImage.png'

export default class BackdropComponent extends Component {
  static propTypes = {
    movieDetails: PropTypes.object,
  }

  render() {
    const {movieDetails} = this.props
    return (
      <BackdropContainer>
        <Backdrop
          defaultSource={noImage}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`,
          }}></Backdrop>
        <TitleContainer>
          <GenreDisplayer horizontal={true}>
            {movieDetails.genres.map(genre => (
              <Genre key={genre.id}>
                <CommonText size={12} color="white">
                  {genre.name}
                </CommonText>
              </Genre>
            ))}
          </GenreDisplayer>
          <CommonText numberOfLines={1} color="white">
            {movieDetails.title}
          </CommonText>
        </TitleContainer>
      </BackdropContainer>
    )
  }
}

const BackdropContainer = styled.View``

const Backdrop = styled.Image`
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  box-shadow: 0px 0px 10px #000000af;
  height: 200px;
  overflow: hidden;
  width: 100%;
`
const TitleContainer = styled.View`
  align-items: center;
  background-color: #0000004d;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  bottom: 0px;
  flex: 1;
  justify-content: center;
  padding: 6px;
  position: absolute;
  width: 100%;
`

const GenreDisplayer = styled.View`
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding: 6px;
  width: 100%;
`
const Genre = styled.View`
  background-color: ${props => props.theme.general.genre};
  border-radius: 4px;
  margin: 0px 4px;
  padding: 4px;
`
