import { LTypeId } from '@/views/map/enum';
import { SectionsId } from './sections';
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
    modalSearch: string;
    modalCurrent: string;
    settingsGeneralTitle: string;
    settingsForecastTitle: string;
    settingsMapTitle: string;
    settingsLanguage: string;
    settingsTheme: string;
    settingsUnits: string;
    settingsSections: string;
    settingsMaps: string;
    settingsLayers: string;
    settingsAbout: string;
    mapLayers: IMapLayersLang;
    unitsTypes: IUnitsTypesLang;
    forecastSections: ISectionsLang;
    startText: string;
    startText2: string;
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

export interface ISectionsLang {
    [SectionsId.daily]: string;
    [SectionsId.hourly]: string;
    [SectionsId.average]: string;
}
