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
        return this.connections.filter(connection => connection.locationA === locationId || connection.locationB === locationId);
    }

    public getLocation(id: GameLocationId): GameLocation {
        return this.locations.find(loc => loc.Id === id) as GameLocation;
    }
}
