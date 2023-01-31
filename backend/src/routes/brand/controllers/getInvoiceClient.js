'use strict'
import models from '../../../connection/models/index'

async function getInvoiceClient (req, res, next) {
  try {
    const idInvoice = req.params
    console.log(idInvoice,'ser')
    const getInvoices = await  getInvoiceList(idInvoice)
    // console.log(getInvoices,'contr')
    return res.status(200).send({getInvoices}) 
  } catch (error) {
    error.error=error
    error.message="Error al listar las facturas"
    next(error)
  }
}

export{getInvoiceClient}

async function getInvoiceList(idInvoice){
  const options={
    attributes:['id','idInvoice','idBrand','productQuantity','total'],
    where:{idInvoice:idInvoice},
    include:[{
      model:models.invoices,
      attributes:['id','date','idClient'],
      include:[{
        model:models.clients,
        attributes:['id','name','surName']
      }]
    },{
      model:models.brands,
      attributes:['id','name','price','stock']
    }]
  }

  const data = await models.inoicesBrands.findAll(options)
  return data
}
