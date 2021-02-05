import { Game } from "../game";
import { Player } from "../player";
import { PlayerAction } from "./player-action";

export abstract class StatsEffectPlayerAction implements PlayerAction {
    public abstract perform(game: Game): void;

    protected applyStatEffect(player: Player, stat: string, effect: number): void {
        switch (stat) {
            case 'thirst':
                player.Thirst += effect;
                break;
            case 'hunger':
                player.Hunger += effect;
                break;
            case 'health':
                player.Health += effect;
                break;
            case 'energy':
                player.Energy += effect;
                break;
            default:
                throw Error(`Unknown player stat: ${stat}.`);
        }
    }
}
