import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PageRefreshService } from "src/app/services/page-refresh/page-refresh.service";
import { Game } from "src/app/data/game";
import { GameLocation } from "src/app/data/game-location";
import { ItemCreationFactory } from "src/app/data/items/item-creation/item-creation-factory";
import { SaveGameService } from "src/app/services/save-game/save-game.service";
import { tropicalItemsMap } from "src/app/data/items/item-creation/tropical-items-map";
import { GameDialogsService } from "src/app/services/game-dialogs/game-dialogs.service";

@Component({
    selector: 'srv-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss']
})
export class SurvivorGameComponent implements OnInit {

    public render: boolean;
    public game?: Game;

    constructor(
        private readonly dialogService: GameDialogsService,
        private readonly saveGameService: SaveGameService,
        private readonly pageRefreshService: PageRefreshService,
        private readonly router: Router) {

            this.render = true;
    }

    public ngOnInit(): void {
        this.pageRefreshService.pageStateChanged.subscribe((status: boolean) => {
            this.render = status;
        });

        var gameData = this.saveGameService.getGameData();
        if (gameData == null) {
            console.warn('Unable to load game data. Redirecting to main menu.');
            this.router.navigate(['/']);
            return;
        }

        const itemCreationFactory = new ItemCreationFactory(tropicalItemsMap);
        this.game = new Game(gameData, itemCreationFactory);
        this.game.actionPerformed.on('action', () => this.gameActionPerformed());

        this.checkSearchResults();
    }

    private checkSearchResults(): void {
        if (this.game && this.game.SearchResults && this.game.SearchResults.length > 0) {
            this.dialogService.showSearchResultsDialog(this.game);
        }
    }

    private gameActionPerformed(): void {
        if (this.game) {
            const memento = this.game.getMemento();
            this.saveGameService.setGameData(memento);
            this.checkSearchResults();
        }
    }

    public getCurrentLocation(): GameLocation | undefined {
        if (!this.game) {
            return undefined;
        }
        return this.game.CurrentLocation;
    }
}
