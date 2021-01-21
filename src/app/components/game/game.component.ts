import { Component, OnInit } from "@angular/core";
import { Game } from "src/app/data/game";
import { GameLocation } from "src/app/data/game-location";
import { SaveGameService } from "src/app/services/save-game/save-game.service";

@Component({
    selector: 'srv-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss']
})
export class SurvivorGameComponent implements OnInit{
    public game?: Game;

    constructor(private saveGameService: SaveGameService) {
    }

    public ngOnInit(): void {
        var gameData = this.saveGameService.getGameData();
        if (gameData == null) {
            throw new Error('Unable to load game data.');
        }

        this.game = new Game(gameData);
    }

    public getCurrentLocation(): GameLocation | undefined {
        if (!this.game) {
            return undefined;
        }
        return this.game.Map.getLocation(this.game.CurrentLocation);
    }
}
