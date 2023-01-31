import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CreateClientComponent } from './components/create-client/create-client.component'
import { ListClientComponent } from './components/list-client/list-client.component'
import { ListInvoiceComponent } from './components/list-invoice/list-invoice.component'

const routes: Routes = [
  {
    path: '',
    component: ListInvoiceComponent,
  },
  {
    path: 'editClient', component: CreateClientComponent
  },
  {
    path: 'crearClient', component: CreateClientComponent
  },
  {
    path: '**', redirectTo: '', pathMatch: 'full'
  }
]

@NgModule( {
  imports: [RouterModule.forChild( routes )],
  exports: [RouterModule]
} )
export class PublicRoutingModule { }
