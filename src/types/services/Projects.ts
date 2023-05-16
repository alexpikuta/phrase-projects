enum ProjectStatus {
  NEW,
  COMPLETED,
  DELIVERED
}

export interface Project {
  id: number
  name: string
  sourceLanguage: string
  status: ProjectStatus
  targetLanguages: string[]
  dateCreated: string
  dateUpdated: string
  dateDue: string
  _links: {
    self: {
      href: string
    };
    project: {
      href: string
    }
  }
}

export interface ProjectsResponse {
  _embedded: {
    projects: Project[]
  }
}
