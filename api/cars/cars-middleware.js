const Car = require("./cars-model")
const vinValidator = require('vin-validator')

async function checkCarId (req,res, next){
 const {id} = req.params
 try{
 const car = await Car.getById(id)
 if(!car){
   res.status(404).json({message: `car with ${id} not found`})
 }else{
   req.car = car
   next()
 }
 }catch(err){
   next(err)
 }
}

function checkCarPayload (req,res, next){
const {vin,make,model,mileage} = req.body
if (!vin || vin === undefined ){
res.status(400).json({message:"vin is missing"})
}else if (!make || make === undefined){
  res.status(400).json({message:"make is missing"})
}else if (!model || model === undefined){
  res.status(400).json({message:"model is missing"})
}else if (!mileage || mileage === undefined){
  res.status(400).json({message:"mileage is missing"})
}else{
  next()
}
}


function checkVinNumberValid (req,res, next){
const vin = req.body.vin
try{
  const isVinValid = vinValidator.validate(`${vin}`);
  console.log("TBILISIIIIIIIII",typeof isVinValid)
  if(!isVinValid){
    res.status(400).json({message:`vin ${vin} is invalid`})
  }else{
    next()
  }
}catch(err){
next(err)
}
}


async function checkVinNumberUnique (req,res, next){
  // console.log("YO!!!!!!!!!",req.body)
const vin = req.body.vin
try{
const carVin = await Car.getByVin(vin)
if(carVin){
res.status(400).json({message:`vin ${vin} already exists`})
}else{
  next()
}
}catch(err){
next(err)
}
}

module.exports = {
  checkCarPayload,
  checkVinNumberUnique,
  checkCarId,
  checkVinNumberValid
}