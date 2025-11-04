import { onMounted, ref, watch } from 'vue';

export const useTheme = () => {
	const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
	const savedTheme = localStorage.getItem('theme');
	const theme = ref(savedTheme || (isDarkMode ? 'dark' : 'light'));

	onMounted(() => {
		setTheme(theme.value);
	});

	const toggleTheme = () => {
		theme.value = theme.value === 'dark' ? 'light' : 'dark';
	};

	const setTheme = (theme: string) => {
		if (theme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	};

	watch(theme, (val) => {
		localStorage.setItem('theme', val);
		setTheme(val);
	});

	return {
		theme,
		toggleTheme,
	};
};
