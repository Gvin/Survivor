import { GameItem, GameItemExtraAction } from "./game-item";

export class SimpleGameItem extends GameItem {
    public getExtraActions(): GameItemExtraAction[] {
        return [];
    }
}
