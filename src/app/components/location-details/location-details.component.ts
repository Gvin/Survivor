import { Component, Input } from "@angular/core";
import { Game } from "src/app/data/game";
import { GameLocation } from "src/app/data/game-location";
import { MovePlayerJournalMessage } from "src/app/data/journal-messages/move-player-journal-message";
import { GameLocationConnection } from "src/app/data/mementos/game-map-memento";
import { SaveGameService } from "src/app/services/save-game/save-game.service";

@Component({
    selector: 'srv-location-details',
    templateUrl: './location-details.component.html',
    styleUrls: ['./location-details.component.scss']
})
export class SurvivorLocationDetailsComponent {
    @Input()
    public model?: GameLocation;

    @Input()
    public game?: Game;

    constructor(private readonly saveGameService: SaveGameService) {
    }

    private getTargetLocationId(connection: GameLocationConnection): string {
        if (!this.model) {
            throw Error('Model not initialized.');
        }

        return connection.locationA === this.model.Id ? connection.locationB : connection.locationA;
    }

    public movePlayer(connection: GameLocationConnection): void {
        if (!this.model) {
            throw Error('Model not initialized.');
        }
        if (!this.game) {
            throw Error('Game object not initialized.')
        }

        const targetLocationId = this.getTargetLocationId(connection);

        const sourceLocation = this.model;
        const targetLocation = this.game.Map.getLocation(targetLocationId);

        this.game.movePlayer(targetLocationId);
        this.game.Journal.write(this.game, new MovePlayerJournalMessage(sourceLocation.Title, targetLocation.Title));
        this.game.processTimePassed(connection.walkTime);

        this.saveGameService.saveGame(this.game);
    }

    public getConnections(): GameLocationConnection[] {
        if (!this.model) {
            throw Error('Model not initialized.');
        }
        if (!this.game) {
            throw Error('Game object not initialized.')
        }

        return this.game.Map.getConnections(this.model.Id);
    }

    public getLocationTitle(connection: GameLocationConnection): string {
        if (!this.game) {
            throw Error('Game object not initialized.')
        }

        const targetLocation = this.getTargetLocationId(connection);
        const location = this.game.Map.getLocation(targetLocation);
        if (!location) {
            throw Error(`Unable to find location ${targetLocation}.`)
        }

        return location.Title;
    }
}
