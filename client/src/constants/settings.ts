import { THEME } from '@/themes/themes';
import { LANG } from '@/types/language';
import { ISettings } from '@/types/settings';
import { UNITS } from '@/types/units';

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
        locationTabs: [DEF_LOCATION],
    },
};

export default SETTINGS;
