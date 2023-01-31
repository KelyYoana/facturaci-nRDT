'use strict'
import models from '../../../connection/models/index'

async function getClients(req, res, next) {
  try {
    const getClient = await clientAll()
    return res.status(200).send({getClient})
  } catch (error) {
    next(error)
  }
}
export{getClients}
async function clientAll(){
  return await models.clients.findAll({
    attributes: ['id','name','surName','direction','dateBirth','phone','email','category']
  })
}