const express=require('express')
const router=express.Router()
const categoryController= require('../controllers/categoryController')

router.get('/getAllCategories', categoryController.getAllCategories)
router.post('/createCategory', categoryController.createCategory)

module.exports=router