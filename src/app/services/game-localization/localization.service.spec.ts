import { locales } from '../../localization';

interface Indexable {
    [key: string]: any;
}

function compareObjectsWithoutString(object1: Indexable, object2: Indexable): string[] {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    let differences: string[] = [];
    for (let index = 0; index < keys1.length; index++) {
        const key1 = keys1[index];
        const key2Index = keys2.findIndex(key => key == key1);

        if (key2Index < 0) {
            differences.push(key1);
            continue;
        }

        const value1 = object1[key1];
        const value2 = object2[key1];

        if (typeof(value1) === 'string' && typeof(value2) === 'string') { // skipping strings
            continue;
        }

        const valuesDifferences = compareObjectsWithoutString(value1, value2);
        valuesDifferences.forEach(difference => {
            differences.push(`${key1}.${difference}`);
        });
    }

    return differences;
}

describe('Localization', () => {
    it('Localization keys should exist for all languages.', () => {
        const keys = Object.keys(locales);
        const indexable = (locales as Indexable);

        const localeTranslations = keys.map(key => {
            return {
                key: key,
                value: indexable[key]
            }
        });
        
        for (let index1 = 0; index1 < localeTranslations.length; index1++) {
            for (let index2 = index1 + 1; index2 < localeTranslations.length; index2++) {
                const translation1 = localeTranslations[index1];
                const translation2 = localeTranslations[index2];

                const differences = compareObjectsWithoutString(translation1.value, translation2.value);
                expect(differences.length).toBe(0, `Differences between ${translation1.key} and ${translation2.key} locales: [${differences.join(', ')}]`);
            }
        }
    });
});
