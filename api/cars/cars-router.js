// DO YOUR MAGIC
const router = require('express').Router()

const Car = require('./cars-model')

const { 
    checkCarId,
    checkCarPayload,
    checkVinNumberUnique,
    checkVinNumberValid
} = require('./cars-middleware')


router.get('/', (req, res, next) => {
    Car.getAll()
    .then((cars) => {
        res.json(cars)
    })
    .catch(next)
})

router.get('/:id',checkCarId, (req, res) => {
    res.json(req.car)
})

router.post('/',
checkVinNumberUnique,
checkVinNumberValid,
checkCarPayload, async (req, res, next) => {
    try{
const data = await Car.create(req.body)
res.json(data)
    }catch(err){
 next(err)
    }
})


module.exports = router