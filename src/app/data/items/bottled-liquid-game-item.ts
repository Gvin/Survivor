import { Game } from "../game";
import { GameItemMemento } from "../mementos/game-item-memento";
import { DrinkLiquidPlayerAction } from "../player-actions/drink-liquid-player-action";
import { EmptyBottlePlayerAction } from "../player-actions/empty-bottle-player-action";
import { ConsumableGameItem } from "./consumable-game-item";
import { GameItem, GameItemExtraAction } from "./game-item";

export class BottledLiquidGameItem extends ConsumableGameItem {
    private readonly actions: GameItemExtraAction[];

    constructor(memento: GameItemMemento, private readonly bottleItem: GameItem){
        super(memento);

        this.actions = [
            {
                localizationKey: 'item-actions.drink',
                action: (game: Game) => this.drinkLiquid(game)
            },
            {
                localizationKey: 'item-actions.empty',
                action: (game: Game) => this.emptyBottle(game)
            }
        ];
    }

    public getExtraActions(): GameItemExtraAction[] {
        return this.actions;
    }

    private emptyBottle(game: Game): boolean {
        game.performAction(new EmptyBottlePlayerAction(this, this.bottleItem));
        return false;
    }

    private drinkLiquid(game: Game): boolean {
        game.performAction(new DrinkLiquidPlayerAction(this, this.bottleItem));
        return false;
    }
}
