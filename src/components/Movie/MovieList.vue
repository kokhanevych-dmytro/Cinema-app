<template>
  <div>
    <h1>Movies {{ movies.length }}</h1>

    <div class="movie-list">
      <MovieItem v-for="movie in movies" :key="movie.id" :movie="movie"></MovieItem>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUpdated, ref } from 'vue'
import { useMoviesStore } from '@/stores/moviesStore'
import { useRoute } from 'vue-router'
import MovieItem from '@/components/Movie/MovieItem.vue'

const moviesStore = useMoviesStore()
const movies = computed(() => moviesStore.movies)

const route = useRoute()

const searchParams = ref({
  movieId: route.query.movieId,
  name: route.query.name,
  genre: route.query.genre
})

onMounted(() => {
  moviesStore.getSearchedMovies({
    movieId: searchParams.value.movieId?.toString(),
    name: searchParams.value.name?.toString(),
    genre: searchParams.value.genre?.toString()
  })
  console.log(movies)
})

onUpdated(() => {
  console.log('onUpdated')
  console.log(movies)
})
</script>

<style>
.movie-list {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>
