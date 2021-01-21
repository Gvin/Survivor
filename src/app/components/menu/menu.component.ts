import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { NewGameGeneratorService } from "src/app/services/new-game-generator/new-game-generator.service";
import { SaveGameService } from "src/app/services/save-game/save-game.service";

@Component({
    selector: 'srv-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class SurvivorMenuComponent {

    constructor(
        private saveGameService: SaveGameService, 
        private newGameService: NewGameGeneratorService,
        private router: Router) {
    }

    public startNewGameClick(): void {
        var newGame = this.newGameService.generateNewGame();
        this.saveGameService.setGameData(newGame);
        this.router.navigate(['/game']);
    }
}
