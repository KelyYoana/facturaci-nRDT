import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { MaterialModule } from './material/material.module'
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NotFoundComponent } from './not-found/not-found.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CdkTableExporterModule, MatTableExporterModule } from 'mat-table-exporter'
import { MatButtonModule } from '@angular/material/button'
import { MatTableModule } from '@angular/material/table'
import { MatSortModule } from '@angular/material/sort'

@NgModule( {
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatTableExporterModule,
    MatButtonModule,
    MatTableModule,
    CdkTableExporterModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
} )
export class AppModule { }
