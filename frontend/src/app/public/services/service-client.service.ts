import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, Observable } from 'rxjs'
import { CreateBrand } from 'src/app/shared/brand/createBrand.dto'
import { CreateClient } from 'src/app/shared/client/createClient.dto'
import { CreateInvoice } from 'src/app/shared/invoice/createInvoice'
import { CreateInvoiceBrand } from 'src/app/shared/invoiceBrand/createInvoiceBrand'
import { environment } from 'src/environments/environment'

@Injectable( {
  providedIn: 'root'
} )
export class ServiceClientService {
  private baseUrl: string = environment.apiUrl;

  constructor (
    private http: HttpClient,
  ) {
    this.baseUrl = this.baseUrl + '/brand'
  }

  crearClient ( value: CreateClient ) {
    return this.http.post( `${this.baseUrl}/createClient`, value )
  }

  editClient ( value: CreateClient ): Observable<any> {
    return this.http.post( `${this.baseUrl}/editCliente/`, value )
  }

  createBrand ( value: CreateBrand ) {
    return this.http.post( `${this.baseUrl}/createBrand`, value )
  }

  getBrands (): Observable<any> {
    return this.http.get( `${this.baseUrl}/getBrands/` ).pipe(
      map( ( res: any ) => {
        return res.getBrand
      } )
    )
  }

  getClients (): Observable<any> {
    return this.http.get( `${this.baseUrl}/getClients/` ).pipe(
      map( ( res: any ) => {
        return res.getClient
      } )
    )
  }

  getInvoiceList (): Observable<any> {
    return this.http.get( `${this.baseUrl}/getInvoice/` ).pipe(
      map( ( res: any ) => {
        return res.getInvoices
      } )
    )
  }

  createInvoice ( value: CreateInvoice ) {
    return this.http.post( `${this.baseUrl}/createInvoice`, value )
  }

  getBrand (): Observable<any> {
    return this.http.get( `${this.baseUrl}/getBrands` ).pipe(
      map( ( res: any ) => {
        return res.getBrand
      } )
    )
  }

  editBrand ( value: CreateBrand ): Observable<any> {
    return this.http.post( `${this.baseUrl}/editBrand`, value )
  }

  getBrandsClient ( id: string ): Observable<any> {
    return this.http.get( `${this.baseUrl}/getBrandsClient/${id}` )
  }

  getInvoiceClient ( id: string ): Observable<any> {
    return this.http.get( `${this.baseUrl}/getInvoiceClient/${id}` )
  }

  addBrandsInvoice ( id: string, value: CreateInvoiceBrand ) {
    return this.http.post( `${this.baseUrl}/addBrandsInvoice/${id}`, value )
  }

  deleteInvoiceBrand ( id: number ) {
    return this.http.get( `${this.baseUrl}/deleteInvoiceBrand/${id}` )
  }
  deleteInvoice ( id: number ) {
    return this.http.get( `${this.baseUrl}/deleteInvoice/${id}` )
  }
}
