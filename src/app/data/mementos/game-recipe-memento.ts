export interface GameRecipePart {
    itemId: string;
    count: number;
    consumed: boolean;
}

export interface GameRecipeUnlockCondition {

}

export interface GameRecipeMemento {
    outputItemId: string;
    outputCount: number;
    parts: GameRecipePart[];
}
