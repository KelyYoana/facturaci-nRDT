'use strict'
import models from '../../../connection/models/index'

async function createInvoice(req, res, next) {
  try {
    const idClient = await newInvoice(req.body)
   return res.status(200).send({idClient})
  } catch (error) {
    return res.status(500).send({error})
  }
}
export{createInvoice}

async function newInvoice(body){
  return await models.invoices.create({
    date:new Date(),
    idClient:body.nameCliente
  })
}