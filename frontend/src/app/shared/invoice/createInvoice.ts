export class CreateInvoice {
  public get idClient (): number {
    return this._idClient
  }
  public set idClient ( value: number ) {
    this._idClient = value
  }
  public get date (): Date {
    return this._date
  }
  public set date ( value: Date ) {
    this._date = value
  }


  constructor (
    private _date: Date,
    private _idClient: number
  ) { }
}