const categoryModel= require('../models/categoryModel')

async function getAllCategories(req ,res){
    try{
        const listCategories= await categoryModel.find().populate({
            path: "toys",
            select:{ toys: 1}
        })
        res.status(200).json(listCategories)
    }
    catch(e){res.status(400).json({message: e.message})}
}


async function createCategory(req, res){
    try{
        const newCategory=new categoryModel({
        name:req.body.name,
        toys:req.body.toys
        }     
        )
        await newCategory.save()
        res.status(200).send(newCategory)
    }
    catch(e){res.status(400).json({message: e.message})}
}

module.exports = {getAllCategories, createCategory}