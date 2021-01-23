import { Injectable } from "@angular/core";
import * as locales from '../../localization';
import { LocalStorageService } from "../local-storage/local-storage.service";

export enum LocaleNamespace {
    default,
    items
}

const LocaleNamespacesMap = [
    {
        key: LocaleNamespace.default,
        value: ''
    },
    {
        key: LocaleNamespace.items,
        value: 'items_'
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

    public translate(key: string, localeNamespace: LocaleNamespace = LocaleNamespace.default): string | null {
        const localeData = this.getLocaleData(localeNamespace);
        const parts = key.split('.');

        let currentElement = localeData;
        for (let index = 0; index < parts.length; index++) {
            const part = parts[index];
            currentElement = (currentElement as Indexable)[part];
            if (currentElement == null) {
                return null;
            }
        }

        return currentElement;
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
