import { Component, Input } from "@angular/core";
import { Game } from "src/app/data/game";
import { Player } from "src/app/data/player";
import { GameDialogsService } from "src/app/services/game-dialogs/game-dialogs.service";

@Component({
    selector: 'srv-player-stats',
    templateUrl: './player-stats.component.html',
    styleUrls: ['./player-stats.component.scss']
})
export class SurvivorPlayerStatsComponent {
    @Input()
    public model?: Player;

    @Input()
    public game?: Game;

    constructor(private readonly dialogService: GameDialogsService) {
    }

    public openInventory(): void {
        if (!this.model) {
            throw Error('Model not initialized.');
        }
        if (!this.game) {
            throw Error('Game not initialized.')
        }

        this.dialogService.showPlayerInventoryDialog(this.game, this.model.Inventory);
    }

    public openCrafting(): void {
        if (!this.game) {
            throw Error('Game not initialized.')
        }

        this.dialogService.showCraftingDialog(this.game);
    }
}
