<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useTheme } from '../../shared/composables/useTheme';

const { theme, toggleTheme } = useTheme();
</script>

<template>
  <button @click="toggleTheme" class="theme-toggle">
    <span v-if="theme === 'dark'">
      <Icon icon="solar:moon-bold" />
    </span>
    <span v-else>
      <Icon icon="solar:sun-bold" />
    </span>
  </button>
</template>

<style scoped>
.theme-toggle {
  background: none;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 8px;
  cursor: pointer;
  font-size: 15px;
  transition: background-color 0.2s;
}

.theme-toggle:hover {
  background: var(--secondary);
}

.theme-toggle > span {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
