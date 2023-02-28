import { THEME } from '@/themes/themes';
import { LANG } from '@/types/language';
import { SectionsId } from '@/types/sections';
import { ISettings } from '@/types/settings';
import { UNITS } from '@/types/units';
import { MAP_LAYERS } from '@/views/map/types';

const DEF_LOCATION = {
    id: '2643743',
    name: 'London',
    nameFull: 'London, England , United Kingdom',
    position: {
        latitude: 51.5085,
        longitude: -0.12574,
    },
};

const SETTINGS = {
    storageKey: 'RS-Weather-Settings',
    default: <ISettings>{
        languageCurrent: LANG.en,
        units: UNITS.metric,
        theme: THEME.default,
        locationCurrent: DEF_LOCATION,
        locationFavorites: [],
        locationTabs: [],
        mapLayersEnable: MAP_LAYERS,
        sections: [
            {
                id: SectionsId.daily,
                visible: true,
            },
            {
                id: SectionsId.average,
                visible: true,
            },
            {
                id: SectionsId.hourly,
                visible: true,
            },
        ],
    },
};

export default SETTINGS;
