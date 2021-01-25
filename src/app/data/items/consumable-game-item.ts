import { GameItemMemento } from "../mementos/game-item-memento";
import { Player } from "../player";
import { GameItem } from "./game-item";

export abstract class ConsumableGameItem extends GameItem {
    constructor(memento: GameItemMemento) {
        super(memento);
    }

    public applyEffect(player: Player): void {
        if (!this.data) {
            return;
        }

        this.data.forEach(effect => {
            const value = Number(effect.value);
            switch (effect.key) {
                case 'thirst':
                    player.Thirst += value;
                    break;
                case 'hunger':
                    player.Hunger += value;
                    break;
                case 'health':
                    player.Health += value;
                    break;
                case 'energy':
                    player.Energy += value;
                    break;
                default:
                    throw Error(`Unknown effect type: ${effect.key},`);
            }
        });
    }
}
