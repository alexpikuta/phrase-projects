export type ProjectStatus = 'NEW' | 'COMPLETED' | 'DELIVERED'
export type Languages = "cs" | "en" | "de" | "fi" | "zh" | "ru" | "hu" | "ja" | "ko" | "la"

export interface Project {
  id: number
  name: string
  sourceLanguage: Languages
  status: ProjectStatus
  targetLanguages: Languages[]
  dateCreated: string
  dateUpdated: string
  dateDue: string
  _links?: {
    self: {
      href: string
    }
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
