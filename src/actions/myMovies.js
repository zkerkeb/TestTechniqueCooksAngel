export const DISPLAY_MY_MOVIES = 'DISPLAY_MY_MOVIES'
export const ADD_MOVIE = 'ADD_MOVIE'
export const REMOVE_MOVIE = 'REMOVE_MOVIE'

export const displayMyMovies = payload => ({
  type: DISPLAY_MY_MOVIES,
  payload,
})

export const addMovie = payload => ({
  type: ADD_MOVIE,
  payload,
})

export const removeMovie = payload => ({
  type: REMOVE_MOVIE,
  payload,
})
