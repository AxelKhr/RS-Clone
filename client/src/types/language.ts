import { LTypeId } from '@/views/map/enum';

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
    settingsLayers: string;
    mapLayers: IMapLayersLang;
    startText: string;
    startButton: string;
}

export interface ILang {
    name: string;
    abbreviation: string;
    data: ILangData;
}

export interface IMapLayersLang {
    [LTypeId.TEMPERATURE]: string;
    [LTypeId.WIND]: string;
    [LTypeId.CLOUDS]: string;
    [LTypeId.PRESSURE]: string;
    [LTypeId.PRECIPITATION]: string;
}
