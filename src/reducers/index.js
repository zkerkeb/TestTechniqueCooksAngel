import {combineReducers} from 'redux'

import movies from './movies'
import myMovies from './myMovies'
import moviesRate from './moviesRate'

export default combineReducers({
  movies,
  myMovies,
  moviesRate,
})
