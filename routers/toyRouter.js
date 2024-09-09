const express=require('express')
const router=express.Router()
const toyController=require('../controllers/toyController')

router.get('/getAllToys', toyController.getAllToys)

router.get('/getToyById/:id', toyController.getToyById)

router.get('/getToysByName/:name', toyController.getToysByName)

router.get('/getToysByPrice', toyController.getToysByPrice)

router.post('/createToy', toyController.createToy)

router.put('/updateToy/:id', toyController.updateToy)

router.delete('/deleteToy/:id', toyController.deleteToy)

router.delete('/deleteAllToys', toyController.deleteAllToys)


module.exports=router