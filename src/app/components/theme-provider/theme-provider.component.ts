import { Component, Input, OnInit } from "@angular/core";
import { Game } from "src/app/data/game";
import { EnvironmentLightLevel } from "src/app/data/game-environment";
import { SettingsManagerService, ThemesMode } from "src/app/services/config-provider/settings-manager.service";
import { GameTheme, ThemesManagerService } from "src/app/services/themes-manager/themes-manager.service";
@Component({
    selector: 'srv-theme-provider',
    template: ''
})
export class SurvivorThemeProviderComponent implements OnInit {
    @Input()
    public game?: Game;

    private themesMode?: ThemesMode;

    public constructor(
        private readonly configProvider: SettingsManagerService,
        private readonly themeManagerService: ThemesManagerService) {
            this.themesMode = undefined;
    }

    public ngOnInit(): void {
        this.configProvider.getThemesMode().subscribe(mode => {
            this.themesMode = mode;
            this.updateTheme();
        });

        this.game?.actionPerformed.addListener('action', () => {
            this.updateTheme();
        });
    }

    private updateTheme(): void {
        const theme = this.getTheme();
        if (theme == null) {
            return;
        }
        
        this.themeManagerService.setTheme(theme);
    }

    private getTheme(): GameTheme | undefined {
        if (!this.themesMode) {
            return;
        }

        switch (this.themesMode) {
            case ThemesMode.Time:
                return this.getThemeByTime();
            case ThemesMode.Black:
                return GameTheme.Dark;
            case ThemesMode.White:
                return GameTheme.Light;
            default:
                throw Error(`Unknown themes mode: ${this.themesMode}.`);
        }
    }

    private getThemeByTime(): GameTheme {
        if (!this.game) {
            return GameTheme.Light;
        }

        const lightLevel = this.game.Environment.getLightLevel();
        switch (lightLevel) {
            case EnvironmentLightLevel.Dark:
                return GameTheme.Dark;
            case EnvironmentLightLevel.Light:
                return GameTheme.Light;
            case EnvironmentLightLevel.Gloom:
                return GameTheme.Gray;
            default:
                throw Error(`Unknown environment light level: ${lightLevel}.`);
        }
    }
}
