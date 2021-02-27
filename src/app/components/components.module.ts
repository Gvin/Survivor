import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ComponentsList, EntryComponentsList} from './components.list';
import {AppRoutingModule} from '../routing.module';

// import {MatInputModule} from '@angular/material/input';
// import {MatFormFieldModule} from '@angular/material/form-field';
// import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSliderModule} from '@angular/material/slider';
// import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
// import {MatTableModule} from '@angular/material/table';
// import {MatSelectModule} from '@angular/material/select';
// import {MatSortModule} from '@angular/material/sort';
// import {MatCheckboxModule} from '@angular/material/checkbox';
// import {MatPaginatorModule} from '@angular/material/paginator';
// import {MatDatepickerModule} from '@angular/material/datepicker';
// import {MatProgressBarModule} from '@angular/material/progress-bar';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LocalizePipe } from '../services/game-localization/localize.pipe';
// import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    MatTooltipModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatSliderModule
  ],
  declarations: [
    ...ComponentsList,
    LocalizePipe
  ],
  entryComponents: [
    ...EntryComponentsList
  ],
  exports: [
    LocalizePipe
  ]
})
export class ComponentsModule {}
