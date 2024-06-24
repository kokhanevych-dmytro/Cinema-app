import axios from 'axios'

const API_URL = 'https://cinema-api-test.y-media.io/v1' // Better to save it in .env

export const fetchMovies = async () => {
  const response = await axios.get(`${API_URL}/movies`)
  if (response.data.error_code !== 0) {
    throw new Error(response.data.error_message)
  }
  return response.data.data
}

export const fetchMovieDetails = async (id: string) => {
  const response = await axios.get(`${API_URL}/movies?movie_id=${id}`)
  if (response.data.error_code !== 0) {
    throw new Error(response.data.error_message)
  }
  return response.data.data
}

export const fetchSessions = async (movieId?: string) => {
  let response
  console.log(movieId)
  if (movieId) {
    response = await axios.get(`${API_URL}/movieShows?movie_id=${movieId}`)
  } else {
    response = await axios.get(`${API_URL}/movieShows`)
  }

  if (response.data.error_code !== 0) {
    throw new Error(response.data.error_message)
  }
  return response.data.data
}

export const bookTicket = async (bookInfo: {
  movie_id: number
  row: number
  seat: number
  showdate: string
  daytime: string
}) => {
  const response = await axios.post(`${API_URL}/bookPlace`, {
    ...bookInfo
  })
  if (response.data.error_code !== 0) {
    throw new Error(response.data.error_message)
  }
  return response.data.data
}

export const searchMovies = async (setting: {
  movieId?: string
  name?: string
  genres?: string[]
}) => {
  let response
  if (setting) {
    response = await axios.get(`${API_URL}/movies`, {
      params: {
        movie_id: setting.movieId || undefined,
        name: setting.name || undefined,
        genres: setting.genres || undefined
      }
    })
  } else {
    response = await axios.get(`${API_URL}/movies`)
  }
  if (response.data.error_code !== 0) {
    throw new Error(response.data.error_message)
  }

  return response.data.data
}

export const getPlaces = async (place: { id: string; daytime: string; showdate: string }) => {
  try {
    const response = await axios.get(`${API_URL}/showPlaces`, {
      params: {
        movie_id: place.id,
        daytime: place.daytime,
        showdate: place.showdate
      }
    })
    return response.data.data
  } catch (error) {
    console.error('Error searching movies:', error)
  }
}
