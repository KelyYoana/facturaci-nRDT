export class CreateClient {
  public get inputStock (): string {
    return this._inputStock
  }
  public set inputStock ( value: string ) {
    this._inputStock = value
  }
  public get inputPrice (): string {
    return this._inputPrice
  }
  public set inputPrice ( value: string ) {
    this._inputPrice = value
  }
  public get inputNameBrand (): string {
    return this._inputNameBrand
  }
  public set inputNameBrand ( value: string ) {
    this._inputNameBrand = value
  }
  public get category (): string {
    return this._category
  }
  public set category ( value: string ) {
    this._category = value
  }
  public get email (): string {
    return this._email
  }
  public set email ( value: string ) {
    this._email = value
  }
  public get phone (): string {
    return this._phone
  }
  public set phone ( value: string ) {
    this._phone = value
  }
  public get dateBirth (): string {
    return this._dateBirth
  }
  public set dateBirth ( value: string ) {
    this._dateBirth = value
  }
  public get direction (): string {
    return this._direction
  }
  public set direction ( value: string ) {
    this._direction = value
  }
  public get surName (): string {
    return this._surName
  }
  public set surName ( value: string ) {
    this._surName = value
  }
  public get name (): string {
    return this._name
  }
  public set name ( value: string ) {
    this._name = value
  }


  constructor (
    private _name: string,
    private _surName: string,
    private _direction: string,
    private _dateBirth: string,
    private _phone: string,
    private _email: string,
    private _category: string,
    private _inputNameBrand: string,
    private _inputPrice: string,
    private _inputStock: string
  ) { }
}