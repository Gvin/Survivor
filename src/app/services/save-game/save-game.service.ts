import { Injectable } from "@angular/core";
import { Game } from "src/app/data/game";
import { GameMemento } from "src/app/data/mementos/game-memento";

const saveGameKey = "SaveGame";

@Injectable({providedIn: 'root'})
export class SaveGameService {

    public saveGame(game: Game): void {
        const memento = game.getMemento();
        this.setGameData(memento);
    }

    public getGameData(): GameMemento | null {
        var saveGameString = localStorage.getItem(saveGameKey);
        if (saveGameString == null) {
            return null;
        }

        return JSON.parse(saveGameString) as GameMemento;
    }

    public setGameData(data: GameMemento): void {
        var saveGameString = JSON.stringify(data);
        localStorage.setItem(saveGameKey, saveGameString);
    }
}
