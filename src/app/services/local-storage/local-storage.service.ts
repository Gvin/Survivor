import { Injectable } from "@angular/core";

const keys = {
    locale: 'locale',
    savegame: 'savegame'
}

@Injectable({providedIn: 'root'})
export class LocalStorageService {
    public getLocale(): string | null {
        return localStorage.getItem(keys.locale);
    }

    public setLocale(value: string): void {
        localStorage.setItem(keys.locale, value);
    }

    public getSaveGame(): string | null {
        return localStorage.getItem(keys.savegame);
    }

    public setSaveGame(value: string): void {
        localStorage.setItem(keys.savegame, value);
    }
}
