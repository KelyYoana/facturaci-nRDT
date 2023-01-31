'user strict'
import { listBrand } from './listBranad'
import { createClient } from './createClient'
import {createBrand} from './createBrand'
import {getBrands} from './getBrands'
import {getClients} from './getClients'
import {editCliente} from './editCliente'
import {getInvoice} from './getInvoice'
import {editBrand} from './editBrand'
import {getBrandsClient} from './getBrandsClient'
import {addBrandsInvoice} from './addBrandsInvoice'
import {createInvoice} from './createInvoice'
import {deleteInvoiceBrand} from './deleteInvoiceBrand'
import {getInvoiceClient} from './getInvoiceClient'
import {deleteInvoice} from './deleteInvoice'

export default{
  listBrand,
  createClient,
  createBrand,
  getBrands,
  getClients,
  editCliente,
  getInvoice,
  editBrand,
  getBrandsClient,
  addBrandsInvoice,
  createInvoice,
  deleteInvoiceBrand,
  getInvoiceClient,
  deleteInvoice
}