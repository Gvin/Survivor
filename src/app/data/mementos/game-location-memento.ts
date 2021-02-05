export type GameLocationId = string;

export enum WaterType {
    clean = 'clean',
    dirty = 'dirty',
    sea = 'sea'
}

export interface GameLocationMemento {
    id: GameLocationId;
    waterSource?: WaterType;
    canSwim?: boolean;
}
