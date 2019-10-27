import axios from 'axios'

export const DISPLAY_MOVIES = 'DISPLAY_MOVIES'
export const CLEAR_MOVIES = 'CLEAR_MOVIES'
export const DISPLAY_MOVIE_DETAILS = 'DISPLAY_MOVIE_DETAILS'
export const DISPLAY_SIMILAR_MOVIES = 'DISPLAY_SIMILAR_MOVIES'

export const displayMovies = payload => ({
  type: DISPLAY_MOVIES,
  payload,
})

export const clearMovies = () => ({
  type: CLEAR_MOVIES,
})

export const displayMovieDetails = payload => ({
  type: DISPLAY_MOVIE_DETAILS,
  payload,
})

export const displaySimilarMovies = payload => ({
  type: DISPLAY_SIMILAR_MOVIES,
  payload,
})

export const getMovies = ({page = 1, sort}) => dispatch => {
  axios
    .get('https://api.themoviedb.org/3/discover/movie', {
      params: {
        page,
        include_video: 'false',
        include_adult: 'false',
        sort_by: sort,
        language: 'fr-FR',
        api_key: 'feae11ae0f071861c89ed4b71d642cea',
      },
    })
    .then(res => {
      dispatch(displayMovies({page: res.data.page, list: res.data.results}))
    })
}

export const getMovieDetails = id => dispatch => {
  axios
    .get(`https://api.themoviedb.org/3/movie/${id}`, {
      params: {
        api_key: 'feae11ae0f071861c89ed4b71d642cea',
        language: 'fr-FR',
      },
    })
    .then(res => {
      dispatch(displayMovieDetails(res.data))
    })
}

export const getSimilarMovies = id => dispatch => {
  axios
    .get(`https://api.themoviedb.org/3/movie/${id}/similar`, {
      params: {
        api_key: 'feae11ae0f071861c89ed4b71d642cea',
        language: 'fr-FR',
      },
    })
    .then(res => {
      dispatch(displaySimilarMovies(res.data.results))
    })
}
