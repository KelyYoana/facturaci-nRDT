'use strict'
import models from '../../../connection/models/index'

async function deleteInvoiceBrand(req, res) {
  try {
    const id= req.params.id
    await models.inoicesBrands.destroy({
      where:{id:id}
    })
    return res.status(200).send({message:'Registro eliminado'})
  } catch (error) {
    return res.status(404).send({error})
  }
}
export{deleteInvoiceBrand}