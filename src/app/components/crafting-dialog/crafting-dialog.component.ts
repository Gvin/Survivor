import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Game } from "src/app/data/game";
import { GameItem } from "src/app/data/items/game-item";
import { WaterType } from "src/app/data/mementos/game-location-memento";
import { GameRecipeMemento, GameRecipePart } from "src/app/data/mementos/game-recipe-memento";
import { CraftItemPlayerAction } from "src/app/data/player-actions/craft-items-player-action";
import { LocalizationService } from "src/app/services/game-localization/localization.service";

interface GameRecipesGroup {
    outputItemId: string;
    available: boolean;

    recipes: GameRecipeMemento[];
}

export interface CraftingDialogData {
    game: Game;
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
        @Inject(MAT_DIALOG_DATA) data: CraftingDialogData) {

        this.game = data.game;

        this.recipeGroups = this.updateRecipeGroups();
    }

    public isRecipeAvailable(recipe: GameRecipeMemento): boolean {
        if (recipe.requiresWaterSource != null) {
            if (!this.game.CurrentLocation.hasWaterSource(recipe.requiresWaterSource)) {
                return false;
            }
        }

        if (recipe.parts.length === 0) {
            return true;
        }

        return recipe.parts.every(part => this.game.Player.Inventory.hasItem(part.itemId, part.count));
    }

    public cleanWaterAvailable(): boolean {
        return this.game.CurrentLocation.hasWaterSource(WaterType.clean);
    }

    public saltWaterAvailable(): boolean {
        return this.game.CurrentLocation.hasWaterSource(WaterType.sea);
    }

    public dirtyWaterAvailable(): boolean {
        return this.game.CurrentLocation.hasWaterSource(WaterType.dirty);
    }

    public cleanWaterRequired(recipe: GameRecipeMemento): boolean {
        return recipe.requiresWaterSource === WaterType.clean;
    }

    public saltWaterRequired(recipe: GameRecipeMemento): boolean {
        return recipe.requiresWaterSource === WaterType.sea;
    }

    public dirtyWaterRequired(recipe: GameRecipeMemento): boolean {
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

    public craftRecipe(recipe: GameRecipeMemento): void {
        this.game.performAction(new CraftItemPlayerAction(recipe));
        this.selectedRecipeGroup = undefined;
        this.recipeGroups = this.updateRecipeGroups();
    }

    public close(): void {
        this.dialogRef.close();
    }
}
