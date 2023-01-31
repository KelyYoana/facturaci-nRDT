import { Component, Inject, Input, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { CreateBrand } from 'src/app/shared/brand/createBrand.dto'
import { ServiceClientService } from '../../services/service-client.service'

@Component( {
  selector: 'app-create-brand',
  templateUrl: './create-brand.component.html',
  styleUrls: ['./create-brand.component.css']
} )
export class CreateBrandComponent implements OnInit {
  public newBrandForm!: FormGroup
  private fb: FormBuilder = new FormBuilder()
  @Input() element!: string

  titulo = "Nuevo Producto"


  constructor (
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CreateBrandComponent>,
    @Inject( MAT_DIALOG_DATA ) public data: any,
    private _newBrandForm: ServiceClientService
  ) { }

  ngOnInit (): void {
    this.newBrandForm = this.buildNewBrand( this.fb )
    this.element = this.data
    this.editBrand()
  }

  buildNewBrand ( formBuilder: FormBuilder ) {
    return formBuilder.group( {
      id: [''],
      name: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.minLength( 1 ), Validators.pattern( /^-?(0|[1-9]\d*)?$/ )]],
      stock: ['', [Validators.required, Validators.minLength( 1 ), Validators.pattern( /^-?(0|[1-9]\d*)?$/ )]]
    } )
  }

  newBrand () {
    if ( this.element !== null ) {
      if ( this.newBrandForm.valid ) {
        this._newBrandForm.editBrand( this.newBrandForm.getRawValue() )
          .subscribe(
            ( ressult: any ) => {
              this.dialogRef.close()
            }, ( error: any ) => {
              
              alert( error.message )
              console.log( error )
            }
          )
      }
    } else {
      if ( this.newBrandForm.valid ) {
        this._newBrandForm.createBrand( this.newBrandForm.getRawValue() as CreateBrand )
          .subscribe(
            ( result ) => {
              this.dialogRef.close()
            }, ( error: any ) => {
              alert( error.message )
            }
          )
      }
    }
  }

  cancelar () {
    this.dialogRef.close()
  }

  editBrand () {
    if ( this.element !== null ) {
      this.titulo = "Editar Producto"
      this.newBrandForm.patchValue( {
        id: this.data.id,
        name: this.data.name,
        price: this.data.price,
        stock: this.data.stock
      } )
    }
  }

}
