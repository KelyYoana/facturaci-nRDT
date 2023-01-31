import { Component, Inject, Input, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { CreateInvoiceBrand } from 'src/app/shared/invoiceBrand/createInvoiceBrand'
import { ServiceClientService } from '../../services/service-client.service'

@Component( {
  selector: 'app-add-brand-invoice',
  templateUrl: './add-brand-invoice.component.html',
  styleUrls: ['./add-brand-invoice.component.css']
} )
export class AddBrandInvoiceComponent implements OnInit {
  public addBrandInvoiceForm!: FormGroup
  titulo = "Agregar producto"
  idBrandOptions: any
  cantidadBrand: any
  maxBrand: any
  priceBrand: any
  priceTotal: any
  idInvoice: any
  text = ''
  idBrandInvoice!: any
  @Input() element!: string

  constructor (
    public dialogRef: MatDialogRef<AddBrandInvoiceComponent>,
    private _addBrandInvoiceForm: ServiceClientService,
    private fb: FormBuilder = new FormBuilder(),
    @Inject( MAT_DIALOG_DATA ) public data: any,
  ) { }

  ngOnInit (): void {
    this.addBrandInvoiceForm = this.buildAddBrandInvoice( this.fb )
    this.idBrandOptions = this._addBrandInvoiceForm.getBrands()
    this.element = this.data
    this.idInvoice = this.element
  }

  buildAddBrandInvoice ( formBuilder: FormBuilder ) {
    return formBuilder.group( {
      nameBrand: ['', [Validators.required]],
      cantidad: ['', [Validators.required, Validators.minLength( 1 ), Validators.pattern( /^-?(0|[1-9]\d*)?$/ )]],
      total: ['', [Validators.required, Validators.minLength( 1 ), Validators.pattern( /^-?(0|[1-9]\d*)?$/ )]]
    } )
  }

  addBrandInvoice () {
    if ( this.addBrandInvoiceForm.valid ) {
      this._addBrandInvoiceForm.addBrandsInvoice( this.idInvoice, this.addBrandInvoiceForm.getRawValue() as CreateInvoiceBrand )
        .subscribe( ( result: any ) => {
          this.dialogRef.close()
        }, ( error: any ) => {
          alert( error.message )
          console.log( error )
        } )
    }
  }

  cancelar () {
    this.dialogRef.close()
  }

  idBrand ( brandOption: any ) {
    this.priceBrand = brandOption.price
    this.maxBrand = brandOption.stock
  }

  onKeyUp () {
    if ( this.cantidadBrand > this.maxBrand ) {
      this.text = "Supera el número de existencias, cantidad máxima: " + this.maxBrand
      this.addBrandInvoiceForm.patchValue( {
        total: ''
      } )
    } else {
      this.text = ""
      this.idBrandInvoice = this.element
      this.priceTotal = this.priceBrand * this.cantidadBrand
      this.addBrandInvoiceForm.patchValue( {
        total: this.priceTotal
      } )
    }
  }

}
