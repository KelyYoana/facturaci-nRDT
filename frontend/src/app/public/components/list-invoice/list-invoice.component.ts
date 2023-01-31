import { Component, OnInit, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { ServiceClientService } from '../../services/service-client.service'
import { BrandDetailComponent } from '../brand-detail/brand-detail.component'
import { CreateInvoicesComponent } from '../create-invoices/create-invoices.component'
import { ListBrandComponent } from '../list-brand/list-brand.component'
import { ListClientComponent } from '../list-client/list-client.component'

@Component( {
  selector: 'app-list-invoice',
  templateUrl: './list-invoice.component.html',
  styleUrls: ['./list-invoice.component.css']
} )
export class ListInvoiceComponent implements OnInit {
  public actualPage: number = 1
  public pageSize: number = 5
  public pageSizeOptions: number[] = [5, 10, 15, 20, 25]
  public length: number = 0
  public getInvoices!: any[]
  public dataSource: MatTableDataSource<any> = new MatTableDataSource()
  public brandList!: any[]
  displayedColumns: string[] = ['codigo', 'name', 'acciones'];

  @ViewChild( MatPaginator, { static: true } ) paginator!: any
  @ViewChild( MatSort ) sort!: MatSort
  constructor (
    public dialog: MatDialog,
    private _listClitService: ServiceClientService
  ) { }
  ngOnInit (): void {
    this.getInvoiceList()
  }

  async getInvoiceBrandClientList () {
    try {
      const getInvoiceList = await this._listClitService.getInvoiceList().subscribe( ( getInvoices: any ) => {
        if ( !getInvoiceList ) {
          alert( 'Error al listar productos' )
        }
        console.log( getInvoices, 'DATA' )
        this.brandList = getInvoices
        this.dataSource = new MatTableDataSource( this.brandList )
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      } )
    } catch ( error ) {
      alert( 'Error al listar productos' )
    }
  }

  async getInvoiceList () {
    try {
      const getInvoiceList = await this._listClitService.getInvoiceList().subscribe( ( getInvoices: any ) => {
        if ( !getInvoiceList ) {
          alert( 'Error al listar productos' )
        }
        this.brandList = getInvoices
        this.dataSource = new MatTableDataSource( this.brandList )
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      } )
    } catch ( error ) {
      alert( 'Error al listar productos' )
    }
  }

  ListClient (): void {
    const dialogRef = this.dialog.open( ListClientComponent, {
      width: '1100px',
      height: '900px'
    } )
    dialogRef.afterClosed().subscribe( res => {
      if ( res ) {
        console.log( res )
      }
    } )
  }

  newInvice (): void {
    const dialogRef = this.dialog.open( CreateInvoicesComponent, {
      width: '700px',
      height: '300px'
    } )
    dialogRef.afterClosed().subscribe( res => {
      this.getInvoiceList()
      if ( res ) {
        console.log( res )
      }
    } )
  }

  ListBrand (): void {
    const dialogRef = this.dialog.open( ListBrandComponent, {
      width: '1000px',
      height: '650px'
    } )
    dialogRef.afterClosed().subscribe( res => {
      if ( res ) {
        console.log( res )
      }
    } )
  }

  editInvoice ( element: any ) {
    const dialogRef = this.dialog.open( BrandDetailComponent, {
      width: '1000px',
      height: '700px',
      data: element
    } )
    dialogRef.afterClosed().subscribe( res => {
      if ( res ) {
        console.log( res )
      }
    } )
  }

  deleteIvoice ( id: any ) {
    try {
      this._listClitService.deleteInvoice( id ).subscribe( res => {
        this.getInvoiceList()
        console.log( res )
      } )
    } catch ( error ) {
      console.log( error )
    }
  }

  applyFilter ( event: Event ) {
    const filterValue = ( event.target as HTMLInputElement ).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
    if ( this.dataSource.paginator ) {
      this.dataSource.paginator.firstPage()
    }
  }

  pageChange ( event: any ) {
    this.pageSize = event.pageSize
    this.actualPage = event.pageIndex + 1
    this.getInvoiceList()
  }
}
