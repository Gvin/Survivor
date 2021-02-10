import { SurvivorAppRootComponent } from './app-root/app-root.component';
import { SurvivorEnvironmentStatsComponent } from './environment-stats/environment-stats.component';
import { SurvivorGameComponent } from './game/game.component';
import { SurvivorItemsGridComponent } from './items-grid/items-grid.component';
import { SurvivorJournalComponent } from './journal/journal.component';
import { SurvivorLocationDetailsComponent } from './location-details/location-details.component';
import { SurvivorMenuComponent } from './menu/menu.component';
import { SurvivorPlayerInventoryComponent } from './player-inventory/player-inventory.component';
import { SurvivorPlayerStatsComponent } from './player-stats/player-stats.component';

export const ComponentsList = [
  SurvivorAppRootComponent,
  SurvivorMenuComponent,
  SurvivorGameComponent,
  SurvivorPlayerStatsComponent,
  SurvivorEnvironmentStatsComponent,
  SurvivorLocationDetailsComponent,
  SurvivorJournalComponent,
  SurvivorPlayerInventoryComponent,
  SurvivorItemsGridComponent
];

export const EntryComponentsList = [
  SurvivorPlayerInventoryComponent
];
