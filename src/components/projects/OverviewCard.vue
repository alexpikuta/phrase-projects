<template>
  <div class="overview-card">
    <h3
      v-if="title"
      class="overview-card__title">
      {{ title }}
    </h3>
    <div class="overview-card__content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<style lang="scss">
.overview-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: $c-background-soft;
  flex: 1 1 0;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  &__title {
    font-size: 17px;
    font-weight: 500;
  }
  &__content {
    font-size: 21px;
    font-weight: 500;
  }
}
</style>
