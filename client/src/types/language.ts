export enum LANG {
    en = 'EN',
    ru = 'RU',
}

export interface ILangData {
    menuForecast: string;
    menuMap: string;
    menuSettings: string;
}

export interface ILang {
    name: string;
    abbreviation: string;
    data: ILangData;
}
