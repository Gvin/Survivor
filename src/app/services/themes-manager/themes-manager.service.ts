import { Injectable } from "@angular/core";

export enum GameTheme {
    Dark,
    Light,
    Gray
}

const themesMap = [
    {key: GameTheme.Dark, value: 'theme-dark'},
    {key: GameTheme.Light, value: 'theme-light'},
    {key: GameTheme.Gray, value: 'theme-gray'}
];

@Injectable({providedIn: 'root'})
export class ThemesManagerService {
    private readonly host: HTMLElement;

    public constructor() {
        this.host = document.body;
    }

    public setTheme(theme: GameTheme): void {
        const themeClass = themesMap.find(themeData => themeData.key === theme)?.value;
        if (!themeClass) {
            throw Error(`Theme class not found for theme ${theme}.`);
        }

        let bodyClasses = this.host.className.split(' ');
        bodyClasses = bodyClasses.filter(className => !themesMap.some(theme => theme.value === className));

        bodyClasses.push(themeClass);
        const bodyClass = bodyClasses.join(' ');

        this.host.className = bodyClass;
    }
}
