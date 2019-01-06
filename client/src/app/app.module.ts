import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';

import { AppComponent } from './app.component';
import { CreateEmployeeComponent, CreateBonusPlanComponent } from './components/create-employee/create-employee.component';
import { ApiService } from './services/api.service';

@NgModule({
  declarations: [
    AppComponent,
    CreateEmployeeComponent,
    CreateBonusPlanComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatGridListModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
  entryComponents: [
    CreateEmployeeComponent,
    CreateBonusPlanComponent
  ]
})
export class AppModule { }
