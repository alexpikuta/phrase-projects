<template>
  <section class="overview">
    <OverviewCard>
      <ul>
        <li
          v-for="(count, status) of projectCounts"
          :key="status"
          :class="[`overview__status overview__status--${status}`]">
          {{ capitalize(String(status)) }}: {{ count }}
        </li>
      </ul>
    </OverviewCard>
    <OverviewCard title="🕒 Projects with due date in the past:">
      {{ countProjectsDueInPast() }}
    </OverviewCard>
    <OverviewCard title="🌍 Most Prominent Source Language:">
      {{ getMostProminentSourceLanguage() }}
    </OverviewCard>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import OverviewCard from './OverviewCard.vue'
import { capitalize } from '@/helpers'
import type { Project } from '@/types/services/Projects'

const props = defineProps<{
  projects: Project[]
}>()

// Calculate number of projects by status
const projectCounts = computed(() => {
  const counts: { [key: string]: number } = {}

  props.projects.forEach(project => {
    if (project.status) {
      if (counts[project.status]) {
        counts[project.status]++
      } else {
        counts[project.status] = 1
      }
    }
  })

  return counts
})

// Calculate number of projects with due date in the past
const countProjectsDueInPast = (): number => {
  const currentDate = new Date()
  let count = 0

  return props.projects.reduce((count, project) => {
    return count + Number(new Date(project.dateDue) < currentDate)},
  count)
}

// Calculate the most prominent source language
function getMostProminentSourceLanguage(): string | undefined {
  const languageCounts: { [key: string]: number } = {}

  props.projects.forEach(project => {
    if (project.sourceLanguage) {
      if (languageCounts[project.sourceLanguage]) {
        languageCounts[project.sourceLanguage]++
      } else {
        languageCounts[project.sourceLanguage] = 1
      }
    }
  })

  let maxCount = 0
  let mostProminentLanguage: string | undefined

  for (const language in languageCounts) {
    if (languageCounts[language] > maxCount) {
      maxCount = languageCounts[language]
      mostProminentLanguage = language
    }
  }

  return mostProminentLanguage
}
</script>

<style lang="scss">
.overview {
  display: flex;
  gap: 50px;
  margin-bottom: 30px;

  &__status {
    color: $c-text-dark-1;
    font-size: 17px;
    display: inline-block;
    border-radius: 15px;
    padding: 2px 10px;
    margin: 5px;
    &--NEW {
      background-color: $c-info;;
    }
    &--DELIVERED {
      background-color: $c-success;
    }
    &--COMPLETED {
      background-color: $c-fulfill;
    }
  }
}
</style>
