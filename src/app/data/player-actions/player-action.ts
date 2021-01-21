import { TimeInterval } from "rxjs";
import { Game } from "../game";

export interface PlayerAction {
    perform(game: Game): number;
}
