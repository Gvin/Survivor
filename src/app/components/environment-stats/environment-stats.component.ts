import { Component, Input } from "@angular/core";
import { GameEnvironment } from "src/app/data/game-environment";
import { LocalizationService } from "src/app/services/game-localization/localization.service";

@Component({
    selector: 'srv-environment-stats',
    templateUrl: './environment-stats.component.html',
    styleUrls: ['./environment-stats.component.scss']
})
export class SurvivorEnvironmentStatsComponent {
    @Input()
    public model?: GameEnvironment;

    constructor(private readonly localizationService: LocalizationService) {
    }

    public getWeatherText(): string {
        if (this.model?.Rain) {
            return "Rain";
        }
        return "Clear";
    }

    public getTimeFormat(): string {
        return this.localizationService.translate('environment.date-time-format') ?? 'medium';
    }
}
