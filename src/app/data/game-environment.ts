import { GameEnvironmentMemento } from "./mementos/game-environment-memento";

export class GameEnvironment {

    private temperature: number;
    private rain: boolean;
    private time: Date;

    constructor(data: GameEnvironmentMemento) {
        this.temperature = data.temperature;
        this.rain = data.rain;
        this.time = new Date(data.time);
    }

    public get Temperature(): number {
        return this.temperature;
    }

    public get Rain(): boolean {
        return this.rain;
    }

    public get Time(): Date {
        return this.time;
    }

    public addTime(minutes: number): void {
        this.time = new Date(this.time.getTime() + minutes * 60000);
    }

    public getMemento(): GameEnvironmentMemento {
        return {
            temperature: this.temperature,
            rain: this.rain,
            time: this.time.toString()
        }
    }
}