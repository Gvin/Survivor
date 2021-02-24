import { WaterType } from "./game-location-memento";

export interface GameRecipePart {
    itemId: string;
    count: number;
    consumed: boolean;
}

export interface GameRecipeUnlockCondition {   
    knownItems?: string[];
    buldings?: string[];
}

export interface GameRecipeMemento {
    outputItemId: string;
    outputCount: number;
    parts: GameRecipePart[];
    unlock?: GameRecipeUnlockCondition;
    unlocked: boolean;
    requiresWaterSource?: WaterType;
}
