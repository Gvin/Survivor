// Common
import * as en_US from './en-US.json';
import * as ru_RU from './ru-RU.json';

// Items
import * as items_en_US from './items/items.en-US.json';
import * as items_ru_RU from './items/items.ru-RU.json';

// Locations
import * as locations_en_US from './locations/locations.en-US.json';
import * as locations_ru_RU from './locations/locations.ru-RU.json';

// icon names are taken from flag-icons.scss
export const locales = {
    "en-US": {
        details: {
            name: "English (US)",
            localName: "English (US)",
            icon: "flag-icon-us"
        },
        common: en_US,
        items: items_en_US,
        locations: locations_en_US
    },
    "ru-RU": {
        details: {
            name: "Russian",
            localName: "Русский",
            icon: "flag-icon-ru"
        },
        common: ru_RU,
        items: items_ru_RU,
        locations: locations_ru_RU
    }
}
