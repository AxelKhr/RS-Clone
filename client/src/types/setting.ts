import { ILocationPlace } from './location';

export interface ILocationSettings {
    current: ILocationPlace;
    favorites: ILocationPlace[];
}

export interface ISettings {
    location: ILocationSettings;
}
