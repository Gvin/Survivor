import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

export enum ThemesMode {
    Black = 'black',
    White = 'white',
    Time = 'time'
}

@Injectable({providedIn: 'root'})
export class SettingsManagerService {
    private readonly themesModeSource: BehaviorSubject<ThemesMode>;

    public constructor() {
        const themesMode = this.loadThemesMode();

        this.themesModeSource = new BehaviorSubject<ThemesMode>(themesMode);
    }

    public getThemesMode(): Observable<ThemesMode> {
        return this.themesModeSource.asObservable();
    }

    private loadThemesMode(): ThemesMode {
        return ThemesMode.Time;
    }
}
