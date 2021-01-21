export interface GameItemData {
    key: string;
    value: string;
}

export interface GameItemMemento {
    types: string[];
    id: string;
    name: string;
    description: string;
    data?: GameItemData[];
}
