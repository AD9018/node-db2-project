const db = require("../../data/db-config")

function getAll(){
return db ('cars')
}

function getByVin(vin){
  return db ('cars').where('vin',vin).first()
}

function getById(id){
return db ('cars').where('id', id).first()
}

async function create(car){
const [id] = await db('cars')
.insert(car)
return getById(id)
}


module.exports = {
  getAll,
  getById,
  create,
  getByVin
}
