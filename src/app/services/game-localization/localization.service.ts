import { Injectable } from "@angular/core";
import { LocalizableString } from "src/app/data/localizable-string";
import { environment } from "src/environments/environment";
import { locales } from 'src/app/localization';
import { LocalStorageService } from "src/app/services/local-storage/local-storage.service";

export enum LocaleNamespace {
    common = 'common',
    items = 'items',
    locations = 'locations',
    journal = 'journal'
}

const LocaleNamespacesMap = [
    {
        key: LocaleNamespace.common,
        value: 'common'
    },
    {
        key: LocaleNamespace.items,
        value: 'items'
    },
    {
        key: LocaleNamespace.locations,
        value: 'locations'
    },
    {
        key: LocaleNamespace.journal,
        value: 'journal'
    }
]


const defaultLocale = 'en-US';

interface Indexable {
    [key: string]: any;
}

export interface GameLocale {
    code: string;
    name: string;
    localName: string;
    icon: string;
}

@Injectable({providedIn: 'root'})
export class LocalizationService {
    private locale: GameLocale;

    constructor(private readonly localStorageService: LocalStorageService) {
        const localeKey = this.localStorageService.getLocale() || defaultLocale;
        const existingLocales = this.getExistingLocales();
        const currentLocale = existingLocales.find(loc => loc.code === localeKey);
        if (!currentLocale) {
            throw Error(`Unable to load locale ${localeKey}.`);
        }
        this.locale = currentLocale;
    }

    public get currentLocale(): GameLocale {
        return this.locale;
    }

    public getExistingLocales(): GameLocale[] {
        const localeNames = Object.keys(locales);
        return localeNames.map(name => {
            const localeDetails = (locales as Indexable)[name].details;
            return {
                code: name,
                name: localeDetails.name,
                localName: localeDetails.localName,
                icon: localeDetails.icon
            };
        });
    }

    public setLocale(newLocale: GameLocale): void {
        this.locale = newLocale;
        this.localStorageService.setLocale(newLocale.code);
    }

    public translateString(localizableString: LocalizableString): string {
        return localizableString.Parts.map(part => {
            if (part.shouldLocalize) {
                const translatedArgs = part.args ? part.args.map(arg => this.translateString(arg)) : [];
                const translation = this.translate(part.data, part.namespace, null, translatedArgs);
                if (translation == null) {
                    return 'TRANSLATION_NOT_FOUND';
                } else {
                    return translation;
                }
            } else {
                return part.data;
            }
        }).join('');
    }

    public translate(key: string, localeNamespace: LocaleNamespace = LocaleNamespace.common, defaultValue: string | null = null, args: string[] = []): string | null {
        const translationRaw = this.getTranslatedText(key, localeNamespace, defaultValue, args);
        return this.applyArguments(translationRaw, args);
    }

    private getTranslatedText(key: string, localeNamespace: LocaleNamespace, defaultValue: string | null , args: string[]): string | null {
        const localeData = this.getLocaleData(localeNamespace);
        const parts = key.split('.');

        let currentElement = localeData;
        for (let index = 0; index < parts.length; index++) {
            const part = parts[index];
            currentElement = (currentElement as Indexable)[part];
            if (currentElement == null) {
                if (!environment.production) {
                    console.warn(`Translation not found for key "${key}" in namespace "${localeNamespace}".`);
                }
                return defaultValue;
            }
        }

        return currentElement;
    }

    private applyArguments(translation: string | null, args: string[]): string | null {
        if (translation == null) {
            return null;
        }

        for (let index = 0; index < args.length; index++) {
            translation = translation.replace(new RegExp(`\\{${index}\\}`, 'g'), args[index]);
        }
        return translation;
    }

    private getLocaleData(namespace: LocaleNamespace): any {
        const localeTranslation = (locales as Indexable)[this.locale.code];
        if (!localeTranslation) {
            throw Error(`Translation not found for locale ${this.locale.code}.`);
        }

        const namespaceKey = LocaleNamespacesMap.find(record => record.key === namespace)?.value;
        if (namespaceKey === undefined) {
            throw Error(`Unknown locale namespace: ${namespace}.`);
        }
        const namespaceTranslation = localeTranslation[namespaceKey];
        if (!namespaceTranslation) {
            throw Error(`Translation not found for locale ${this.locale.code} and namespace ${namespaceKey}.`);
        }

        // default is used to fix JSON format issues.
        return namespaceTranslation['default'];
    }
}
