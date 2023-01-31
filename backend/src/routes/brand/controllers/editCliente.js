'use strict'
import models from '../../../connection/models/index'

async function editCliente (req, res, next) {
  try {
    const id =req.body.id
    const name = req.body.name
    const surName = req.body.surname
    const direction = req.body.inputDirection
    const dateBirth = req.body.inputDateBirth
    const phone = req.body.inputPhone
    const email = req.body.inputEmail
    const category = req.body.inputCategory

    const updateClient = await models.clients.findOne({
      where:{id:id}
    })
    
    updateClient.name=name
    updateClient.surName=surName
    updateClient.phone=phone
    updateClient.dateBirth=dateBirth
    updateClient.phone=phone
    updateClient.email=email
    updateClient.category=category
    updateClient.updatedAt = new Date()
    await updateClient.save()
    return res.status(200).send({message:'Cliente actualizado con exito'})
  } catch (error) {
    error.error=error
    error.message="Error al editar el registro"
    next()
  }
}

export{editCliente}