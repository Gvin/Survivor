import { Component, Input } from "@angular/core";
import { Game } from "src/app/data/game";
import { GameLocation } from "src/app/data/game-location";
import { ChangedLocationJournalMessage } from "src/app/data/journal-messages/changed-location-journal-message";
import { GameLocationId } from "src/app/data/mementos/game-location-memento";
import { GameLocationConnection } from "src/app/data/mementos/game-map-memento";
import { ChangeLocationPlayerAction } from "src/app/data/player-actions/change-location-player-action";
import { LocaleNamespace, LocalizationService } from "src/app/services/game-localization/localization.service";
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

    constructor(
        private readonly localizationService: LocalizationService,
        private readonly saveGameService: SaveGameService) {
    }

    public getLocationTitle(): string {
        if (!this.model) {
            throw Error('Model not initialized.');
        }

        return this.translateLocationTitle(this.model.Id);
    }

    public getLocationDescription(): string {
        if (!this.model) {
            throw Error('Model not initialized.');
        }

        return this.localizationService.translate(`${this.model.Id}.description`, LocaleNamespace.locations) ?? 'TRANSLATION NOT FOUND';
    }

    private getTargetLocationId(connection: GameLocationConnection): GameLocationId {
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

        this.game.performAction(new ChangeLocationPlayerAction(this.model.Id, targetLocationId, connection.walkTime));
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

    public getConnectedLocationTitle(connection: GameLocationConnection): string {
        if (!this.game) {
            throw Error('Game object not initialized.')
        }

        const targetLocation = this.getTargetLocationId(connection);
        const location = this.game.Map.getLocation(targetLocation);
        if (!location) {
            throw Error(`Unable to find location ${targetLocation}.`)
        }

        return this.translateLocationTitle(location.Id);
    }

    private translateLocationTitle(locationId: string): string {
        return this.localizationService.translate(`${locationId}.title`, LocaleNamespace.locations) ?? 'TRANSLATION NOT FOUND';
    }
}
