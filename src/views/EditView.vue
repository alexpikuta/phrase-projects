<template>
  <div class="create">
    <CreateEdit
      :is-editing="true"
      :project-id="id"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import CreateEdit from '@/components/update/CreateEdit.vue'

const route = useRoute()
const id = ref(Number(route.params.id))
</script>
