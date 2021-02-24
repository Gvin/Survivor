import { SurvivorAppRootComponent } from './app-root/app-root.component';
import { SurvivorCraftingDialogComponent } from './crafting-dialog/crafting-dialog.component';
import { SurvivorEnvironmentStatsComponent } from './environment-stats/environment-stats.component';
import { SurvivorGameFooterComponent } from './game-footer/game-footer.component';
import { SurvivorGameComponent } from './game/game.component';
import { SurvivorItemsGridComponent } from './items-grid/items-grid.component';
import { SurvivorJournalComponent } from './journal/journal.component';
import { SurvivorLocalesSelectorComponent } from './locales-selector/locales-selector.component';
import { SurvivorLocationDetailsComponent } from './location-details/location-details.component';
import { SurvivorMenuComponent } from './menu/menu.component';
import { SurvivorPlayerInventoryComponent } from './player-inventory/player-inventory.component';
import { SurvivorPlayerStatsComponent } from './player-stats/player-stats.component';
import { SurvivorStorageInventoryComponent } from './storage-inventory/storage-inventory.component';

export const ComponentsList = [
  SurvivorAppRootComponent,
  SurvivorMenuComponent,
  SurvivorGameComponent,
  SurvivorPlayerStatsComponent,
  SurvivorEnvironmentStatsComponent,
  SurvivorLocationDetailsComponent,
  SurvivorJournalComponent,
  SurvivorPlayerInventoryComponent,
  SurvivorItemsGridComponent,
  SurvivorStorageInventoryComponent,
  SurvivorLocalesSelectorComponent,
  SurvivorGameFooterComponent,
  SurvivorCraftingDialogComponent
];

export const EntryComponentsList = [
  SurvivorPlayerInventoryComponent,
  SurvivorStorageInventoryComponent,
  SurvivorLocalesSelectorComponent,
  SurvivorCraftingDialogComponent
];
