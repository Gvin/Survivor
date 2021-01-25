import { Game } from "../game";

export interface PlayerAction {
    perform(game: Game): void;
}
