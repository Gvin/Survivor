import { Component, Input } from "@angular/core";
import { GameDialogsService } from "src/app/services/game-dialogs/game-dialogs.service";
import { GameVersionService } from "src/app/services/game-version/game-version.service";

@Component({
    selector: 'srv-game-footer',
    templateUrl: './game-footer.component.html',
    styleUrls: ['./game-footer.component.scss']
})
export class SurvivorGameFooterComponent {
    @Input()
    public showToMenuLink?: boolean;

    constructor(
        private readonly gameDialogsService: GameDialogsService,
        private readonly gameVersionService: GameVersionService) {
    }

    public get GameVersion(): string {
        return this.gameVersionService.getGameVersion();
    }

    public openSettings(): void {
        this.gameDialogsService.showSettingsDialog();
    }
}
