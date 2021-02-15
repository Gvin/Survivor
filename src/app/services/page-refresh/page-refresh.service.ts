import { EventEmitter, Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class PageRefreshService {
    public readonly pageStateChanged: EventEmitter<boolean>;

    constructor() {
        this.pageStateChanged = new EventEmitter<boolean>();
    }

    public refreshPage(): void {
        this.pageStateChanged.next(false);
        setTimeout(() => {
            this.pageStateChanged.next(true);
        }, 100);
    }
}
