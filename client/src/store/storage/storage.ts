import { ISettings } from '@/types/settings';
import mergeWith from 'lodash-es/mergeWith';
import SETTINGS from '@/constants/settings';

export function saveSettings(settings: ISettings) {
    localStorage.setItem(SETTINGS.storageKey, JSON.stringify(settings));
}

export function loadSettings(): ISettings {
    const settingsStored = localStorage.getItem(SETTINGS.storageKey);

    if (settingsStored) {
        const settings = JSON.parse(settingsStored) as ISettings;
        return mergeWith(SETTINGS.default, settings, (obj, src) => {
            if (Array.isArray(obj)) {
                return src;
            }
        });
    }
    return SETTINGS.default;
}
