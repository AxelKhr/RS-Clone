import { ILocationPlace } from './location';
import { LANG } from './language';

export interface ISettings {
    languageCurrent: LANG;
    locationCurrent: ILocationPlace;
    locationFavorites: ILocationPlace[];
}
