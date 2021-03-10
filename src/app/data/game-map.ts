import { GameLocationConnection, GameMapMemento } from "./mementos/game-map-memento";
import { GameLocation } from "./game-location";
import { ItemCreationFactory } from "./items/item-creation/item-creation-factory";
import { GameLocationId } from "./mementos/game-location-memento";

export class GameMap {
    private locations: GameLocation[];
    private connections: GameLocationConnection[];

    constructor(data: GameMapMemento, itemCreationService: ItemCreationFactory) {
        this.locations = data.locations.map(loc => new GameLocation(loc, itemCreationService));
        this.connections = data.connections;
    }

    public getMemento(): GameMapMemento {
        return {
            locations: this.locations.map(loc => loc.getMemento()),
            connections: this.connections
        }
    }

    public getConnections(locationId: GameLocationId): GameLocationConnection[] {
        return this.connections
            .filter(connection => 
                connection.locationA === locationId || 
                connection.locationB === locationId)
            .filter(connection => 
                !this.isLocationLocked(connection.locationA) &&
                !this.isLocationLocked(connection.locationB));
    }

    public getLocation(locationId: GameLocationId): GameLocation {
        const result = this.locations.find(loc => loc.Id === locationId);
        if (!result) {
            throw Error(`Location with id ${locationId} not found on map.`);
        }
        return  result;
    }

    public processTimePassed(minutes: number): void {
        this.locations.forEach(location => {
            location.processTimePassed(minutes);
        });
    }

    public isLocationLocked(locationId: GameLocationId): boolean {
        return this.getLocation(locationId).Locked;
    }

    public unlockLocation(locationId: GameLocationId): void {
        this.getLocation(locationId).Locked = false;
    }
}
