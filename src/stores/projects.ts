import { defineStore } from 'pinia'
import { getProjects, createProject, updateProject } from '@/services/projectsApi'
import type { Project } from '@/types/services/Projects'

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: [] as Project[],
    isLoading: false as boolean
  }),

  getters: {
    lastProject: (state) => state.projects[state.projects.length - 1],
    projectByID: (state) => (id: number | undefined) => state.projects.find(project => project.id === id)
  },

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
    },

    async createNewProject(project: Project) {
      try {
        this.isLoading = true
        const createdProject = await createProject(project)
        this.projects.push(createdProject)
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    },

    async updateProject(project: Project) {
      try {
        this.isLoading = true
        const updatedProject = await updateProject(project)
        this.projects.push(updatedProject)
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    }
  }
})
