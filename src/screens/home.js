import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import styled from 'styled-components'
import posed from 'react-native-pose'
import idx from 'idx'

import allTheActions from '../actions'
import {CommonText} from '../components/texts'
import ItemDisplayer from '../components/itemDisplayer'
import MoviePoster from '../components/moviePoster'
import icons from '../components/icons'

import isIphoneX from '../utils/isIphoneX'
import checkIfisInMyMovies from '../utils/checkIfisInMyMovies'
import {widht} from '../utils/getDimensions'

const FontAwesome = icons('FontAwesome')

class Home extends Component {
  static propTypes = {
    actions: PropTypes.object,
    moviesState: PropTypes.object,
    navigation: PropTypes.object,
    myMoviesState: PropTypes.object,
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
        <HollowHeader></HollowHeader>
        <AnimatedHeader pose={this.state.headerAnimation}>
          <FilterPicker
            contentContainerStyle={{
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              paddingTop: isIphoneX ? 64 : 32,
            }}>
            <FilterRow
              onPress={() => this.selectFilter('popularity.desc')}
              isSelected={this.state.filter === 'popularity.desc'}>
              <CommonText color="#000000">popularité ⬇</CommonText>
            </FilterRow>
            <FilterRow
              onPress={() => this.selectFilter('popularity.asc')}
              isSelected={this.state.filter === 'popularity.asc'}>
              <CommonText color="#000000">popularité ⬆</CommonText>
            </FilterRow>
            <FilterRow
              onPress={() => this.selectFilter('release_date.desc')}
              isSelected={this.state.filter === 'release_date.desc'}>
              <CommonText color="#000000">date de sortie ⬇</CommonText>
            </FilterRow>
            <FilterRow
              onPress={() => this.selectFilter('release_date.asc')}
              isSelected={this.state.filter === 'release_date.asc'}>
              <CommonText color="#000000">date de sortie ⬆</CommonText>
            </FilterRow>
          </FilterPicker>
          <HeaderMenu onPress={this.animateHeader}>
            <FilterTouchable onPress={this.animateHeader}>
              <FontAwesome color="white" name="filter"></FontAwesome>
            </FilterTouchable>
          </HeaderMenu>
        </AnimatedHeader>
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

const FilterPicker = styled.ScrollView`
  height: ${isIphoneX ? '220px' : '200px'};
`
const FilterRow = styled.TouchableOpacity`
  width: 100%;
  padding: 8px;
  align-items: center;
  justify-content: flex-end;
  background-color: ${props =>
    props.isSelected ? '#0000003f' : 'transparent'};
`

const Header = styled.View`
  background-color: ${props => props.theme.general.header};
  height: ${isIphoneX ? '320px' : '280px'};

  position: absolute;
  width: 100%;
  z-index: 2;
  border-bottom-left-radius: 12px;

  border-bottom-right-radius: 12px;
  box-shadow: 0px 0px 10px #0000003d;
`
const HeaderMenu = styled.TouchableOpacity`
  height: ${isIphoneX ? '100px' : '80px'};
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 0px 12px;
`
const HollowHeader = styled(HeaderMenu)`
  position: relative;
`

const AnimatedHeader = posed(Header)({
  visible: {y: 0, transition: {duration: 1000}},
  invisible: {y: -200, transition: {duration: 1000}},
})

const HomeContainer = styled.View`
  flex: 1;
  background-color: ${props => props.theme.general.background};
`

const FilterTouchable = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  padding: 0px 12px;
  position: absolute;
  bottom: -30px;
  background-color: ${props => props.theme.general.badgeMenu};
  height: 60px;
  width: 60px;
  z-index: 3;
  border-radius: 30px;
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
