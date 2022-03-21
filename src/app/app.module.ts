import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MoleculeListComponent} from './molecule/molecule-list/molecule-list.component';
import {TableModule} from 'primeng/table';
import {HttpClientModule} from '@angular/common/http';
import {GridComponent} from './grid/grid.component';
import {ActivityListComponent} from './activity-list/activity-list.component';
import {HomeComponent} from './home/home.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    MoleculeListComponent,
    GridComponent,
    ActivityListComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TableModule,
    MatDialogModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
