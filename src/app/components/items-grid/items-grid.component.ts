import { Component, EventEmitter, Input, Output } from "@angular/core";
import { GameInventoryStack, Inventory } from "src/app/data/inventory";
import { LocalizationService } from "src/app/services/game-localization/localization.service";

@Component({
    selector: 'srv-items-grid',
    templateUrl: './items-grid.component.html',
    styleUrls: ['./items-grid.component.scss']
})
export class SurvivorItemsGridComponent {
    @Input()
    public model?: Inventory;

    @Input()
    public canSelect?: boolean;

    @Output()
    public itemSelected = new EventEmitter<GameInventoryStack>();

    public selectedItem?: GameInventoryStack;

    constructor(private localizationService: LocalizationService) {
        this.selectedItem = undefined;
    }

    public getItems(): GameInventoryStack[] {
        if (!this.model) {
            throw Error('Model not initialized.');
        }
        return this.model.Stacks;
    }

    public getItemName(stack: GameInventoryStack): string {
        return this.localizationService.translateString(stack.TopItem.Name);
    }

    public selectItem(item: GameInventoryStack): void {
        if (!this.canSelect) {
            return;
        }

        if (this.selectedItem === item) {
            this.selectedItem = undefined;
        } else {
            this.selectedItem = item;
        }

        this.itemSelected.emit(this.selectedItem);
    }

    public isItemSelected(item: GameInventoryStack): boolean {
        return this.selectedItem === item;
    }
}
