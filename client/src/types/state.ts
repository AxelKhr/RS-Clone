import { IForecast } from './weather';
import { ISettings } from './settings';

export interface IState {
    settings: ISettings;
    forecast: IForecast;
}
