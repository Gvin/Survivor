import { ItemCreationFactory } from "./items/item-creation/item-creation-factory";
import { Game } from "./game";
import { Inventory } from "./inventory";
import { PlayerMemento } from "./mementos/player-memento";
import { GameItem } from "./items/game-item";

export enum PlayerCharacteristic {
    health = 'health',
    hunger = 'hunger',
    thirst = 'thirst',
    energy = 'energy'
}

const thirstGrowthFactor = 1; // per hour
const hungerGrowthFactor = 0.83; // per hour

export class Player {
    private health: number;
    private thirst: number;
    private hunger: number;
    private energy: number;
    private inventory: Inventory;

    private knownItems: string[];

    constructor(memento: PlayerMemento, itemCreationFactory: ItemCreationFactory) {
        this.knownItems = memento.knownItems;

        this.health = memento.health;
        this.thirst = memento.thirst;
        this.hunger = memento.hunger;
        this.energy = memento.energy;

        this.inventory = new Inventory(memento.inventory, itemCreationFactory);
        this.inventory.Stacks.forEach(stack => {
            this.addKnownItem(stack.TopItem.Id);
        });
        this.inventory.itemAdded.subscribe((item: GameItem) => {
            this.addKnownItem(item.Id);
        });
    }

    private addKnownItem(itemId: string): void {
        if (this.knownItems.lastIndexOf(itemId) < 0) {
            this.knownItems.push(itemId);
        }
    }

    public isKnownItem(itemId: string): boolean {
        return this.knownItems.lastIndexOf(itemId) >= 0;
    }

    public isKnownItems(itemIds: string[]): boolean {
        return itemIds.every(id => this.isKnownItem(id));
    }

    public getCharacteristics(): PlayerCharacteristic[] {
        return [
            PlayerCharacteristic.health,
            PlayerCharacteristic.hunger,
            PlayerCharacteristic.thirst,
            PlayerCharacteristic.energy
        ];
    }

    public getCharacteristicValue(characteristic: PlayerCharacteristic): number {
        switch (characteristic) {
            case PlayerCharacteristic.health:
                return this.Health;
            case PlayerCharacteristic.hunger:
                return this.Hunger;
            case PlayerCharacteristic.thirst:
                return this.Thirst;
            case PlayerCharacteristic.energy:
                return this.Energy;
            default:
                throw Error(`Unknown player characteristic: ${characteristic}.`);
        }
    }

    public setCharacteristicValue(characteristic: PlayerCharacteristic, value: number): void {
        switch (characteristic) {
            case PlayerCharacteristic.health:
                this.Health = value;
                break;
            case PlayerCharacteristic.hunger:
                this.Hunger = value;
                break;
            case PlayerCharacteristic.thirst:
                this.Thirst = value;
                break;
            case PlayerCharacteristic.energy:
                this.Energy = value;
                break;
            default:
                throw Error(`Unknown player characteristic: ${characteristic}.`);
        }
    }

    public get Health(): number {
        return this.health;
    }

    public set Health(value: number) {
        this.health = Math.min(100, Math.max(0, value));
    }

    public get Thirst(): number {
        return this.thirst;
    }

    public set Thirst(value: number) {
        this.thirst = Math.min(100, Math.max(0, value));
    }

    public get Hunger(): number {
        return this.hunger;
    }

    public set Hunger(value: number) {
        this.hunger = Math.min(100, Math.max(0, value));
    }

    public get Energy(): number {
        return this.energy;
    }

    public set Energy(value: number) {
        this.energy = Math.min(100, Math.max(0, value));
    }

    public get Inventory(): Inventory {
        return this.inventory;
    }

    public processTimePassed(game: Game, minutes: number): void {
        this.thirst += thirstGrowthFactor * minutes / 60;
        this.hunger += hungerGrowthFactor * minutes / 60;
    }

    public getMemento(): PlayerMemento {
        return {
            health: this.health,
            thirst: this.thirst,
            hunger: this.hunger,
            energy: this.energy,
            inventory: this.inventory.getMemento(),
            knownItems: this.knownItems
        };
    }
}
