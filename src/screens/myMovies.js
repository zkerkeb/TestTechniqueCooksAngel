import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import idx from 'idx'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import styled from 'styled-components'

import {CommonText} from '../components/texts'
import allTheActions from '../actions'
import ItemDisplayer from '../components/itemDisplayer'
import MyMoviesPoster from '../components/myMoviesPoster'

import {widht} from '../utils/getDimensions'
import isIphoneX from '../utils/isIphoneX'

class MyMovies extends Component {
  static propTypes = {
    moviesRateState: PropTypes.object,
    myMoviesState: PropTypes.object,
    navigation: PropTypes.object,
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
            numColumns={numColumns}
            onEndReached={() => null}
            renderItem={this.renderMovies}></ItemDisplayer>
        ) : null}
      </MyMoviesContainer>
    )
  }
}

const Header = styled.View`
  align-items: center;
  background-color: ${props => props.theme.general.header};
  height: ${isIphoneX ? '104px' : '64px'}
  justify-content:center;
`

const MyMoviesContainer = styled.View`
  background-color: ${props => props.theme.general.background};
  flex: 1;
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
