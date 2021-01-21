import { GameLocationConnection, GameMapMemento } from "./mementos/game-map-memento";
import { GameLocation } from "./game-location";

export class Map {
    private locations: GameLocation[];
    private connections: GameLocationConnection[];

    constructor(data: GameMapMemento) {
        this.locations = data.locations.map(loc => new GameLocation(loc));
        this.connections = data.connections;
    }

    public getMemento(): GameMapMemento {
        return {
            locations: this.locations.map(loc => loc.getMemento()),
            connections: this.connections
        }
    }

    public getConnections(locationId: string): GameLocationConnection[] {
        return this.connections.filter(connection => connection.locationA === locationId || connection.locationB === locationId);
    }

    public getLocation(id: string): GameLocation {
        return this.locations.find(loc => loc.Id === id) as GameLocation;
    }
}
