import { Game } from "../game";
import { LocalizableString } from "../localizable-string";
import { GameLocationActionData, GameLocationActionMemento } from "../mementos/game-location-memento";
import { SwimOnLocationPlayerAction } from "../player-actions/swim-on-location-player-action";
import { GameLocationAction } from "./game-location-action";

export class SwimLocationAction implements GameLocationAction {
    constructor(private memento: GameLocationActionMemento) {
    }

    public getTitle(): LocalizableString {
        return new LocalizableString().addLocalizable('location-actions.swim.title', undefined, [`${this.memento.time}`]);
    }

    public getDescription(): LocalizableString {
        return new LocalizableString().addLocalizable('location-actions.swim.tooltip', undefined, [`${this.memento.time}`]);
    }

    public get Time(): number {
        return this.memento.time;
    }

    public getEffects(): GameLocationActionData[] {
        if (!this.memento.data) {
            throw Error(`Location data is empty for action ${this.memento.type}.`);
        }
        return this.memento.data;
    }

    public perform(game: Game): void {
        game.performAction(new SwimOnLocationPlayerAction(this));
    }

    public getMemento(): GameLocationActionMemento {
        return this.memento;
    }
}
