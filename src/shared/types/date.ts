type YearToken = 'yyyy' | 'yyy' | 'yy' | 'y';
type MonthToken = 'mm' | 'm';
type DayToken = 'dd' | 'd';
type Separator = ':' | '.' | '-' | ' ';

export type DateVariant =
	| `${YearToken}${Separator}${MonthToken}${Separator}${DayToken}`
	| `${YearToken}${Separator}${MonthToken}`
	| `${MonthToken}${Separator}${DayToken}`
	| `${DayToken}${Separator}${MonthToken}${Separator}${YearToken}`
	| `${MonthToken}${Separator}${YearToken}${DayToken}`
	| `${DayToken}${Separator}${YearToken}${YearToken}`
	| YearToken
	| MonthToken
	| DayToken
	| Separator;
