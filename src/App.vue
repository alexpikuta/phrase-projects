<template>
  <MainHeader>
    <MainNav :linkList="navigation" />
  </MainHeader>

  <MainLayout>
    <RouterView />
  </MainLayout>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import MainLayout from './components/containers/MainLayout.vue'
import MainHeader from '@/components/app/MainHeader.vue'
import MainNav from '@/components/app/MainNav.vue'
import type { NavigationLink } from '@/types/components/Header'

const navigation: NavigationLink[] = [
  { title: '🗂️ Projects', route: '/' },
  { title: '✏️ Add New' , route: '/create' }
]
</script>
