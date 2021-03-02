import { GameEnvironmentMemento } from "./mementos/game-environment-memento";

export enum EnvironmentLightLevel {
    Dark,
    Light,
    Gloom
}

const dayStart = 7;
const dayEnd = 19;

const nightStart = 21;
const nightEnd = 4;

export class GameEnvironment {

    private temperature: number;
    private rain: boolean;
    private time: Date;

    public constructor(data: GameEnvironmentMemento) {
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

    public getLightLevel(): EnvironmentLightLevel {
        const hours = this.time.getHours();
        if (hours >= dayStart && hours <= dayEnd) {
            return EnvironmentLightLevel.Light;
        }
        if (hours >= nightStart || hours <= nightEnd) {
            return EnvironmentLightLevel.Dark;
        }
        return EnvironmentLightLevel.Gloom;
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