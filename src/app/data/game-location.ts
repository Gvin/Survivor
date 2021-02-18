import { LocaleNamespace } from "../services/game-localization/localization.service";
import { ItemCreationFactory } from "./items/item-creation/item-creation-factory";
import { Inventory } from "./inventory";
import { LocalizableString } from "./localizable-string";
import { DrinkLocationAction } from "./location-actions/drink-location-action";
import { GameLocationAction } from "./location-actions/game-location-action";
import { SwimLocationAction } from "./location-actions/swim-location-action";
import { GameLocationId, GameLocationMemento, WaterType } from "./mementos/game-location-memento";

export class GameLocation {
    private readonly id: GameLocationId;
    private readonly canSwim?: boolean;
    private readonly waterSource?: WaterType;
    private readonly actions: GameLocationAction[];
    private readonly groundInventory: Inventory;

    constructor(memento: GameLocationMemento, itemCreationService: ItemCreationFactory) {
        this.id = memento.id;
        this.canSwim = memento.canSwim;
        this.waterSource = memento.waterSource;
        this.actions = this.generateLocationActions();
        this.groundInventory = new Inventory(memento.groundInventory, itemCreationService);
    }

    private generateLocationActions(): GameLocationAction[] {
        const result: GameLocationAction[] = [];

        if (this.waterSource) {
            result.push(new DrinkLocationAction(this.waterSource));
        }
        if (this.waterSource && this.canSwim) {
            result.push(new SwimLocationAction(this.waterSource));
        }

        return result;
    }

    public getMemento(): GameLocationMemento {
        return {
            id: this.id,
            canSwim: this.canSwim,
            waterSource: this.waterSource,
            groundInventory: this.groundInventory.getMemento()
        }
    }

    public get Id(): GameLocationId {
        return this.id;
    }

    public get Actions(): GameLocationAction[] {
        return this.actions;
    }

    public get Title(): LocalizableString {
        return new LocalizableString().addLocalizable(`${this.id}.title`, LocaleNamespace.locations);
    }

    public get Description(): LocalizableString {
        return new LocalizableString().addLocalizable(`${this.id}.description`, LocaleNamespace.locations);
    }

    public get FromName(): LocalizableString {
        return new LocalizableString().addLocalizable(`${this.id}.from`, LocaleNamespace.locations);
    }

    public get ToName(): LocalizableString {
        return new LocalizableString().addLocalizable(`${this.id}.to`, LocaleNamespace.locations);
    }

    public get GroundInventory(): Inventory {
        return this.groundInventory;
    }
}
