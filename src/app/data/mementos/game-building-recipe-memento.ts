export interface GameBuildingRecipeResource {
    itemId: string;
    count: number;
}

export interface GameBuildingRecipeUnlockCondition {   
    knownItems?: string[];
    buldings?: string[];
}

export interface GameBuildingRecipeMemento {
    id: string;
    baseBuildingId?: string;
    resources: GameBuildingRecipeResource[];
    buildTime: number;
    unlock?: GameBuildingRecipeUnlockCondition;
    unlocked: boolean;
}
