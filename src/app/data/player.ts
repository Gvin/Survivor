import { ItemCreationFactory } from "./items/item-creation/item-creation-factory";
import { Game } from "./game";
import { Inventory } from "./inventory";
import { PlayerMemento } from "./mementos/player-memento";

export enum PlayerCharacteristic {
    health = 'health',
    hunger = 'hunger',
    thirst = 'thirst',
    energy = 'energy'
}

export class Player {
    private health: number;
    private thirst: number;
    private hunger: number;
    private energy: number;
    private inventory: Inventory;

    constructor(data: PlayerMemento, itemCreationService: ItemCreationFactory) {
        this.health = data.health;
        this.thirst = data.thirst;
        this.hunger = data.hunger;
        this.energy = data.energy;
        this.inventory = new Inventory(data.inventory, itemCreationService);
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
        const thirstGrowthFactor = 1; // per hour
        const hungerGrowthFactor = 0.83; // per hour

        this.thirst += thirstGrowthFactor * minutes / 60;
        this.hunger += hungerGrowthFactor * minutes / 60;
    }

    public getMemento(): PlayerMemento {
        return {
            health: this.health,
            thirst: this.thirst,
            hunger: this.hunger,
            energy: this.energy,
            inventory: this.inventory.getMemento()
        };
    }
}
