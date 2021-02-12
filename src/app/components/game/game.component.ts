import { Component, OnInit } from "@angular/core";
import { GameVersionService } from "src/app/services/game-version/game-version.service";
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
export class SurvivorGameComponent implements OnInit{
    public game?: Game;

    constructor(
        private readonly saveGameService: SaveGameService,
        private readonly localizationService: LocalizationService,
        private readonly itemCreationService: ItemCreationService,
        private readonly gameVersionService: GameVersionService) {
    }

    public ngOnInit(): void {
        var gameData = this.saveGameService.getGameData();
        if (gameData == null) {
            throw new Error('Unable to load game data.');
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

    public get GameVersion(): string {
        return this.gameVersionService.getGameVersion();
    }
}
