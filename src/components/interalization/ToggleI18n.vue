<template>
  <select @change="handleLanguageChange" :value="currentLang" class="language-select">
    <option v-for="lang in availableLanguages" :key="lang.code" :value="lang.code">
      {{ lang.name }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { useI18n } from '../../shared/composables/useI18n';

const { currentLang, setLanguage, availableLanguages } = useI18n();

const handleLanguageChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  setLanguage(target.value as 'ru' | 'en');
};
</script>

<style scoped>
.language-select {
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 8px 12px;
  color: var(--foreground);
  cursor: pointer;
  font-size: 14px;
  transition: border-color 0.2s;
}

.language-select:focus {
  outline: none;
  border-color: var(--ring);
}

.language-select:hover {
  border-color: var(--ring);
}
</style>
