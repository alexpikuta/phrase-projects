import { defineStore } from 'pinia'
import { getProjects } from '@/services/projectsApi'
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
        console.log(e)
      } finally {
        this.isLoading = false
      }
    }
  }
})
