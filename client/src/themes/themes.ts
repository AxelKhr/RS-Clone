import _default from './default';
import dark from './dark';
import light from './light';
import darkBlue from './dark-blue';

export enum THEME {
    default = 'default',
    light = 'light',
    dark = 'dark',
    darkBlue = 'darkBlue',
}

export const Themes = {
    [THEME.default]: _default,
    [THEME.light]: light,
    [THEME.dark]: dark,
    [THEME.darkBlue]: darkBlue,
};

export function setTheme(value: THEME) {
    const app = document.getElementById('app');
    if (app) {
        const themeList = Object.values(Themes);
        themeList.forEach((item) => {
            if (app.classList.contains(item.class)) {
                app.classList.remove(item.class);
            }
        });
        app.classList.add(Themes[value].class);
    }
}
