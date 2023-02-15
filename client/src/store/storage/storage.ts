import { ISettings } from '@/types/setting';
import mergeWith from 'lodash-es/mergeWith';

const STORAGE_SETTINGS_KEY = 'RS-Weather-Settings';

const SETTINGS_DEF: ISettings = {
    location: {
        current: {
            id: '2643743',
            name: 'London',
            nameFull: 'London, England , United Kingdom',
            position: {
                latitude: 51.5085,
                longitude: -0.12574,
            },
        },
        favorites: [],
    },
};

export function saveSettings(settings: ISettings) {
    localStorage.setItem(STORAGE_SETTINGS_KEY, JSON.stringify(settings));
}

export function loadSettings(): ISettings {
    const settingsStored = localStorage.getItem(STORAGE_SETTINGS_KEY);

    if (settingsStored) {
        const settings = JSON.parse(settingsStored) as ISettings;
        return mergeWith(SETTINGS_DEF, settings, (obj, src) => {
            if (Array.isArray(obj)) {
                return src;
            }
        });
    }

    return SETTINGS_DEF;
}
