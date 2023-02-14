export interface ILocation {
    isShowModal: boolean;
    currentLocation: ILocationPlace;
}

export interface ILocationPosition {
    latitude: number;
    longitude: number;
}

export interface ILocationPlace {
    id: string;
    name: string;
    nameFull: string;
    position: ILocationPosition;
}
