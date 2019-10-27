import {RATE_MOVIE} from '../actions/moviesRate'

const initialState = {
  ratedMovies: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case RATE_MOVIE:
      return {
        ...state,
        ratedMovies: {
          ...state.ratedMovies,

          [action.payload.id]: {
            ...action.payload[action.payload.id],
            rate: action.payload.rate,
          },
        },
      }
    default:
      return state
  }
}
