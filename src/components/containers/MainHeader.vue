<template>
  <header class="header">
    <img
      alt="Phrase logo"
      src="@/assets/logo.svg"
      width="109"
      height="29"/>
      <slot />
  </header>
</template>

<style lang="scss">
.header {
  overflow: hidden;
  background-color: $c-background-mute;
  display: flex;
  align-items: center;
  padding: 0 30px;
  gap: 20px;
}
</style>
