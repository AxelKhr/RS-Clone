import { IForecast } from './weather';
import { ILocation } from './location';

export interface IState {
    forecast: IForecast;
    location: ILocation;
}
