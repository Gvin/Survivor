export type GameLocationId = string;

export interface GameLocationActionData {
    key: string;
    value: string;
}

export interface GameLocationAction {
    type: "drink" | "swim",
    time: number;
    data?: GameLocationActionData[];
}

export interface GameLocationMemento {
    id: GameLocationId;
    actions?: GameLocationAction[];
}
