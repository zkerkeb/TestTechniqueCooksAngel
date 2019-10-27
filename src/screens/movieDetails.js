import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import styled from 'styled-components'

import ItemDisplayer from '../components/itemDisplayer'
import Rate from '../components/rate'
import SimilarMoviePoster from '../components/similarMoviePoster'

import {CommonText} from '../components/texts'
import AddMovies from '../components/addMovies'
import allTheActions from '../actions'
import Backdrop from '../components/backdrop'
import Vote from '../components/vote'

import checkIfisInMyMovies from '../utils/checkIfisInMyMovies'

class MovieDetails extends Component {
  static propTypes = {
    actions: PropTypes.object,
    moviesRateState: PropTypes.object,
    moviesState: PropTypes.object,
    myMoviesState: PropTypes.object,
    navigation: PropTypes.object,
  }

  state = {
    id: 0,
  }

  componentDidMount() {
    const {navigation, actions} = this.props
    const id = navigation.getParam('id', 0)
    this.setState({id}, () => {
      actions.movies.getMovieDetails(id)
      actions.movies.getSimilarMovies(id)
    })
  }

  renderSimilarMovies = item => {
    if (!item) return
    return (
      <SimilarMoviePoster
        onPress={() => this.handleNavigation(item.id)}
        item={item}></SimilarMoviePoster>
    )
  }

  handleNavigation = id => {
    const {navigation} = this.props
    navigation.push('MovieDetails', {id})
  }

  rate = rateValue => {
    const {actions} = this.props
    actions.moviesRate.rateMovie({id: this.state.id, rate: rateValue})
  }

  render() {
    const {actions, moviesState, moviesRateState, myMoviesState} = this.props
    if (!moviesState.movieDetails) return null
    const {movieDetails} = moviesState
    const isInMyMovies = checkIfisInMyMovies(this.state.id, myMoviesState.list)
    return (
      <MovieDetailsContainer showsVerticalScrollIndicator={false}>
        <Backdrop movieDetails={movieDetails}></Backdrop>
        <Rate
          rateObject={moviesRateState.ratedMovies[this.state.id]}
          onPress={this.rate}></Rate>
        <SynopsisContainer>
          <CommonText size={12} color="white">
            {movieDetails.overview}
          </CommonText>
        </SynopsisContainer>
        <InfoBar>
          <Vote voteAverage={movieDetails.vote_average}></Vote>
          <AddMovies
            isInMyMovies={isInMyMovies}
            addMovie={() => actions.myMovies.addMovie(movieDetails)}
            removeMovie={() =>
              actions.myMovies.removeMovie(movieDetails.id)
            }></AddMovies>
        </InfoBar>
        <SimilarMovieTitleContainer>
          <CommonText color="white">Films Similaire</CommonText>
        </SimilarMovieTitleContainer>
        <ItemDisplayer
          data={moviesState.similarMovies}
          horizontal={true}
          renderItem={this.renderSimilarMovies}
          onEndReached={() => null}></ItemDisplayer>
      </MovieDetailsContainer>
    )
  }
}

const InfoBar = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin: 12px 0px;
  padding: 0px 6px;
`

const SynopsisContainer = styled.View`
  background-color: ${props => props.theme.general.synopsis};
  margin-top: 12px;
  padding: 12px;
`

const SimilarMovieTitleContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding: 12px 0px;
  width: 100%;
`

const MovieDetailsContainer = styled.ScrollView`
  flex: 1;
  background-color: ${props => props.theme.general.background};
`

const mapStateProps = state => ({
  moviesState: state.movies,
  myMoviesState: state.myMovies,
  moviesRateState: state.moviesRate,
})

const mapDispatchToProps = () => dispatch => ({
  actions: {
    movies: bindActionCreators(allTheActions.movies, dispatch),
    moviesRate: bindActionCreators(allTheActions.moviesRate, dispatch),
    myMovies: bindActionCreators(allTheActions.myMovies, dispatch),
  },
})

export default connect(
  mapStateProps,
  mapDispatchToProps,
)(MovieDetails)
