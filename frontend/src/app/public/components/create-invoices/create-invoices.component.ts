import { Component, Inject, Input, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { CreateInvoice } from 'src/app/shared/invoice/createInvoice'
import { ServiceClientService } from '../../services/service-client.service'
import { BrandDetailComponent } from '../brand-detail/brand-detail.component'

@Component( {
  selector: 'app-create-invoices',
  templateUrl: './create-invoices.component.html',
  styleUrls: ['./create-invoices.component.css']
} )
export class CreateInvoicesComponent implements OnInit {
  public newInvoiceForm!: FormGroup
  titulo = "Generar factura"
  @Input() element!: string

  idClientOptions: any


  constructor (
    public dialogRef: MatDialogRef<CreateInvoicesComponent>,
    private _newInvoiceForm: ServiceClientService,
    private fb: FormBuilder = new FormBuilder(),
    @Inject( MAT_DIALOG_DATA ) public data: any,
    public dialog: MatDialog,
  ) { }

  ngOnInit (): void {
    this.newInvoiceForm = this.buildNewInvoice( this.fb )
    this.idClientOptions = this._newInvoiceForm.getClients()
    this.element = this.data
  }

  buildNewInvoice ( formBuilder: FormBuilder ) {
    return formBuilder.group( {
      nameCliente: ['', [Validators.required]]
    } )
  }
  newInvoice () {
    if ( this.element !== null ) {
      //Editar cliente
      if ( this.newInvoiceForm.valid ) {
        this._newInvoiceForm.editClient( this.newInvoiceForm.getRawValue() )
          .subscribe(
            ( ressult: any ) => {

            }, ( error: any ) => {
              alert( error.message )
              console.log( error )
            }
          )
      }
    } else {
      //Agregar cliente
      if ( this.newInvoiceForm.valid ) {
        this._newInvoiceForm.createInvoice( this.newInvoiceForm.getRawValue() as CreateInvoice )
          .subscribe(
            ( ressult: any ) => {
              //Abrir el modal de detalle de la factura
              this.dialogRef.close()
              this.brandDetail( ressult )
            }, ( error: any ) => {
              alert( error.message )
              console.log( error )
            }
          )
      }
    }
  }

  brandDetail ( element: any ) {
    const dialogRef = this.dialog.open( BrandDetailComponent, {
      width: '7000px',
      height: '700px',
      data: element
    } )
  }

  cancelar () {
    this.dialogRef.close()
  }
}
