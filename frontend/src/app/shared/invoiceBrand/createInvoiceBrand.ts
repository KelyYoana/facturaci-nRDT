export class CreateInvoiceBrand{
  public get total (): string {
    return this._total
  }
  public set total ( value: string ) {
    this._total = value
  }
  public get productQuantity (): string {
    return this._productQuantity
  }
  public set productQuantity ( value: string ) {
    this._productQuantity = value
  }
  public get idBrand (): number {
    return this._idBrand
  }
  public set idBrand ( value: number ) {
    this._idBrand = value
  }
  public get idInvoice (): number {
    return this._idInvoice
  }
  public set idInvoice ( value: number ) {
    this._idInvoice = value
  }

  constructor(
    private _idInvoice: number,
    private _idBrand: number,
    private _productQuantity: string,
    private _total: string
  ){}
}