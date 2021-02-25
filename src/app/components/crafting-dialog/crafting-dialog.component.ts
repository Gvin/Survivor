import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Game } from "src/app/data/game";
import { GameItem } from "src/app/data/items/game-item";
import { WaterType } from "src/app/data/mementos/game-location-memento";
import { GameRecipeMemento, GameRecipePart } from "src/app/data/mementos/game-recipe-memento";
import { LocalizationService } from "src/app/services/game-localization/localization.service";

interface GameRecipesGroup {
    outputItemId: string;
    available: boolean;

    recipes: GameRecipeMemento[];
}

@Component({
    selector: 'srv-crafting-dialog',
    templateUrl: './crafting-dialog.component.html',
    styleUrls: [
        './crafting-dialog.component.scss',
        '../../../styles/environment-icons.scss'
    ]
})
export class SurvivorCraftingDialogComponent {
    private readonly game: Game;
    public selectedRecipeGroup?: GameRecipesGroup;
    private recipeGroups: GameRecipesGroup[];

    public constructor(
        private readonly localizationService: LocalizationService,
        private readonly dialogRef: MatDialogRef<SurvivorCraftingDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data: any) {

        this.game = data.game;
        if (!this.game) {
            throw Error('Game not provided.');
        }

        this.recipeGroups = this.updateRecipeGroups();
    }

    public isRecipeAvailable(recipe: GameRecipeMemento): boolean {
        if (recipe.requiresWaterSource != null) {
            const currentLocation = this.game.Map.getLocation(this.game.CurrentLocation);
            if (!currentLocation.hasWaterSource(recipe.requiresWaterSource)) {
                return false;
            }
        }

        if (recipe.parts.length === 0) {
            return true;
        }

        return recipe.parts.every(part => this.game.Player.Inventory.hasItem(part.itemId, part.count));
    }

    public freshWaterAvailable(): boolean {
        const currentLocation = this.game.Map.getLocation(this.game.CurrentLocation);
        return currentLocation.hasWaterSource(WaterType.clean);
    }

    public saltWaterAvailable(): boolean {
        const currentLocation = this.game.Map.getLocation(this.game.CurrentLocation);
        return currentLocation.hasWaterSource(WaterType.sea);
    }

    public mudWaterAvailable(): boolean {
        const currentLocation = this.game.Map.getLocation(this.game.CurrentLocation);
        return currentLocation.hasWaterSource(WaterType.dirty);
    }

    public freshWaterRequired(recipe: GameRecipeMemento): boolean {
        return recipe.requiresWaterSource === WaterType.clean;
    }

    public saltWaterRequired(recipe: GameRecipeMemento): boolean {
        return recipe.requiresWaterSource === WaterType.sea;
    }

    public mudWaterRequired(recipe: GameRecipeMemento): boolean {
        return recipe.requiresWaterSource === WaterType.dirty;
    }

    public getExistingCount(itemId: string): number {
        return this.game.Player.Inventory.getItemsCount(itemId);
    }

    public getRecipePartTitle(part: GameRecipePart): string {
        return this.localizationService.translateString(GameItem.getName(part.itemId));
    }

    public selectRecipeGroup(recipe: GameRecipesGroup): void {
        if (this.selectedRecipeGroup === recipe) {
            this.selectedRecipeGroup = undefined;
        } else {
            this.selectedRecipeGroup = recipe;
        }
    }

    public isRecipeGroupSelected(recipe: GameRecipesGroup): boolean {
        return this.selectedRecipeGroup === recipe;
    }

    private updateRecipeGroups(): GameRecipesGroup[] {
        let result: GameRecipesGroup[] = [];

        this.game.Recipes.filter(recipe => recipe.unlocked).forEach(recipe => {
            const recipeAvailable = this.isRecipeAvailable(recipe);
            let existingGroup = result.find(group => group.outputItemId === recipe.outputItemId);
            if (!existingGroup) {
                existingGroup = {
                    outputItemId: recipe.outputItemId,
                    recipes: [],
                    available: recipeAvailable
                };
                result.push(existingGroup);
            }
            existingGroup.recipes.push(recipe);
            existingGroup.available = existingGroup.available || recipeAvailable;
        })

        return result;
    }

    public getRecipeGroups(): GameRecipesGroup[] {
        return this.recipeGroups;
    }

    public getRecipeGroupTitle(recipeGroup: GameRecipesGroup): string {
        return this.localizationService.translateString(GameItem.getName(recipeGroup.outputItemId));
    }

    public getRecipeGroupDescription(recipeGroup: GameRecipesGroup): string {
        return this.localizationService.translateString(GameItem.getDescription(recipeGroup.outputItemId));
    }

    public close(): void {
        this.dialogRef.close();
    }
}
