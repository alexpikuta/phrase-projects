<template>
  <div class="dropdown">
    <button
      class="dropdown__toggle"
      @click="toggleDropdown"
    >
      {{ selectedOptionLabels }}
    </button>
    <ul v-if="isOpen" class="dropdown__menu">
      <li
        v-for="(option, index) in options"
        :key="index"
        class="dropdown__item"
        @click="selectOption(option)"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { DropdownOption } from '@/types/components/Projects'

const props = defineProps<{
  options: DropdownOption[]
  isMultiple: boolean
  preSelectedOptions?: DropdownOption[]
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value: string | string[]): void
}>()

const isOpen = ref(false)
const selectedOptions = ref([] as DropdownOption[])

onMounted(() => {
  if (props.preSelectedOptions) {
    selectedOptions.value = props.preSelectedOptions
  } else if (props.options.length > 0) {
    selectedOptions.value = [props.options[0]]
  }
})

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function selectOption(option: DropdownOption) {
  if (props.isMultiple) {
    // Multiple selection logic
    if (isSelected(option)) {
      selectedOptions.value = selectedOptions.value.filter(
        (selectedOption) => selectedOption.value !== option.value
      )
    } else {
      selectedOptions.value.push(option)
    }
    emits('update:modelValue', selectedOptions.value.map((option) => option.value))
  } else {
    // Common selection logic
    selectedOptions.value = [option]
    isOpen.value = false
    emits('update:modelValue', option.value)
  }
}

function isSelected(option: DropdownOption): boolean {
  return selectedOptions.value.some((selectedOption) => selectedOption.value === option.value)
}

// Generate labels for selected options
const selectedOptionLabels = computed(() => {
  if (props.isMultiple) {
    return selectedOptions.value.map((option) => option.label).join(', ')
  } else {
    return selectedOptions.value.length > 0 ? selectedOptions.value[0].label : ''
  }
})
</script>


<style lang="scss">
.dropdown {
  position: relative;
  display: inline-block;
  &__toggle {
    width: 100%;
    background-color: $c-white-dull;
    border: none;
    padding: 8px 16px;
    cursor: pointer;
  }
  &__menu {
    position: absolute;
    background-color: $c-white;
    border: 1px solid #ccc;
    padding: 8px;
    list-style: none;
    top: 100%;
    left: 0;
    width: 100%;
  }
  &__item {
    padding: 8px;
    cursor: pointer;
    &:hover {
      background-color: $c-white-soft;
    }
  }
}
</style>
