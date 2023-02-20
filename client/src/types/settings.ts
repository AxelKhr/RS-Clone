import { ILocationPlace } from './location';
import { LANG } from './language';
import { UNITS } from './units';

export interface ISettings {
    languageCurrent: LANG;
    units: UNITS;
    locationCurrent: ILocationPlace;
    locationFavorites: ILocationPlace[];
}
