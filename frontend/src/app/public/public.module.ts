import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MaterialModule } from '../material/material.module'

import { PublicRoutingModule } from './public-routing.module'
import { PublicComponent } from './public.component'
import { CreateClientComponent } from './components/create-client/create-client.component'
import { ListClientComponent } from './components/list-client/list-client.component'
import { CreateBrandComponent } from './components/create-brand/create-brand.component'
import { CdkTableExporterModule, MatTableExporterModule } from 'mat-table-exporter'
import { MatButtonModule } from '@angular/material/button'
import { MatTableModule } from '@angular/material/table'
import { MatSortModule } from '@angular/material/sort';
import { CreateInvoicesComponent } from './components/create-invoices/create-invoices.component';
import { ListInvoiceComponent } from './components/list-invoice/list-invoice.component';
import { ListBrandComponent } from './components/list-brand/list-brand.component';
import { BrandDetailComponent } from './components/brand-detail/brand-detail.component';
import { AddBrandInvoiceComponent } from './components/add-brand-invoice/add-brand-invoice.component'



@NgModule( {
  declarations: [
    PublicComponent,
    CreateClientComponent,
    ListClientComponent,
    CreateBrandComponent,
    CreateInvoicesComponent,
    ListInvoiceComponent,
    ListBrandComponent,
    BrandDetailComponent,
    AddBrandInvoiceComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    MaterialModule,
    MatTableExporterModule,
    MatButtonModule,
    MatTableModule,
    CdkTableExporterModule,
    MatSortModule,
  ]
} )
export class PublicModule { }
