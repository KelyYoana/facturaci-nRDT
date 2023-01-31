import { Component, OnInit, ViewChild } from '@angular/core'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { ServiceClientService } from '../../services/service-client.service'
import { CreateClientComponent } from '../create-client/create-client.component'
import { MatSort } from '@angular/material/sort'


@Component( {
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
} )
export class ListClientComponent implements OnInit {
  public actualPage: number = 1
  public pageSize: number = 10
  public pageSizeOptions: number[] = [10, 15, 20, 25]
  public length: number = 0
  public listClients!: any[]
  public dataSource: MatTableDataSource<any> = new MatTableDataSource()
  public clientList!: any[]
  displayedColumns: string[] = ['codigo', 'name', 'direction', 'dateBirth', 'phone', 'email', 'category', 'acciones'];


  @ViewChild( MatPaginator, { static: true } ) paginator!: any
  @ViewChild( MatSort ) sort!: MatSort
  constructor (
    public dialog: MatDialog,
    private _listClitService: ServiceClientService,
    public dialogRef: MatDialogRef<CreateClientComponent>,
  ) { }

  ngOnInit (): void {
    this.getClients()
  }

  async getClients () {
    try {
      const getClients = await this._listClitService.getClients().subscribe( ( listClients: any ) => {
        if ( !getClients ) {
          alert( 'Error al listar clientes' )
        }
        console.log( listClients, 'list' )
        this.clientList = listClients
        this.dataSource = new MatTableDataSource( this.clientList )
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      } )
    } catch ( error ) {
      alert( 'Error al listar clientes' )
    }
  }

  newClient (): void {
    const dialogRef = this.dialog.open( CreateClientComponent, {
      width: '700px',
      height: '450px'
    } )
    dialogRef.afterClosed().subscribe( res => {
      this.getClients()
      if ( res ) {
        console.log( res )
      }
    } )
  }

  editUser ( element: any ) {
    const dialogRef = this.dialog.open( CreateClientComponent, {
      width: '700px',
      height: '450px',
      data: element
    } )
    dialogRef.afterClosed().subscribe( res => {
      this.getClients()
      if ( res ) {
        console.log( res )
      }
    } )
  }

  deleteUser ( element: any ) {
    console.log( element )
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
    this.getClients()
  }
  cancelar () {
    this.dialogRef.close()
  }
}
