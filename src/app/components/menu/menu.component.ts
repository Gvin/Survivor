import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { GameVersionService } from "src/app/services/game-version/game-version.service";
import { NewGameGeneratorService } from "../../services/new-game-generator/new-game-generator.service";
import { SaveGameService } from "../../services/save-game/save-game.service";

@Component({
    selector: 'srv-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class SurvivorMenuComponent {

    constructor(
        private readonly saveGameService: SaveGameService, 
        private readonly newGameService: NewGameGeneratorService,
        private readonly router: Router,
        private readonly gameVersionService: GameVersionService) {
    }

    public startNewGameClick(): void {
        var newGame = this.newGameService.generateNewGame();
        this.saveGameService.setGameData(newGame);
        this.router.navigate(['/game']);
    }

    public checkIfSavedGameExists(): boolean {
        return this.saveGameService.checkSaveGameExists();
    }

    public get GameVersion(): string {
        return this.gameVersionService.getGameVersion();
    }
}
