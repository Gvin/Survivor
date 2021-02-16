import { Injectable } from '@angular/core';
import { version } from 'package.json';

@Injectable({providedIn: 'root'})
export class GameVersionService {
    public getGameVersion(): string {
        return version;
    }
}
