import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import idx from 'idx'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import styled from 'styled-components'

import allTheActions from '../actions'
import AnimateHeader from '../components/animatedHeader'
import ItemDisplayer from '../components/itemDisplayer'
import MoviePoster from '../components/moviePoster'

import {widht} from '../utils/getDimensions'
import checkIfisInMyMovies from '../utils/checkIfisInMyMovies'

class Home extends Component {
  static propTypes = {
    actions: PropTypes.object,
    moviesState: PropTypes.object,
    myMoviesState: PropTypes.object,
    navigation: PropTypes.object,
  }

  state = {
    filter: 'popularity.desc',
    headerAnimation: 'invisible',
    numColumns: null,
  }

  componentDidMount() {
    this.fetchMovies()
    this.handleNumColumns()
  }

  fetchMovies = (page = 1, sort = 'popularity.desc') => {
    const {actions} = this.props
    actions.movies.getMovies({page, sort})
  }

  handleNavigation = id => {
    const {navigation} = this.props
    navigation.navigate('MovieDetails', {id})
  }

  renderMovies = item => {
    const {actions, myMoviesState} = this.props
    const isInMyMovies = checkIfisInMyMovies(item.id, myMoviesState.list)
    if (!item) return
    return (
      <MoviePoster
        onPress={() => this.handleNavigation(item.id)}
        isInMyMovies={isInMyMovies}
        myMoviesActions={actions.myMovies}
        item={item}></MoviePoster>
    )
  }

  animateHeader = () => {
    this.setState({
      headerAnimation:
        this.state.headerAnimation === 'invisible' ? 'visible' : 'invisible',
    })
  }

  selectFilter = filterValue => {
    this.setState({filter: filterValue}, async () => {
      await this.props.actions.movies.clearMovies()
      this.fetchMovies(1, this.state.filter)
    })
  }

  // this function dynamically attributes a numColumn to the flatlist
  handleNumColumns = () => {
    const numColumns = Math.floor(widht / 116) /// 116 is the total width of a myMoviePoster
    this.setState({numColumns})
  }

  render() {
    const {moviesState, myMoviesState} = this.props
    const {numColumns} = this.state
    return (
      <HomeContainer>
        <AnimateHeader
          selectFilter={this.selectFilter}
          animateHeader={this.animateHeader}
          filter={this.state.filter}
          headerAnimation={this.state.headerAnimation}></AnimateHeader>
        {idx(moviesState, _ => _.movies.list) && numColumns ? (
          <ItemDisplayer
            contentContainerStyle={{
              alignItems: 'center',
              paddingTop: 36,
            }}
            extraData={myMoviesState}
            data={moviesState.movies.list}
            renderItem={this.renderMovies}
            numColumns={numColumns}
            onEndReached={() =>
              this.fetchMovies(moviesState.movies.page + 1)
            }></ItemDisplayer>
        ) : null}
      </HomeContainer>
    )
  }
}

const HomeContainer = styled.View`
  background-color: ${props => props.theme.general.background};
  flex: 1;
`

const mapStateProps = state => ({
  moviesState: state.movies,
  myMoviesState: state.myMovies,
})

const mapDispatchToProps = () => dispatch => ({
  actions: {
    movies: bindActionCreators(allTheActions.movies, dispatch),
    myMovies: bindActionCreators(allTheActions.myMovies, dispatch),
  },
})

export default connect(
  mapStateProps,
  mapDispatchToProps,
)(Home)
