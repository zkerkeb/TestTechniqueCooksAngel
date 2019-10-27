import PropTypes from 'prop-types'
import React, {Component} from 'react'
import styled from 'styled-components'

import {CommonText} from '../texts'

export default class index extends Component {
  static propTypes = {
    voteAverage: PropTypes.number,
  }

  render() {
    const {voteAverage} = this.props
    return (
      <VoteContainer>
        <TextContainer>
          <CommonText size={8}>NOTE MOYENNE</CommonText>
        </TextContainer>
        <RateAverage>
          <CommonText size={20}>{voteAverage}</CommonText>
        </RateAverage>
      </VoteContainer>
    )
  }
}

const VoteContainer = styled.View`
  align-items: center;
  background-color: ${props => props.theme.general.voteText};
  border-radius: 8px;
  flex-direction: row;
  justify-content: center;
  overflow: hidden;
`
const TextContainer = styled.View`
  padding: 0px 20px;
`

const RateAverage = styled.View`
  align-items: center;
  background-color: ${props => props.theme.general.voteRate};
  justify-content: center;
  padding: 4px 4px;
`
