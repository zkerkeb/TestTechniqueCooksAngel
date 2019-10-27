import {
  CLEAR_MOVIES,
  DISPLAY_MOVIES,
  DISPLAY_MOVIE_DETAILS,
  DISPLAY_SIMILAR_MOVIES,
} from '../actions/movies'

const initialState = {
  movies: {
    page: 1,
    list: [],
  },
  movieDetails: null,
  similarMovies: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_MOVIES:
      return {
        ...state,
        movies: {
          ...state.movies,
          page: action.payload.page,
          list: [...state.movies.list, ...action.payload.list],
        },
      }
    case DISPLAY_MOVIE_DETAILS:
      return {
        ...state,
        movieDetails: action.payload,
      }
    case CLEAR_MOVIES:
      return {
        ...state,
        movies: {
          page: 1,
          list: [],
        },
      }
    case DISPLAY_SIMILAR_MOVIES:
      return {
        ...state,
        similarMovies: action.payload,
      }
    default:
      return state
  }
}
