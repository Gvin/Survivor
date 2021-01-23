export interface GameItemData {
    key: string;
    value: string;
}

export interface GameItemMemento {
    type: string;
    id: string;
    stackable: boolean;
    data?: GameItemData[];
}
