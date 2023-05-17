<template>
  <section>
    <template v-if="isLoading">
      <SpinnerIcon class="spinner" />
    </template>
    <div v-else>
      <ProjectsOverview :projects="projects" />
      <DataTable :projects="projects" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useProjectsStore } from '@/stores/projects'
import ProjectsOverview from '@/components/projects/ProjectsOverview.vue'
import DataTable from '@/components/projects/ProjectsList.vue'
import SpinnerIcon from '@/components/SpinnerIcon.vue'

const projectsStore = useProjectsStore()

projectsStore.fetchProjects() // Fetch all projects

const { isLoading, projects } = storeToRefs(projectsStore)
</script>

<style lang="scss">
.spinner {
  display: block;
  margin: 0 auto;
  width: 200px;
}
</style>
