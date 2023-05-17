<template>
  <nav class="nav">
    <ul>
      <li
        class="nav__item"
        v-for="link in linkList"
        :key="link.title">
        <RouterLink
          class="nav__link"
          :to="link.route">
          {{ link.title }}
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { NavigationLink } from '@/types/components/Header'

defineProps<{
  linkList: NavigationLink[]
}>()
</script>

<style lang="scss">
.nav {
  &__item {
    display: inline-block;
  }
  &__link {
    display: block;
    padding: 20px 10px;
    background: transparent;
    font-weight: 500;
    &:hover,
    &:focus {
      background-color: $c-divider-lighter-1;
    }
    &.router-link-active {
      background-color: $c-divider-lighter-2;
    }
  }
}
</style>
