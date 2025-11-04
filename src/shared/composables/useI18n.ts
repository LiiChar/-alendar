import { ref, computed, type Ref, onMounted } from 'vue';

import ru from '../../assets/locales/ru.json';
import en from '../../assets/locales/en.json';

export type Ru = typeof ru;
export type En = typeof en;

type Join<K, P> = K extends string | number
	? P extends string | number
		? `${K}${'' extends P ? '' : '.'}${P}`
		: never
	: never;

type Paths<T, D extends number = 5> = [D] extends [never]
	? never
	: T extends unknown[]
	? never
	: T extends Record<string, any>
	? {
			[K in keyof T]-?: K extends string | number
				? `${K}` | Join<K, Paths<T[K], D>>
				: never;
	  }[keyof T]
	: '';

type DeepPaths<T> = Paths<T>;

export type TranslationKey = DeepPaths<typeof ru>;

type Translations = {
	[key: string]: any;
};

type Language = 'ru' | 'en';

const translations: Record<Language, Translations> = {
	ru,
	en,
};

let currentLanguage: Ref<Language> = ref('en');

export function useI18n() {
	const t = (key: TranslationKey): string => {
		const keys = key.split('.');
		let value = translations[currentLanguage.value];

		for (const k of keys) {
			if (value && typeof value === 'object') {
				value = value[k];
			} else {
				return key;
			}
		}

		return typeof value === 'string' ? value : key;
	};

	onMounted(() => {
		currentLanguage.value = new Intl.Locale(navigator.language)
			.language as Language;
	});

	const setLanguage = (lang: Language) => {
		currentLanguage.value = lang;
	};

	const currentLang = computed(() => currentLanguage.value);

	const availableLanguages = [
		{ code: 'ru', name: 'Русский' },
		{ code: 'en', name: 'English' },
	];

	return {
		t,
		setLanguage,
		currentLang,
		availableLanguages,
	};
}
