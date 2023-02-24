import { ILocationPlace } from './location';
import { LANG } from './language';
import { UNITS } from './units';
import { THEME } from '@/themes/themes';

export interface ISettings {
    languageCurrent: LANG;
    units: UNITS;
    theme: THEME;
    locationCurrent: ILocationPlace;
    locationFavorites: ILocationPlace[];
    locationTabs: ILocationPlace[];
}
