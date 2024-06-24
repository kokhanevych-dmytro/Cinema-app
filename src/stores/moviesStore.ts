import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  fetchMovies,
  fetchMovieDetails,
  fetchSessions,
  bookTicket,
  searchMovies
} from '@/api/moviesApi'

interface Movie {
  id: string
  name: string
  genre: string
  description: string
  image: string
  additional: string
}

interface Session {
  id: string
  showdate: string
  daytime: string
}

const unexpectedErrorText = 'An unexpected error occurred'

export const useMoviesStore = defineStore('movies', () => {
  const movies = ref<Movie[]>([])
  const selectedMovie = ref<Movie | null>(null)
  const sessions = ref<Session[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const getMovies = async () => {
    isLoading.value = true
    try {
      movies.value = await fetchMovies()
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message
        console.error('Error occurred:', error.value)
      } else {
        error.value = unexpectedErrorText
        console.error(unexpectedErrorText)
      }
    } finally {
      isLoading.value = false
    }
  }

  const getMovieDetails = async (id: string) => {
    isLoading.value = true
    try {
      selectedMovie.value = (await fetchMovieDetails(id))[0]
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message
        console.error('Error occurred:', error.value)
      } else {
        error.value = unexpectedErrorText
        console.error(unexpectedErrorText)
      }
    } finally {
      isLoading.value = false
    }
  }

  const getSessions = async (movieId?: string) => {
    isLoading.value = true
    try {
      sessions.value = await fetchSessions(movieId)
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message
        console.error('Error occurred:', error.value)
      } else {
        error.value = unexpectedErrorText
        console.error(unexpectedErrorText)
      }
    } finally {
      isLoading.value = false
    }
  }

  const getSearchedMovies = async (setting: {
    movieId?: string
    name?: string
    genre?: string
  }) => {
    isLoading.value = true
    try {
      movies.value = await searchMovies(setting)
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message
        console.error('Error occurred:', error.value)
      } else {
        error.value = unexpectedErrorText
        console.error(unexpectedErrorText)
      }
    } finally {
      isLoading.value = false
    }
  }

  const bookMovieTicket = async (bookInfo: {
    movie_id: number
    row: number
    seat: number
    showdate: string
    daytime: string
  }) => {
    isLoading.value = true
    try {
      await bookTicket(bookInfo)
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message
        console.error('Error occurred:', error.value)
      } else {
        error.value = unexpectedErrorText
        console.error(unexpectedErrorText)
      }
    } finally {
      isLoading.value = false
    }
  }

  return {
    movies,
    selectedMovie,
    sessions,
    isLoading,
    error,
    getMovies,
    getMovieDetails,
    getSessions,
    bookMovieTicket,
    getSearchedMovies
  }
})
