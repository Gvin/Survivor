import { GameLocationAction, GameLocationId, GameLocationMemento } from "./mementos/game-location-memento";

export class GameLocation {
    private readonly id: GameLocationId;
    private readonly actions?: GameLocationAction[];

    constructor(memento: GameLocationMemento) {
        this.id = memento.id;
        this.actions = memento.actions;
    }

    public getMemento(): GameLocationMemento {
        return {
            id: this.id,
            actions: this.actions
        }
    }

    public get Id(): GameLocationId {
        return this.id;
    }

    public get Actions(): GameLocationAction[] {
        return this.actions ?? [];
    }
}
