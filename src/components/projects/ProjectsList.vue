<template>
  <section class="projects">
    <div class="projects__filters">
      <input
        class="projects__search"
        type="text"
        v-model="nameFilter"
        placeholder="Filter by Name" />
      <DropdownMenu
        v-model="statusFilter"
        class="projects__dropdown"
        :options="dropdownOptions"
        :isMultiple="false" />
    </div>

    <table class="projects__table">
      <thead>
        <tr>
          <th @click="sort('id')">ID 🔽</th>
          <th @click="sort('name')">Name 🔽</th>
          <th @click="sort('status')">Status 🔽</th>
          <th @click="sort('dateDue')">Due Date 🔽</th>
          <th @click="sort('dateCreated')">Created 🔽</th>
          <th>Source Language</th>
          <th>Target Language</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in filteredProjects" :key="project.id">
          <td>{{ project.id }}</td>
          <td>{{ project.name }}</td>
          <td>{{ capitalize(project.status) }}</td>
          <td>{{ formatDate(project.dateDue) }}</td>
          <td>{{ formatDate(project.dateCreated) }}</td>
          <td>
            <span class="projects__language">
              {{ project.sourceLanguage }}
            </span>
          </td>
          <td>
            <span
              v-for="(language, index) in project.targetLanguages"
              :key="index"
              class="projects__language">
              {{ language }}
            </span>
          </td>
          <td>
            <RouterLink :to="{
              name: 'edit',
              params: { id: project.id }
            }">
              <button class="projects__button">
                ✏️
              </button>
            </RouterLink>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { capitalize } from '@/helpers'
import DropdownMenu from '@/components/DropdownMenu.vue'
import type { Project } from '@/types/services/Projects'

const props = defineProps<{
  projects: Project[]
}>()

enum SortType {
  ASC = 'asc',
  DESC = 'desc'
}

const nameFilter = ref('')
const statusFilter = ref('')
const sortKey = ref<keyof Project>('id')
const sortDirection = ref<SortType>(SortType.ASC)

const formatDate = (date: string) => {
  return new Date(date).toLocaleString(undefined, { timeStyle: 'short', dateStyle: 'medium' })
}

// Get unique statuses from array of projects
const uniqueFilterStatuses = computed(() => {
  const statuses = new Set<string>()

    props.projects.forEach((project) => {
    statuses.add(project.status)
  })

  return Array.from(statuses)
})

const dropdownOptions = [
  { label: '🔀 All Statuses', value: '' },
  ...uniqueFilterStatuses.value.map(status => ({ label: capitalize(status), value: status }))
]

// Set sorting parameter and direction (ascending, descending)
function sort(key: keyof Project) {
  sortKey.value = key
  sortDirection.value = sortDirection.value === SortType.ASC ? SortType.DESC : SortType.ASC
}

const filterProjects = (projects: Project[]) => {
  return projects.filter((project) => {
    const name = nameFilter.value.toLowerCase()
    const status = statusFilter.value.toLowerCase()

    return (
      project.name.toLowerCase().includes(name) &&
      project.status.toLowerCase().includes(status)
    )
  })
}

// Return sorted and filtered array of projects
const filteredProjects = computed(() => {
  const sortedProjects = [...filterProjects(props.projects)].sort((next, prev) => {
    if ((next?.[sortKey.value] ?? '') < (prev?.[sortKey.value] ?? '')) {
      return sortDirection.value === SortType.ASC ? -1 : 1
    }
    if ((next?.[sortKey.value] ?? '') > (prev?.[sortKey.value] ?? '')) {
      return sortDirection.value === SortType.ASC ? 1 : -1
    }
    return 0
  })

  return sortedProjects
})
</script>

<style lang="scss">
.projects {
  &__filters {
    display: flex;
    gap: 5px;
    margin-bottom: 10px;
  }
  &__search {
    width: 100%;
    border: none;
    background-color: $c-white-dull;
    cursor: pointer;
    outline: none;
    padding: 0 10px;
    font-size: 14px;
  }
  &__dropdown {
    width: 200px;
  }
  &__language {
    background-color: $c-white-mute;
    display: inline-block;
    border-radius: 7px;
    margin: 5px;
    padding: 0 5px;
  }
  &__button {
    background-color: $c-white-dull;
    border: none;
    font-size: 15px;
    border-radius: 7px;
    padding: 5px 10px;
    cursor: pointer;
    transition: .3s;
    &:hover {
      opacity: .8;
      transition: .3s;
    }
  }
  &__table {
    width: 100%;
    border-collapse: collapse;
    th,
    td {
      padding: 15px;
      text-align: left;
      border-bottom: 1px solid $c-white-dull;
    }
    th {
      cursor: pointer;
    }
  }
}
</style>
