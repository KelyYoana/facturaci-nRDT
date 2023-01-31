export class client {
  _id?: number
  name: string
  surName: string
  direction: string
  dateBirth: string
  phone: string
  email: string
  category: string

  constructor ( name: string, surName: string, direction: string, dateBirth: string, phone: string, email: string, category: string ) {
    this.name = name
    this.surName = surName
    this.direction = direction
    this.dateBirth = dateBirth
    this.phone = phone
    this.email = email
    this.category = category
  }

}