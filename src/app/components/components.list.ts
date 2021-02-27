import { SurvivorAppRootComponent } from './app-root/app-root.component';
import { SurvivorCraftingDialogComponent } from './crafting-dialog/crafting-dialog.component';
import { SurvivorEnvironmentStatsComponent } from './environment-stats/environment-stats.component';
import { SurvivorGameFooterComponent } from './game-footer/game-footer.component';
import { SurvivorGameComponent } from './game/game.component';
import { SurvivorItemIconComponent } from './item-icon/item-icon.component';
import { SurvivorItemsGridComponent } from './items-grid/items-grid.component';
import { SurvivorJournalComponent } from './journal/journal.component';
import { SurvivorLocalesSelectorDialogComponent } from './locales-selector-dialog/locales-selector-dialog.component';
import { SurvivorLocationDetailsComponent } from './location-details/location-details.component';
import { SurvivorMenuComponent } from './menu/menu.component';
import { SurvivorPlayerInventoryDialogComponent } from './player-inventory-dialog/player-inventory-dialog.component';
import { SurvivorPlayerStatsComponent } from './player-stats/player-stats.component';
import { SurvivorStorageInventoryDialogComponent } from './storage-inventory-dialog/storage-inventory-dialog.component';
import { SurvivorWaitDialogComponent } from './wait-dialog/wait-dialog.component';

export const ComponentsList = [
  SurvivorAppRootComponent,
  SurvivorMenuComponent,
  SurvivorGameComponent,
  SurvivorPlayerStatsComponent,
  SurvivorEnvironmentStatsComponent,
  SurvivorLocationDetailsComponent,
  SurvivorJournalComponent,
  SurvivorPlayerInventoryDialogComponent,
  SurvivorItemsGridComponent,
  SurvivorStorageInventoryDialogComponent,
  SurvivorLocalesSelectorDialogComponent,
  SurvivorGameFooterComponent,
  SurvivorCraftingDialogComponent,
  SurvivorItemIconComponent,
  SurvivorWaitDialogComponent
];

export const EntryComponentsList = [
  SurvivorPlayerInventoryDialogComponent,
  SurvivorStorageInventoryDialogComponent,
  SurvivorLocalesSelectorDialogComponent,
  SurvivorCraftingDialogComponent,
  SurvivorWaitDialogComponent
];
