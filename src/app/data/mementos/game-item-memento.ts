export interface GameItemData {
    key: string;
    value: string;
}

export interface GameItemMemento {
    type: string;
    id: string;
    name: string;
    description: string;
    stackable: boolean;
    data?: GameItemData[];
}
