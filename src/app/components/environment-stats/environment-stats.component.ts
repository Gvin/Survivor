import { Component, Input } from "@angular/core";
import { GameEnvironment } from "src/app/data/game-environment";

@Component({
    selector: 'srv-environment-stats',
    templateUrl: './environment-stats.component.html',
    styleUrls: ['./environment-stats.component.scss']
})
export class SurvivorEnvironmentStatsComponent {
    @Input()
    public model?: GameEnvironment;

    public getWeatherText(): string {
        if (this.model?.Rain) {
            return "Rain";
        }
        return "Clear";
    }
}
