import { Component, OnInit, ViewChild } from '@angular/core'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { ServiceClientService } from '../../services/service-client.service'
import { CreateBrandComponent } from '../create-brand/create-brand.component'

@Component( {
  selector: 'app-list-brand',
  templateUrl: './list-brand.component.html',
  styleUrls: ['./list-brand.component.css']
} )
export class ListBrandComponent implements OnInit {
  public actualPage: number = 1
  public pageSize: number = 5
  public pageSizeOptions: number[] = [5, 10, 15, 20, 25]
  public length: number = 0
  public listBrand!: any[]
  public dataSource: MatTableDataSource<any> = new MatTableDataSource()
  public brandList!: any[]
  displayedColumns: string[] = ['codigo', 'name', 'price', 'stock', 'acciones'];


  @ViewChild( MatPaginator, { static: true } ) paginator!: any
  @ViewChild( MatSort ) sort!: MatSort

  constructor (
    public dialog: MatDialog,
    private _listClitService: ServiceClientService,
    public dialogRef: MatDialogRef<CreateBrandComponent>,
  ) { }

  ngOnInit (): void {
    this.getBrands()
  }

  async getBrands () {
    try {
      const getBrand = await this._listClitService.getBrand().subscribe( ( getBrand: any ) => {
        if ( !getBrand ) {
          alert( 'Error al listar clientes' )
        }
        this.brandList = getBrand
        this.dataSource = new MatTableDataSource( this.brandList )
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
        console.log( this.dataSource, 'brands' )
      } )
    } catch ( error ) {
      alert( 'Error al listar los productos' )
    }
  }

  editBrand ( element: any ) {
    const dialogRef = this.dialog.open( CreateBrandComponent, {
      width: '700px',
      height: '450px',
      data: element
    } )
    dialogRef.afterClosed().subscribe( res => {
      this.getBrands()
      if ( res ) {
        console.log( res )
      }
    } )
  }

  newBrand (): void {
    const dialogRef = this.dialog.open( CreateBrandComponent, {
      width: '500px',
      height: '400px'
    } )
    dialogRef.afterClosed().subscribe( res => {
      this.getBrands()
      if ( res ) {
        console.log( res )
      }
    } )
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
    this.getBrands()
  }
  cancelar () {
    this.dialogRef.close()
  }
}
