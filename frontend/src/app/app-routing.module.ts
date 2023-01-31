import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { NotFoundComponent } from './not-found/not-found.component'

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'public',
        pathMatch: 'full'
      }, {
        path: 'public',
        loadChildren: () => import( './public/public.module' ).then( m => m.PublicModule )
      },
      {
        path: 'notFound',
        component: NotFoundComponent
      }
    ]
  }, {
    path: '**',
    redirectTo: '/notFound',
  }
]

@NgModule( {
  imports: [RouterModule.forRoot( routes )],
  exports: [RouterModule]
} )
export class AppRoutingModule { }
