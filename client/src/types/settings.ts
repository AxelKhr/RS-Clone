import { ILocationPlace } from './location';
import { LANG } from './language';
import { UNITS } from './units';
import { THEME } from '@/themes/themes';
import { MapLayer } from '@/views/map/types';

export interface ISettings {
    languageCurrent: LANG;
    units: UNITS;
    theme: THEME;
    locationCurrent: ILocationPlace;
    locationFavorites: ILocationPlace[];
    locationTabs: ILocationPlace[];
    mapLayersEnable: MapLayer[];
}
