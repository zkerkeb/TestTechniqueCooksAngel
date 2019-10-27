import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import styled from 'styled-components'
import idx from 'idx'

import allTheActions from '../actions'
import MyMoviesPoster from '../components/myMoviesPoster'
import ItemDisplayer from '../components/itemDisplayer'
import {CommonText} from '../components/texts'

import {widht} from '../utils/getDimensions'
import isIphoneX from '../utils/isIphoneX'

class MyMovies extends Component {
  static propTypes = {
    myMoviesState: PropTypes.object,
    navigation: PropTypes.object,
    moviesRateState: PropTypes.object,
  }

  state = {
    numColumns: null,
  }

  componentDidMount() {
    this.handleNumColumns()
  }

  // this function dynamically attributes a numColumn to the flatlist
  handleNumColumns = () => {
    const numColumns = Math.floor(widht / 116) /// 116 is the total width of a myMoviePoster
    this.setState({numColumns})
  }

  handleNavigation = id => {
    const {navigation} = this.props
    navigation.navigate('MovieDetails', {id})
  }

  renderMovies = item => {
    const {moviesRateState} = this.props
    if (!item) return
    return (
      <MyMoviesPoster
        rateObject={moviesRateState.ratedMovies[item.id]}
        onPress={() => this.handleNavigation(item.id)}
        item={item}></MyMoviesPoster>
    )
  }

  render() {
    const {myMoviesState} = this.props
    const {numColumns} = this.state
    return (
      <MyMoviesContainer>
        <Header>
          <CommonText size={18} weight={600}>
            Ma Liste
          </CommonText>
        </Header>
        {idx(myMoviesState, _ => _.list) && numColumns ? (
          <ItemDisplayer
            contentContainerStyle={{alignItems: 'center'}}
            data={myMoviesState.list}
            renderItem={this.renderMovies}
            numColumns={numColumns}
            onEndReached={() => null}></ItemDisplayer>
        ) : null}
      </MyMoviesContainer>
    )
  }
}

const Header = styled.View`
  height: ${isIphoneX ? '104px' : '64px'}
  background-color: ${props => props.theme.general.header};
  align-items: center;
  justify-content:center;
`

const MyMoviesContainer = styled.View`
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
    myMovies: bindActionCreators(allTheActions.myMovies, dispatch),
  },
})

export default connect(
  mapStateProps,
  mapDispatchToProps,
)(MyMovies)
