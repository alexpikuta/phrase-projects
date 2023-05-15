<template>
  <MainHeader>
    <MainNav :linkList="navigation" />
  </MainHeader>

  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import MainHeader from '@/components/containers/MainHeader.vue'
import MainNav from '@/components/containers/MainNav.vue'
import type { NavigationLink } from '@/types/components/Header'

const navigation: NavigationLink[] = [
  { title: '🗂️ Projects', route: '/' },
  { title: '✏️ Add New' , route: '/about' }
]
</script>
