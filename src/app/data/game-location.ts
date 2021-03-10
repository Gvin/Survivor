import { LocaleNamespace } from "../services/game-localization/localization.service";
import { ItemCreationFactory } from "./items/item-creation/item-creation-factory";
import { Inventory } from "./inventory";
import { LocalizableString } from "./localizable-string";
import { DrinkLocationAction } from "./location-actions/drink-location-action";
import { GameLocationAction } from "./location-actions/game-location-action";
import { SwimLocationAction } from "./location-actions/swim-location-action";
import { GameLocationId, GameLocationMemento, GameLocationSearchResult, WaterType } from "./mementos/game-location-memento";
import { SearchLocationAction } from "./location-actions/search-location-action";

export class GameLocation {
    private readonly id: GameLocationId;
    private readonly canSwim?: boolean;
    private readonly waterSource?: WaterType;
    private readonly actions: GameLocationAction[];
    private readonly groundInventory: Inventory;
    private readonly searchResults?: GameLocationSearchResult[];

    constructor(memento: GameLocationMemento, itemCreationService: ItemCreationFactory) {
        this.id = memento.id;
        this.canSwim = memento.canSwim;
        this.waterSource = memento.waterSource;
        
        this.groundInventory = new Inventory(itemCreationService, memento.groundInventory);
        this.searchResults = memento.searchResults;

        this.actions = this.generateLocationActions();
    }

    private generateLocationActions(): GameLocationAction[] {
        const result: GameLocationAction[] = [];

        if (this.waterSource) {
            result.push(new DrinkLocationAction(this.waterSource));
        }
        if (this.waterSource && this.canSwim) {
            result.push(new SwimLocationAction(this.waterSource));
        }
        if (this.searchResults) {
            result.push(new SearchLocationAction(this.searchResults));
        }

        return result;
    }

    public hasWaterSource(waterType: WaterType): boolean {
        return this.waterSource === waterType;
    }

    public getMemento(): GameLocationMemento {
        return {
            id: this.id,
            canSwim: this.canSwim,
            waterSource: this.waterSource,
            groundInventory: this.groundInventory.getMemento(),
            searchResults: this.searchResults
        }
    }

    public processTimePassed(minutes: number): void {
        this.searchResults?.forEach(result => {
            result.totalCount = Math.min(result.maxCount, result.totalCount + (result.refillRate ?? 0) * minutes);
        });
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

    public get SearchResults(): GameLocationSearchResult[] {
        return this.searchResults ?? [];
    }
}
