import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import styled from 'styled-components'

import ItemDisplayer from '../components/itemDisplayer'
import SimilarMoviePoster from '../components/similarMoviePoster'
import Rate from '../components/rate'

import allTheActions from '../actions'
import {CommonText} from '../components/texts'
import noImage from '../static/images/noImage.png'
import AddMovies from '../components/addMovies'

import checkIfisInMyMovies from '../utils/checkIfisInMyMovies'

class MovieDetails extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    actions: PropTypes.object,
    myMoviesState: PropTypes.object,
    moviesRateState: PropTypes.object,
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
      <MovieDetailsContainer>
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
        <Rate
          rateObject={moviesRateState.ratedMovies[this.state.id]}
          onPress={this.rate}></Rate>
        <SynopsisContainer>
          <CommonText size={12} color="white">
            {movieDetails.overview}
          </CommonText>
        </SynopsisContainer>
        <InfoBar>
          <VoteContainer>
            <TextContainer>
              <CommonText size={8}>NOTE MOYENNE</CommonText>
            </TextContainer>
            <RateAverage>
              <CommonText size={20}>{movieDetails.vote_average}</CommonText>
            </RateAverage>
          </VoteContainer>
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
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0px;
  padding: 0px 6px;
`
const VoteContainer = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: center;
  border-radius: 8px;
  overflow: hidden;
  background-color: ${props => props.theme.general.voteText};
`
const TextContainer = styled.View`
  padding: 0px 20px;
`

const RateAverage = styled.View`
  align-items: center;
  justify-content: center;
  padding: 4px 4px;
  background-color: ${props => props.theme.general.voteRate};
`

const SynopsisContainer = styled.View`
  padding: 12px;
  margin-top: 12px;
  background-color: ${props => props.theme.general.synopsis};
`

const GenreDisplayer = styled.View`
  padding: 6px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
`
const Genre = styled.View`
  padding: 4px;
  border-radius: 4px;
  margin: 0px 4px;
  background-color: ${props => props.theme.general.genre};
`

const SimilarMovieTitleContainer = styled.View`
  width: 100%;

  align-items: center;
  justify-content: center;
  padding: 12px 0px;
`

const MovieDetailsContainer = styled.ScrollView`
  flex: 1;
  background-color: ${props => props.theme.general.background};
`

const TitleContainer = styled.View`
  position: absolute;
  bottom: 0px;
  justify-content: center;
  align-items: center;
  flex: 1;
  width: 100%;
  background-color: #0000004d;
  padding: 6px;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
`

const BackdropContainer = styled.View``

const Backdrop = styled.Image`
  height: 200px;
  width: 100%;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  box-shadow: 0px 0px 10px #000000af;
  overflow: hidden;
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
