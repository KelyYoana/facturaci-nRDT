'use strict'
import models from '../../../connection/models/index'

async function createClient (req, res, next) {
  const transaction = await models.sequelize.transaction({ autocommit: false })
  try {  
    const dataClient = dataNewClient(req.body)
    const idBrandData = req.body.inputNameBrand
    const creatClient = await createNewClient(dataClient)
    await Promise.all([creatClient])
    await transaction.commit()
    return res.status(200).send({
      message:'Registro creado con exito'
    })
  } catch (e) {
    await transaction.rollback()
    console.log(e)
    e.error = e
    e.message = 'No se pudo crear el registro'
    e.status = 500
    e.name = 'Error en la creación del registro'
    next(e)
  }
}

function dataNewClient(body){
  const dataClient={
    name:body.name,
    surname:body.surname,
    direction:body.inputDirection,
    dateBirth:body.inputDateBirth,
    phone:body.inputPhone,
    email:body.inputEmail,
    category:body.inputCategory
  }
  return dataClient
}

async function createNewClient(dataClient,transaction){
  return await models.clients.create({
    name:dataClient.name,
    surName:dataClient.surname,
    direction:dataClient.direction,
    dateBirth:dataClient.dateBirth,
    phone:dataClient.phone,
    email:dataClient.email,
    category:dataClient.category
  },{transaction})
}
export {createClient}