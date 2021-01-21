import { Game } from "./game";
import { Inventory } from "./inventory";
import { PlayerMemento } from "./mementos/player-memento";

export class Player {
    private health: number;
    private thirst: number;
    private hunger: number;
    private energy: number;
    private inventory: Inventory;

    constructor(data: PlayerMemento) {
        this.health = data.health;
        this.thirst = data.thirst;
        this.hunger = data.hunger;
        this.energy = data.energy;
        this.inventory = new Inventory(data.inventory);
    }

    public get Health(): number {
        return this.health;
    }

    public get Thirst(): number {
        return this.thirst;
    }

    public get Hunger(): number {
        return this.hunger;
    }

    public get Energy(): number {
        return this.energy;
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
