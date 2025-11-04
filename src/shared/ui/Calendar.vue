<script setup lang="ts">
import { computed, ref } from 'vue'
import { addMonths, eachDayOfInterval, format, getDate, setDate, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth } from 'date-fns';
import { useI18n } from '../composables/useI18n';
import {ru, enUS} from "date-fns/locale";
import { Icon } from '@iconify/vue';

const locale = computed(() => {
  return {
    ru: ru,
    en: enUS,
  }[currentLang.value];
});

const {currentLang, t} = useI18n()

const {date: defaultDate} = defineProps<{ date?: string }>()

const emit = defineEmits<{
  'update:date': [date: string];
}>()

const date = ref(new Date(defaultDate ?? new Date()))
const slideDirection = ref<'next' | 'prev'>('next')

const dayWeek = computed(() => [
  t('calendar.weekday_short.monday'),
  t('calendar.weekday_short.tuesday'),
  t('calendar.weekday_short.wednesday'),
  t('calendar.weekday_short.thursday'),
  t('calendar.weekday_short.friday'),
  t('calendar.weekday_short.saturday'),
  t('calendar.weekday_short.sunday'),
])

const handlePickDate = (newDate: Date) => {
  date.value = newDate;
  emit('update:date', format(date.value, "yyyy-MM-dd", { locale: locale.value }));
}

const calendarDays = computed(() => {
  const startOfMonthDate = startOfMonth(date.value);
  const endOfMonthDate = endOfMonth(date.value);
  const start = startOfWeek(startOfMonthDate, { weekStartsOn: 1 }); // Monday
  const end = endOfWeek(endOfMonthDate, { weekStartsOn: 1 });
  const allDays = eachDayOfInterval({ start, end });

  const weeks = [];
  for (let i = 0; i < allDays.length; i += 7) {
    weeks.push(allDays.slice(i, i + 7));
  }
  return weeks;
});

const handleChangeMonth = (direction: 'next' | 'prev') => {
  slideDirection.value = direction;
  if (direction === 'next') {
    date.value = addMonths(date.value, 1);
  } else {
    date.value = addMonths(date.value, -1);
  }
}
</script>

<template>
  <div class="calendar">
    <div class="calendar--header">
      <button @click="handleChangeMonth('prev')" class="calendar--nav">
        <Icon icon="mdi:chevron-left" />
      </button>
      <div class="calendar--title">{{ format(date, "MMMM yyyy", { locale }) }}</div>
      <button @click="handleChangeMonth('next')" class="calendar--nav">
        <Icon icon="mdi:chevron-right" />
      </button>
    </div>
    <transition :name="`calendar-slide-${slideDirection}`" mode="out-in">
      <div class="calendar--body" :key="format(date, 'yyyy-MM')">
        <div class="weekday">
          <div v-for="dw in dayWeek">
            {{ dw }}
          </div>
        </div>
        <div class="day-list">
          <div v-for="week of calendarDays" class="day-list--weeks">
            <div @click="() => handlePickDate(d)" :class="['day-list--day', {
              'day-list--day--other': !isSameMonth(d, date),
              'day-list--day--selected': isSameMonth(d, date) && getDate(d) === getDate(date)
            }]" v-for="d of week">
              {{ getDate(d) }}
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
  
<style scoped>
.calendar {
  width: 320px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--card);
  box-shadow: 0 4px 12px var(--ring);
  font-family: system-ui, -apple-system, sans-serif;
  overflow: hidden;
}

.calendar--header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--muted);
  border-bottom: 1px solid var(--border);
}

.calendar--nav {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 8px 12px;
  color: var(--primary);
  transition: all 0.2s ease;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
}

.calendar--nav:hover {
  background: var(--background);
  color: var(--accent-foreground);
}

.calendar--title {
  font-weight: 600;
  font-size: 18px;
  color: var(--foreground);
  letter-spacing: -0.025em;
}

.calendar--body {
  padding: 20px;
}

.weekday {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 12px;
}

.weekday > div {
  width: calc(100% / 7);
  text-align: center;
  font-weight: bold;
  color: var(--muted-foreground);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.day-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.day-list--weeks {
  display: flex;
  flex-direction: row;
  gap: 6px;
}

.day-list--day {
  width: calc(100% / 7);
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: var(--radius);
  transition: all 0.2s ease;
  font-size: 14px;
  font-weight: 500;
  position: relative;
}

.day-list--day:hover {
  background: var(--accent);
  color: var(--accent-foreground);
}

.day-list--day--other {
  color: var(--muted-foreground);
  opacity: 0.6;
}

.day-list--day--selected {
  background: var(--primary);
  color: var(--primary-foreground);
  font-weight: 600;
  box-shadow: 0 2px 8px var(--ring);
}

.day-list--day--selected:hover {
  background: var(--primary);
  opacity: 0.9;
  color: var(--primary-foreground);
}

.calendar-slide-next-enter-active,
.calendar-slide-next-leave-active,
.calendar-slide-prev-enter-active,
.calendar-slide-prev-leave-active {
  transition: all 0.3s ease;
}

.calendar-slide-next-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.calendar-slide-next-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.calendar-slide-prev-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.calendar-slide-prev-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
