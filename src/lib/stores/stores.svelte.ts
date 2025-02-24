const colDarkOption1 = '#221d34';
const colDarkOption2 = '#06030b';
export const defaultColours = {
	colLight: '#eaeace',
	colDark: Math.random() > 0.5 ? colDarkOption1 : colDarkOption2
};

export const lightMode = {
	colBg: defaultColours.colLight,
	colTextAndAccent: defaultColours.colDark,
	colTextTitleMain: defaultColours.colDark,
	colTextSubtitleMain: defaultColours.colDark,
	colTextTitleAccent: '#6cb6a5',
	colStrokeWingsDragonfly: defaultColours.colDark,
	colAccent1: '#7fd69e', //'#97d97c'; '#7fd69e',
	colAccent2: '#6cb6a5',
	colAccent2darker: '#6cb6a5',
	colAccent3: '#fa008a',
	colSee: '#eaeace',
	coloursDragonflies: [
		defaultColours.colLight,
		'#97d97c',
		'#6cb6a5',
		defaultColours.colDark,
		'#fa008a'
	]
};

export const darkMode = {
	colBg: defaultColours.colDark,
	colTextAndAccent: defaultColours.colLight,
	colTextTitleMain: defaultColours.colLight,
	colTextSubtitleMain: defaultColours.colLight,
	colTextTitleAccent: '#97d97c',
	colStrokeWingsDragonfly: defaultColours.colLight,
	colAccent1: '#7fd69e',
	colAccent2: '#6cb6a5',
	colAccent2darker: '#6cb6a5',
	colAccent3: '#fa008a',
	colSee: defaultColours.colDark === colDarkOption1 ? '#3a3159' : '#221d34',
	coloursDragonflies: [
		defaultColours.colLight,
		'#97d97c',
		'#6cb6a5',
		defaultColours.colDark,
		'#fa008a'
	]
};

export const stores = $state({
	colours: {
		colLight: defaultColours.colLight,
		colDark: defaultColours.colDark,
		...darkMode
	},
	colourMode: 'dark',
	isDarkMode: true,
	hasMountedFirstTime: true // TODO: figure out how to move stores to different files and import in one stores.ts file
});
