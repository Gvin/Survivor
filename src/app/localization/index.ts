// Common
import * as en_US from './en-US.json';
import * as ru_RU from './ru-RU.json';

// Items
import * as items_en_US from './items/items.en-US.json';
import * as items_ru_RU from './items/items.ru-RU.json';

// Locations
import * as locations_en_US from './locations/locations.en-US.json';
import * as locations_ru_RU from './locations/locations.ru-RU.json';

export const locales = {
    "en-US": {
        common: en_US,
        items: items_en_US,
        locations: locations_en_US
    },
    "ru-RU": {
        common: ru_RU,
        items: items_ru_RU,
        locations: locations_ru_RU
    }
}
