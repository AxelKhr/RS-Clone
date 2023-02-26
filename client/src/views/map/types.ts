import { LTypeId } from './enum';

export interface MapLayer {
    id: string;
    name: string;
    enable: boolean;
};

export const MAP_LAYERS: MapLayer[] = [
    {
        id: LTypeId.TEMPERATURE,
        name: 'temp',
        enable: false,
    },
    {
        id: LTypeId.WIND,
        name: 'wind',
        enable: false,
    },
    {
        id: LTypeId.CLOUDS,
        name: 'cloud',
        enable: false,
    },
    {
        id: LTypeId.PRESSURE,
        name: 'press',
        enable: false,
    },
    {
        id: LTypeId.PRECIPITATION,
        name: 'prec',
        enable: false,
    },
];
