<script setup lang="ts">
import { useMoviesStore } from '@/stores/moviesStore'
import { computed } from 'vue'
import LoaderComponent from '@/components/LoaderComponent.vue'
import FooterComponent from '@/components/UI/FooterComponent.vue'
import HeaderComponent from '@/components/UI/HeaderComponent.vue'
import { FwbAlert } from 'flowbite-vue'

const moviesStore = useMoviesStore()
const error = computed(() => moviesStore.error)
const isLoading = computed(() => moviesStore.isLoading)
</script>

<template>
  <div class="dark">
    <HeaderComponent />
    <fwb-alert type="danger" v-if="error">
      {{ error }}
    </fwb-alert>
    <div class="container flex flex-wrap justify-between items-center mx-auto min-h-screen">
      <div v-show="isLoading">
        <loader-component v-if="isLoading" />
      </div>

      <div v-show="!isLoading" class="mx-auto">
        <RouterView />
      </div>
    </div>

    <footer-component />
  </div>
</template>
