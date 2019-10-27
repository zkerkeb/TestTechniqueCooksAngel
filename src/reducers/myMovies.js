import {ADD_MOVIE, REMOVE_MOVIE} from '../actions/myMovies'

const initialState = {
  list: [],
}

const removeWithId = (state, id) => {
  let listUpdated = [...state.list]
  const indexOfMovie = listUpdated
    .map(e => {
      return e.id
    })
    .indexOf(id)
  listUpdated.splice(indexOfMovie, 1)
  return {
    ...state,
    list: listUpdated,
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_MOVIE:
      return {
        ...state,
        list: [...state.list, action.payload],
      }
    case REMOVE_MOVIE:
      return removeWithId(state, action.payload)
    default:
      return state
  }
}
