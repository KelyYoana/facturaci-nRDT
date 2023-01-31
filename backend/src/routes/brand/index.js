'use strict'
import express from 'express'
import brandController from './controllers'

const brandRouter = express.Router()

brandRouter.get(
  '/listBrand',
  brandController.listBrand
)
brandRouter.post(
  '/createClient',
  brandController.createClient
)
brandRouter.post(
  '/createBrand',
  brandController.createBrand
)
brandRouter.get(
  '/getBrands',
  brandController.getBrands
)
brandRouter.get(
  '/getClients',
  brandController.getClients
)
brandRouter.post(
  '/editCliente',
  brandController.editCliente
)
brandRouter.get(
  '/getInvoice',
  brandController.getInvoice
)
brandRouter.post(
  '/editBrand',
  brandController.editBrand
)
brandRouter.get(
  '/getBrandsClient/:id',
  brandController.getBrandsClient
)
brandRouter.get(
  '/getInvoiceClient/:id',
  brandController.getInvoiceClient
)
brandRouter.post(
  '/addBrandsInvoice/:id',
  brandController.addBrandsInvoice
)
brandRouter.post(
  '/createInvoice',
  brandController.createInvoice
)
brandRouter.get(
  '/deleteInvoiceBrand/:id',
  brandController.deleteInvoiceBrand
)
brandRouter.get(
  '/deleteInvoice/:id',
  brandController.deleteInvoice
)
export {brandRouter}