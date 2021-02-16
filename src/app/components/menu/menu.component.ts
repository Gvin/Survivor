import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PageRefreshService } from "src/app/services/page-refresh/page-refresh.service";
import { NewGameGeneratorService } from "src/app/services/new-game-generator/new-game-generator.service";
import { SaveGameService } from "src/app/services/save-game/save-game.service";

@Component({
    selector: 'srv-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class SurvivorMenuComponent implements OnInit {

    public render: boolean;

    constructor(
        private readonly saveGameService: SaveGameService, 
        private readonly newGameService: NewGameGeneratorService,
        private readonly router: Router,
        private readonly pageRefreshService: PageRefreshService) {

            this.render = true;
    }

    public ngOnInit(): void {
        this.pageRefreshService.pageStateChanged.subscribe((status: boolean) => {
            this.render = status;
        });
    }

    public startNewGameClick(): void {
        var newGame = this.newGameService.generateNewGame();
        this.saveGameService.setGameData(newGame);
        this.router.navigate(['/game']);
    }

    public checkIfSavedGameExists(): boolean {
        return this.saveGameService.checkSaveGameExists();
    }
}
