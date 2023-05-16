import api from './createAxios'
import type { Project, ProjectsResponse } from '@/types/services/Projects'

const getProjects = async (): Promise<Project[]> => {
  const response = await api.get<ProjectsResponse>('/projects')

  return response.data._embedded.projects
}

export {
  getProjects
}
