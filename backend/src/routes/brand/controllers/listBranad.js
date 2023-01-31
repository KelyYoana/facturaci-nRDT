'use strict'
import models from '../../../connection/models/index';

const listBrand = async(req,res)=>{
  try {
    const listBrand = await listBrands()
    return res.status(200).send({listBrand})
  } catch (error) {
    console.log('ERROR listBrand: ',error)
    next(error)
  }
 
}
export {listBrand}

async function listBrands(){
  return await models.brands.findAll({
    attributes:['id','name','price','stock']
  })
}