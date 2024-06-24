<script setup lang="ts">
import { ref } from 'vue'
import { useMoviesStore } from '@/stores/moviesStore'
import { useRoute, useRouter } from 'vue-router'
import { FwbButton, FwbInput, FwbSelect } from 'flowbite-vue'

const route = useRoute()
const router = useRouter()
const moviesStore = useMoviesStore()

const searchParams = ref({
  movieId: route.query.movieId?.toString(),
  name: route.query.name?.toString(),
  genres: route.query.genres?.toString()
})

const searchMovies = () => {
  router.push({ query: searchParams.value })
  moviesStore.getSearchedMovies({
    ...searchParams.value
  })
}
</script>

<template>
  <div class="w-1/2 mx-auto flex flex-col">
    <fwb-input v-model="searchParams.movieId" placeholder="Movie ID" label="Movie ID" />

    <fwb-input v-model="searchParams.name" placeholder="Name" label="Name" />

    <fwb-select
      v-model="searchParams.genres"
      :options="[
        { value: '0', name: 'ACTION' },
        { value: '1', name: 'ADVENTURES' },
        { value: '2', name: 'COMEDY' },
        { value: '3', name: 'DRAMA' },
        { value: '4', name: 'HORROR' },
        { value: '5', name: 'WESTERNS' }
      ]"
      label="Genre"
    />

    <div style="margin-top: 15px">
      <fwb-button color="default" @click="searchMovies">Search</fwb-button>
    </div>
  </div>
</template>

<style scoped></style>
