<template>
  <div class="dropdown">
    <button
      class="dropdown__toggle"
      @click="toggleDropdown" >
        {{ selectedOption.label }}
      </button>
    <ul
      v-if="isOpen"
      class="dropdown__menu">
      <li
        v-for="(option, index) in options"
        :key="index"
        class="dropdown__item"
        @click="selectOption(option)">
          {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { DropdownOption } from '@/types/components/Projects'

const props = defineProps<{
  options: DropdownOption[]
}>()

const emits = defineEmits<{
    (e: 'update:modelValue', value: string): void
  }>()


const isOpen = ref(false);
const selectedOption = ref(props.options[0])

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function selectOption(option: DropdownOption) {
  selectedOption.value = option;
  isOpen.value = false;
  emits('update:modelValue', option.value);
}
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
