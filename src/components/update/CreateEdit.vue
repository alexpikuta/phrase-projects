

<template>
  <div v-if="isSuccess">
    Everything is saved!
    You can navigate now to Projects page
  </div>
  <div v-else>
    <h1 class="header">{{ isEditing ? 'Edit Project' : 'Create Project' }}</h1>
    <div class="form-container">
      <div>
        <label for="name">Name:</label>
        <input id="name" type="text" v-model="project.name" required />
        <p v-if="nameError" class="error">{{ nameError }}</p>
      </div>
      <div>
        <label for="dateDue">Due Date:</label>
        <input id="dateDue" type="datetime-local" v-model="project.dateDue" required />
        <p v-if="dateDueError" class="error">{{ dateDueError }}</p>
      </div>

      <div>
        <label for="sourceLanguage">Source Language:</label>
        <DropdownMenu
          v-model="project.sourceLanguage"
          class="projects__dropdown"
          :options="languageOptions"
          :isMultiple="false"
          :preSelectedOptions="createLanguageOptions([project.sourceLanguage])"
        />
        <p v-if="sourceLanguageError" class="error">{{ sourceLanguageError }}</p>
      </div>
      <div>
        <label for="targetLanguages">Target Languages:</label>
        <DropdownMenu
          v-model="project.targetLanguages"
          class="projects__dropdown"
          :options="languageOptions"
          :isMultiple="true"
          :preSelectedOptions="createLanguageOptions(project.targetLanguages)"
        />
        <p v-if="targetLanguagesError" class="error">{{ targetLanguagesError }}</p>
      </div>

      <button @click="submitUpdate" class="submit-button">{{ isEditing ? 'Save' : 'Create' }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useProjectsStore } from '@/stores/projects'
import DropdownMenu from '@/components/DropdownMenu.vue'
import type { Project, Languages } from '@/types/services/Projects'

const props = defineProps<{
  projectId?: number,
  isEditing: boolean
}>()

const projectsStore = useProjectsStore()
projectsStore.fetchProjects()

const languages: Languages[] = ['ko', 'en', 'de', 'fi', 'zh', 'ru', 'hu', 'ja', 'ko', 'la']

const createLanguageOptions = (langArray: Languages[]) => langArray.map((language) => {
  return { label: language, value: language }
})
const languageOptions = createLanguageOptions(languages)

const project = ref<Project>({
  id: 1,
  name: '',
  sourceLanguage: 'en',
  status: 'NEW',
  targetLanguages: ['de'],
  dateCreated: new Date().toISOString(),
  dateUpdated: new Date().toISOString(),
  dateDue: new Date().toISOString().substr(0, 16),
})

watchEffect(() => {
  if (projectsStore.lastProject) {
    project.value.id = projectsStore.lastProject.id + 1
  }

  if(props.isEditing) {
    const fetchedProject = projectsStore.projectByID(props.projectId)
    if (fetchedProject) {
      project.value = fetchedProject
      project.value.dateDue = new Date(fetchedProject.dateDue).toISOString().substr(0, 16)
    }
  }
})

const nameError = ref('')
const sourceLanguageError = ref('')
const targetLanguagesError = ref('')
const dateDueError = ref('')

let isSuccess = ref(false)

function validateForm(): boolean {
  project.value.dateDue = project.value.dateDue? new Date(project.value.dateDue).toISOString() : ''
  let isValid = true

  nameError.value = ''
  sourceLanguageError.value = ''

  if (!project.value.name) {
    nameError.value = 'Name is required'
    isValid = false
  }

  if (!project.value.sourceLanguage) {
    sourceLanguageError.value = 'Source Language is required'
    isValid = false
  }

  if (!project.value.dateDue) {
    dateDueError.value = 'Due Date is required'
    isValid = false
  }

  return isValid
}

async function submitUpdate(): Promise<void> {
  if (validateForm()) {

    try {
      await projectsStore.createNewProject(project.value)
      isSuccess.value = true
    } catch (error) {
      console.error(error)
    }
  }
}
</script>

<style scoped lang="scss">
.header {
  font-size: 21px;
  background-color: transparent;
}
.form-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

label {
  font-weight: bold;
}

input[type="datetime-local"] {
  width: 200px;
}

input[type="text"],
input[type="datetime-local"] {
  background-color: $c-white-dull;
  padding: 5px 10px;
  border: none;
  outline: none;
  margin-left: 10px;
}

.submit-button {
  padding: 0.5rem 1rem;
  background-color: $c-success;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
}

.error {
  color: $c-danger;
  margin-top: 5px;
}
</style>
