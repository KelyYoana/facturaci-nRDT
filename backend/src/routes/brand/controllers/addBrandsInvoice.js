'use strict'
import { Transaction } from 'sequelize'
import models from '../../../connection/models/index'

async function addBrandsInvoice(req, res, next) {
 try {
  console.log(req.params.id,'aa')
  console.log(req.body)
  const idInvoice= req.params.id
  const idBrand = req.body.nameBrand
  const productQuantity = req.body.cantidad
  const total = req.body.total

  const getInvoices = await models.inoicesBrands.create({
    idInvoice:idInvoice,
    idBrand:idBrand,
    productQuantity:productQuantity,
    total:total
  })

  return res.status(200).send({getInvoices})

 } catch (error) {
  return res.status(500).send({error})
 } 
}
export{addBrandsInvoice}