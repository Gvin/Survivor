import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PageRefreshService } from "src/app/services/page-refresh/page-refresh.service";
import { Game } from "../../data/game";
import { GameLocation } from "../../data/game-location";
import { LocalizationService } from "../../services/game-localization/localization.service";
import { ItemCreationService } from "../../services/item-creation/item-creation.service";
import { SaveGameService } from "../../services/save-game/save-game.service";

@Component({
    selector: 'srv-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss']
})
export class SurvivorGameComponent implements OnInit {

    public render: boolean;
    public game?: Game;

    constructor(
        private readonly saveGameService: SaveGameService,
        private readonly localizationService: LocalizationService,
        private readonly itemCreationService: ItemCreationService,
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

        this.game = new Game(gameData, this.itemCreationService, this.localizationService);
        this.game.actionPerformed.on('action', () => this.gameActionPerformed());
    }

    private gameActionPerformed(): void {
        if (this.game) {
            const memento = this.game.getMemento();
            this.saveGameService.setGameData(memento);
        }
    }

    public getCurrentLocation(): GameLocation | undefined {
        if (!this.game) {
            return undefined;
        }
        return this.game.Map.getLocation(this.game.CurrentLocation);
    }
}
