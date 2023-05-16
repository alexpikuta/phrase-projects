import { defineStore } from 'pinia'
import { getProjects } from '@/services/api'
import type { Project } from '@/types/services/Projects'

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: [] as Project[],
    isLoading: false as boolean
  }),

  actions: {
    async fetchProjects() {
      try {
        this.isLoading = true
        this.projects = await getProjects()
      } catch (e) {
        console.log(e) // Add error handler
      } finally {
        this.isLoading = false
      }
    }
  }
})
