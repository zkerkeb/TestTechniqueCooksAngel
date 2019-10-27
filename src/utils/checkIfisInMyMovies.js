const checkIfisInMyMovies = (id, MyArrayMovies) => {
  const isInMyMovies = MyArrayMovies.map(e => {
    return e.id
  }).indexOf(id)

  if (isInMyMovies !== -1) return true
  else return false
}

export default checkIfisInMyMovies
