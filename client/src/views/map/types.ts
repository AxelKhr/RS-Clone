import { LTypeId } from './enum';
import * as Api from '@/api/constants';

export interface MapBase {
    id: string;
    name: string;
    url: string;
    visible: boolean;
}

export const MAPS_BASE: MapBase[] = [
    {
        id: 'mapBase1',
        name: 'OSM Map',
        url: Api.OSM_MAP_BASE_URL,
        visible: false,
    },
    {
        id: 'mapBase2',
        name: 'CartoDB (Dark)',
        url: Api.CARTO_MAP_DARK_URL,
        visible: false,
    },
    {
        id: 'mapBase3',
        name: 'CartoDB (Light)',
        url: Api.CARTO_MAP_LIGHT_URL,
        visible: true,
    },
];

export interface MapLayer {
    id: string;
    name: string;
    enable: boolean;
}

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
