import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { LocalStorageService } from "../local-storage/local-storage.service";

export enum ThemesMode {
    Black = 'black',
    White = 'white',
    Time = 'time'
}

const defaultThemesMode = ThemesMode.Time;

@Injectable({providedIn: 'root'})
export class SettingsManagerService {
    private readonly themesModeSource: BehaviorSubject<ThemesMode>;

    public constructor(
        private readonly localStorageService: LocalStorageService
    ) {
        const themesMode = this.loadThemesMode();

        this.themesModeSource = new BehaviorSubject<ThemesMode>(themesMode);
    }

    public getThemesMode(): Observable<ThemesMode> {
        return this.themesModeSource.asObservable();
    }

    public setThemesMode(mode: ThemesMode): void {
        this.localStorageService.setThemeMode(`${mode}`);
        this.themesModeSource.next(mode);
    }

    private loadThemesMode(): ThemesMode {
        const savedModeString = this.localStorageService.getThemeMode();
        if (!savedModeString) {
            return defaultThemesMode;
        }

        return savedModeString as ThemesMode;
    }
}
