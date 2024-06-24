<template>
  <h1>All Session</h1>
  <div>

    <div class="cinema" v-if="seats">
      <div class="screen">Screen</div>
      <div class="seats">
        <div v-for="row in seats" :key="row[0].row" class="row">
          <div class="row-number">{{ row[0].row }}</div>
          <div
            v-for="seat in row[1]"
            :key="seat.seat"
            :class="['seat', { 'seat-free': seat.is_free, 'seat-taken': !seat.is_free }]"
            @click="
              selectSeat({
                movie_id: selectedTimeSaver.id,
                row: row[0].row,
                seat: seat.seat,
                showdate: selectedTimeSaver.showdate,
                daytime: selectedTimeSaver.daytime
              })
            "
          >
            {{ seat.seat }}
          </div>
        </div>
      </div>
    </div>

    <div v-for="(movie, movieId) in movies" :key="movieId">
      <div v-if="movie[0]">
        <h2>{{ movie[0].name }}</h2>
        <div class="about-film">
          <div class="poster">
            <img :src="movie[0].image" :alt="movie[0].name" />
          </div>
          <div class="description">
            <div class="text-xl py-1.5 text-white">
              {{ Genres[parseInt(movie.genre)] }}
            </div>
            <div>{{ movie[0].description }}</div>
          </div>
        </div>

        <div
          v-for="session in sessionsData[Object.keys(sessionsData)[movieId]]"
          :key="session.showdate"
        >
          <h3>{{ session.showdate }}</h3>
          <span
            v-for="timeSession in session.daytime.split(';')"
            :key="session.showdate + timeSession"
          >
            <fwb-button
              color="default"
              class="m-2"
              @click="showPlaces({ id: Object.keys(sessionsData)[movieId], daytime: timeSession, showdate: session.showdate })"
            >
              {{ timeSession }}
            </fwb-button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>

<script setup lang="ts">
import { useMoviesStore } from '@/stores/moviesStore'
import { computed, onMounted, ref } from 'vue'
import { getPlaces, searchMovies } from '@/api/moviesApi'
import { Genres } from '@/types/genres'
import { FwbButton } from 'flowbite-vue'
const moviesStore = useMoviesStore()
const sessionsData = computed(() => moviesStore.sessions)

let movies = ref()
const selectedTimeSaver = ref(null)
const seats = ref(null)

onMounted(async () => {
  await moviesStore.getSessions()

  const moviesProm = Object.keys(sessionsData.value).map((id) => {
    return searchMovies({ movieId: id })
  })

  movies.value = await Promise.all(moviesProm)
  console.log(movies.value)
})

const showPlaces = async (selectedTime: { id: string; daytime: string; showdate: string }) => {
  selectedTimeSaver.value = selectedTime
  seats.value = await getPlaces(selectedTime)
}

const clearPlaces = () => {
  seats.value = null
}

const selectSeat = async (bookInfo: {
  movie_id: number
  row: number
  seat: number
  showdate: string
  daytime: string
}) => {
  await moviesStore.bookMovieTicket(bookInfo)
  clearPlaces()
  await showPlaces(selectedTimeSaver.value)
}
</script>

<style scoped>
.about-film {
  display: flex;
  justify-content: center;
}

.description {
  max-width: 600px;
}

.poster {
  width: 400px;
  max-width: 100%;
  margin-right: 50px;
}

.poster img {
  width: 100%;
}

.cinema {
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.screen {
  width: 100%;
  height: 50px;
  background: #1e1e1e;
  text-align: center;
  line-height: 50px;
  margin-bottom: 20px;
}
.seats {
  display: flex;
  flex-direction: column;
}
.row {
  display: flex;
  margin-bottom: 10px;
}
.row-number {
  width: 30px;
  text-align: center;
  line-height: 30px;
}
.seat {
  width: 30px;
  height: 30px;
  margin: 0 3px;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
  color: #121212;
}
.seat-free {
  background: #0f0;
}
.seat-taken {
  background: #f00;
  cursor: not-allowed;
}
.selected-seat {
  margin-top: 20px;
}
</style>
