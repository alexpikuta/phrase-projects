import api from './createAxios'
import type { Project, ProjectsResponse } from '@/types/services/Projects'

const getProjects = async (): Promise<Project[]> => {
  const response = await api.get<ProjectsResponse>('/projects')
  return response.data._embedded.projects
}

const createProject = async (project: Project): Promise<Project> => {
  const response = await api.post('/projects', project)
  return response.data
}

const updateProject = async (project: Partial<Project>): Promise<Project> => {
  const response = await api.patch(`/projects/${project.id}`, project)
  return response.data
}

export {
  getProjects,
  createProject,
  updateProject
}
