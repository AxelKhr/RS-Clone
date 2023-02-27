import { IForecast } from './weather';
import { ISettings } from './settings';
import { ILang } from './language';

export interface IState {
    settings: ISettings;
    forecast: IForecast;
    language: ILang;
}
