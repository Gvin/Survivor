import { Component, Input } from "@angular/core";
import { GameLocation } from "../../data/game-location";
import { LocalizableString } from "../../data/localizable-string";
import { GameLocationAction } from "../../data/location-actions/game-location-action";
import { GameLocationId } from "../../data/mementos/game-location-memento";
import { GameLocationConnection } from "../../data/mementos/game-map-memento";
import { ChangeLocationPlayerAction } from "../../data/player-actions/change-location-player-action";
import { GameDialogsService } from "../../services/game-dialogs/game-dialogs.service";
import { LocalizationService } from "../../services/game-localization/localization.service";
import { Game } from "../../data/game";

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
        private readonly dialogService: GameDialogsService) {
    }

    public getGroundItemsCount(): number {
        if (!this.model) {
            throw Error('Model not initialized.');
        }

        return this.model.GroundInventory.Count;
    }

    public showGroundItems(): void {
        if (!this.model) {
            throw Error('Model not initialized.');
        }
        if (!this.game) {
            throw Error('Game not initialized.')
        }

        this.dialogService.showStorageInventoryDialog(this.game, this.model.GroundInventory, new LocalizableString().addStatic('Ground'));
    }

    public getLocationTitle(): string {
        if (!this.model) {
            throw Error('Model not initialized.');
        }

        return this.localizationService.translateString(this.model.Title);
    }

    public getLocationDescription(): string {
        if (!this.model) {
            throw Error('Model not initialized.');
        }

        return this.localizationService.translateString(this.model.Description);
    }

    public getLocationActions(): GameLocationAction[] {
        if (!this.model) {
            throw Error('Model not initialized.');
        }

        return this.model.Actions;
    }

    public getLocationActionTitle(action: GameLocationAction): string {
        return this.localizationService.translateString(action.getTitle())
    }

    public getLocationActionDescription(action: GameLocationAction): string {
        return this.localizationService.translateString(action.getDescription())
    }

    public performLocationAction(action: GameLocationAction): void {
        if (!this.game) {
            throw Error('Game object not initialized.')
        }

        action.perform(this.game);
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
        const targetLocation = this.game.Map.getLocation(targetLocationId);

        this.game.performAction(new ChangeLocationPlayerAction(this.model, targetLocation, connection.walkTime));
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

    private translateLocationTitle(locationId: GameLocationId): string {
        if (!this.game) {
            throw Error('Game object not initialized.')
        }

        const location = this.game.Map.getLocation(locationId);
        return this.localizationService.translateString(location.Title);
    }
}
