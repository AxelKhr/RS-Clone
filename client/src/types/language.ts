export enum LANG {
    en = 'EN',
    ru = 'RU',
}

export interface ILangData {
    menuForecast: string;
    menuMap: string;
    menuSettings: string;
    settingsGeneralTitle: string;
    settingsForecastTitle: string;
    settingsMapTitle: string;
    settingsLanguage: string;
    settingsTheme: string;
    settingsUnits: string;
    startText: string;
    startButton: string;
}

export interface ILang {
    name: string;
    abbreviation: string;
    data: ILangData;
}
