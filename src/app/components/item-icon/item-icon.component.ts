import { Component, Input } from "@angular/core";

@Component({
    selector: 'srv-item-icon',
    template: `<div *ngIf="itemId" [class]="'item-icon ' + itemId">{{getCountText()}}</div>`,
    styleUrls: [
        './item-icon.component.scss',
        '../../../styles/item-icons.scss'
    ]
})
export class SurvivorItemIconComponent {
    @Input()
    public itemId?: string;

    @Input()
    public count?: string;

    public getCountText(): string {
        if (this.count == null) {
            return '';
        }

        return this.count;
    }
}
