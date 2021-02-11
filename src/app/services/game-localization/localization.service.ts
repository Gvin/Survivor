import { stringify } from "@angular/compiler/src/util";
import { Injectable } from "@angular/core";
import { LocalizableString } from "../../data/localizable-string";
import { environment } from "src/environments/environment";
import * as locales from '../../localization';
import { LocalStorageService } from "../local-storage/local-storage.service";

export enum LocaleNamespace {
    default = 'default',
    items = 'items',
    locations = 'locations'
}

const LocaleNamespacesMap = [
    {
        key: LocaleNamespace.default,
        value: ''
    },
    {
        key: LocaleNamespace.items,
        value: 'items_'
    },
    {
        key: LocaleNamespace.locations,
        value: 'locations_'
    }
]


const defaultLocale = 'en-US';

interface Indexable {
    [key: string]: any;
}

@Injectable({providedIn: 'root'})
export class LocalizationService {
    private locale: string;

    constructor(private readonly localStorageService: LocalStorageService) {
        this.locale = this.localStorageService.getLocale() || defaultLocale;
    }

    public get currentLocale(): string {
        return this.locale;
    }

    public setLocale(newLocale: string): void {
        this.locale = newLocale;
        this.localStorageService.setLocale(newLocale);
    }

    public translateString(localizableString: LocalizableString): string {
        return localizableString.Parts.map(part => {
            if (part.shouldLocalize) {
                const translation = this.translate(part.data, part.namespace, part.args);
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

    public translate(key: string, localeNamespace: LocaleNamespace = LocaleNamespace.default, args: string[] = []): string | null {
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
                return null;
            }
        }

        return this.applyArguments(currentElement, args);
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
        const localeKey = this.locale.replace('-', '_');
        const namespaceKey = LocaleNamespacesMap.find(record => record.key === namespace)?.value;
        if (namespaceKey === undefined) {
            throw Error(`Unknown locale namespace: ${namespace}.`);
        }
        return (locales as Indexable)[`${namespaceKey}${localeKey}`];
    }
}
