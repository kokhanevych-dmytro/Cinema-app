<template>
  <div class="card">
    <a :href="`/movie/${movie.id}`">
      <div>
        <img :src="movie.image" alt="movie.image" />
      </div>
      <div class="font-bold text-3xl">
        {{ movie.name }}
      </div>
      <div class="underline py-2">
        {{ Genres[parseInt(movie.genre)] }}
      </div>
      <div class="description" v-html="movie.description"></div>
      <!--    <div v-html="movie.additional"></div>-->
    </a>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { Genres } from '@/types/genres'

interface Props {
  movie: {
    id: string
    name: string
    genre: string
    description: string
    image: string
    additional: string
  }
}

const props = defineProps<Props>()
</script>

<style scoped>
.description {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3; /* Ограничение на 3 строки */
}

.card {
  width: 100%;
  max-width: 400px;
  padding: 30px;
  background-color: var(--vt-c-black-soft);
  box-shadow: rgba(0, 0, 0, 0.5) 3px 12px 12px;
  border-radius: 10px;
  margin: 30px 20px;
}

img {
  width: 100%;
  max-width: 300px;
  display: block;
  margin: 0 auto;
}
</style>
