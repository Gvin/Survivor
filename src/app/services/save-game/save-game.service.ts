import { Injectable } from "@angular/core";
import { GameMemento } from "../../data/mementos/game-memento";
import { LocalStorageService } from "../local-storage/local-storage.service";

@Injectable({providedIn: 'root'})
export class SaveGameService {

    constructor(private readonly localStorageService: LocalStorageService) {
    }

    public getGameData(): GameMemento | null {
        var saveGameString = this.localStorageService.getSaveGame();
        if (saveGameString == null) {
            return null;
        }

        return JSON.parse(saveGameString) as GameMemento;
    }

    public setGameData(data: GameMemento): void {
        var saveGameString = JSON.stringify(data);
        this.localStorageService.setSaveGame(saveGameString);
    }
}
