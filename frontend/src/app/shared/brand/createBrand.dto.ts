export class CreateBrand {
  public get stock (): string {
    return this._stock
  }
  public set stock ( value: string ) {
    this._stock = value
  }
  public get price (): string {
    return this._price
  }
  public set price ( value: string ) {
    this._price = value
  }
  public get name (): string {
    return this._name
  }
  public set name ( value: string ) {
    this._name = value
  }

  constructor (
    private _name: string,
    private _price: string,
    private _stock: string
  ) { }
}