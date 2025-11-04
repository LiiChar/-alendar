<script setup lang="ts">
import Calendar from './shared/ui/Calendar.vue';
import ToggleTheme from './components/theme/ToggleTheme.vue';
import ToggleI18n from './components/interalization/ToggleI18n.vue';
</script>

<template>
  <div class="calendar-container">
    <div class="controls">
      <ToggleTheme />
      <ToggleI18n />
    </div>
    <Calendar @update:date="(d) => console.log(d)"/>
  </div>
</template>

<style scoped>
  .calendar-container {
    width: 99lvw;
    height: 97lvh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }

  .controls {
    display: flex;
    gap: 12px;
    align-items: center;
  }
</style>
