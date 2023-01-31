'use strict'
import models from '../../../connection/models/index'

async function getInvoice (req, res, next) {
  try {
    const getInvoices = await  getInvoiceList()
    return res.status(200).send({getInvoices}) 
  } catch (error) {
    error.error=error
    error.message="Error al listar las facturas"
    next(error)
  }
}

export{getInvoice}

async function getInvoiceList(){
  const options={
    attributes:['id','date','idClient'],
    include:[{
      model:models.clients,
      attributes:['id','name','surName']
    }]
  }

  const data = await models.invoices.findAll(options)
  return data
}
