import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { ServiceClientService } from '../../services/service-client.service'
import { AddBrandInvoiceComponent } from '../add-brand-invoice/add-brand-invoice.component'

@Component( {
  selector: 'app-brand-detail',
  templateUrl: './brand-detail.component.html',
  styleUrls: ['./brand-detail.component.css']
} )
export class BrandDetailComponent implements OnInit {
  public dataSource: MatTableDataSource<any> = new MatTableDataSource()
  public actualPage: number = 1
  public pageSize: number = 5
  public length: number = 0
  public pageSizeOptions: number[] = [5, 10, 15, 20, 25]

  public listBrands!: any[]
  idInvoice!: any
  displayedColumns: string[] = ['codigo', 'nameBrand', 'nameCantidad', 'namePrice', 'namePriceTotal', 'acciones'];

  @Input() element!: any
  @ViewChild( MatPaginator, { static: true } ) paginator!: any
  @ViewChild( MatSort ) sort!: MatSort

  constructor (
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<BrandDetailComponent>,
    private _listBrandService: ServiceClientService,
    @Inject( MAT_DIALOG_DATA ) public data: any
  ) { }

  ngOnInit (): void {
    this.element = this.data
    this.idInvoice = this.element.idClient.id
    this.getInvoiceBrand()
    this.getBrand()
  }


  deleteBrand ( element: any ) {
    this._listBrandService.deleteInvoiceBrand( element ).subscribe(
      data => {
        this.getBrand()
      } )
  }

  addBrand () {
    const idInvoiceBrand = this.idInvoice
    //Edit factura
    if ( !idInvoiceBrand ) {
      const idInvoiceBrand = this.element.id
      const dialogRef = this.dialog.open( AddBrandInvoiceComponent, {
        width: '550px',
        height: '400px',
        data: idInvoiceBrand
      } )
      dialogRef.afterClosed().subscribe( res => {
        this.getBrand()
        if ( res ) {
          console.log( res )
        }
      } )

    } else {
      //Agregar factura
      const dialogRef = this.dialog.open( AddBrandInvoiceComponent, {
        width: '550px',
        height: '400px',
        data: idInvoiceBrand
      } )
      dialogRef.afterClosed().subscribe( res => {
        this.getBrand()
        if ( res ) {
          console.log( res )
        }
      } )
    }

  }

  async getBrand () {
    if ( !this.idInvoice ) {
      try {
        const idInvoice = this.element.id
        const getBrands = await this._listBrandService.getBrandsClient( idInvoice ).subscribe( ( getBrandClient: any ) => {
          if ( !getBrands ) {
            alert( 'Error al listar los productos' )
          }
          this.listBrands = getBrandClient.data
          this.dataSource = new MatTableDataSource( this.listBrands )
          this.dataSource.paginator = this.paginator
          this.dataSource.sort = this.sort
        } )
      } catch ( error ) {
        console.log( error )
      }
    }
    else {
      try {
        console.log( this.idInvoice )
        const getBrands = await this._listBrandService.getBrandsClient( this.idInvoice ).subscribe( ( getBrandClient: any ) => {
          if ( !getBrands ) {
            alert( 'Error al listar los productos' )
          }
          this.listBrands = getBrandClient.data
          this.dataSource = new MatTableDataSource( this.listBrands )
          this.dataSource.paginator = this.paginator
          this.dataSource.sort = this.sort
        } )
      } catch ( error ) {
        console.log( error )
      }
    }
  }

  async getInvoiceBrand () {
    try {
      const getInvoiveBrand = await this._listBrandService.getInvoiceClient( this.idInvoice ).subscribe( ( getInvoices: any ) => {
        if ( !getInvoiveBrand ) {
          console.log( 'Error' )
        }
        this.listBrands = getInvoices.getInvoices
        this.dataSource = new MatTableDataSource( this.listBrands )
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort

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
    this.getBrand()
  }
  cancelar () {
    this.dialogRef.close()
  }
}
