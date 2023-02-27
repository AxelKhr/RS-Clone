import { LTypeId } from '@/views/map/enum';
import { UNITS } from './units';

export enum LANG {
    en = 'EN',
    ru = 'RU',
}

export interface ILangData {
    page404: string;
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
    settingsAbout: string;
    mapLayers: IMapLayersLang;
    unitsTypes: IUnitsTypesLang;
    startText: string;
    startButton: string;
    aboutTitle: string;
    aboutText: string;
    aboutAuthor: string;
    btnBackText: string;
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

export interface IUnitsTypesLang {
    [UNITS.metric]: string;
    [UNITS.imperial]: string;
}
