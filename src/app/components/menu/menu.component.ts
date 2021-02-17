import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PageRefreshService } from "src/app/services/page-refresh/page-refresh.service";
import { NewGameGenerator } from "src/app/data/new-game-generator/new-game-generator";
import { SaveGameService } from "src/app/services/save-game/save-game.service";
import { ItemCreationFactory } from "src/app/data/items/item-creation/item-creation-factory";
import { tropicalItemsMap } from "src/app/data/items/item-creation/tropical-items-map";

@Component({
    selector: 'srv-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class SurvivorMenuComponent implements OnInit {

    public render: boolean;

    constructor(
        private readonly saveGameService: SaveGameService, 
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
        const itemCreationFactory = new ItemCreationFactory(tropicalItemsMap);
        const newGameGenerator = new NewGameGenerator(itemCreationFactory);
        var newGame = newGameGenerator.generateNewGame();
        this.saveGameService.setGameData(newGame);
        this.router.navigate(['/game']);
    }

    public checkIfSavedGameExists(): boolean {
        return this.saveGameService.checkSaveGameExists();
    }
}
