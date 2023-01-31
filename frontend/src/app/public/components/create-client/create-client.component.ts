import { Component, Inject, Input, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { CreateClient } from 'src/app/shared/client/createClient.dto'
import { ServiceClientService } from '../../services/service-client.service'

@Component( {
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
} )
export class CreateClientComponent implements OnInit {
  public newClientForm!: FormGroup
  private fb: FormBuilder = new FormBuilder()
  @Input() element!: string
 
  titulo = "Nuevo Cliente"

  constructor (
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CreateClientComponent>,
    private _newClientForm: ServiceClientService,
    @Inject( MAT_DIALOG_DATA ) public data: any,
  ) { }

  ngOnInit (): void {
    this.newClientForm = this.buildNewClient( this.fb )
    this.element = this.data
    this.editClient()
  }

  buildNewClient ( formBuilder: FormBuilder ) {
    return formBuilder.group( {
      id: [''],
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      inputDirection: ['', [Validators.required]],
      inputDateBirth: ['', [Validators.required]],
      inputPhone: ['', [Validators.required, Validators.pattern( /^[0-9]\d*$/ ), Validators.minLength( 7 ), Validators.maxLength( 10 )]],
      inputEmail: ['', [Validators.required, Validators.pattern( /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/ )]],
      inputCategory: ['', [Validators.required]]
    } )

  }

  newClient () {
    if ( this.element !== null ) {
      //Editar cliente
      if ( this.newClientForm.valid ) {
        this._newClientForm.editClient( this.newClientForm.getRawValue() )
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
      //Agregar cliente
      if ( this.newClientForm.valid ) {
        this._newClientForm.crearClient( this.newClientForm.getRawValue() as CreateClient )
          .subscribe(
            ( ressult: any ) => {
              this.dialogRef.close()
            }, ( error: any ) => {
              alert( error.message )
              console.log( error )
            }
          )
      }
    }
  }

  cancelar () {
    this.dialogRef.close()
  }

  editClient () {
    if ( this.element !== null ) {
      this.titulo = "Editar Cliente"
      this.newClientForm.patchValue( {
        id: this.data.id,
        name: this.data.name,
        surname: this.data.surName,
        inputDirection: this.data.direction,
        inputDateBirth: this.data.dateBirth,
        inputPhone: this.data.phone,
        inputEmail: this.data.email,
        inputCategory: this.data.category
      } )
    }
  }
}
