const categoryModel = require('../models/categoryModel')
const toyModel = require('../models/toyModel')

async function getAllToys(req, res) {
    try {
        let listToys = await toyModel.find()
        res.json(listToys)
    }
    catch (e) {
        res.json({ message: e.message })
    }
}

async function createToy(req, res) {
    try {
        const newToy = await new toyModel({
            name: req.body.name,
            prodDate: req.body.prodDate,
            numOfPlayers: req.body.numOfPlayers,
            ageOfPlayers: req.body.ageOfPlayers,
            price: req.body.price,
            company: req.body.company,
            goalsGame: req.body.goalsGame,
            categoryId: req.body.categoryId
        })
        await newToy.save()
        await categoryModel.findByIdAndUpdate(req.body.categoryId, { $push: { toys: newToy._id } })
        res.status(201).json(newToy)
    }
    catch (e) {
        res.status(400).send(e.message)
    }
}


async function deleteToy(req, res) {
    try {
        let id = req.params.id
        const toy = await toyModel.findById(id);
        await categoryModel.findByIdAndUpdate(toy.categoryId, { $pull: { toys: toy._id } })
        result= await toyModel.findByIdAndDelete(id)
        res.status(404).json(result)
    }
    catch (e) {
        res.status(405).json({ message: e.message })
    }
}

async function deleteAllToys(req, res) {
    try {
        const result = await toyModel.deleteMany({});
        let listCategories=await categoryModel.find()
        listCategories.updateMany({}, { $set: { toys: [] } });
        res.send(result).status(200)
    }
    catch (e) {
        res.send('could not delete any toy').status(400)
    }
}
async function updateToy(req, res) {
    try {
        const id = req.params.id
        const updated = req.body
        const result = await toyModel.findByIdAndUpdate({ _id: id },
            {
                $set: updated
            }, { new: true })
        res.json(result)
    }
    catch (e) {
        res.json({ message: e.message })
    }
}
async function getToysByPrice(req, res) {
    try {
        const { price1, price2 } = req.body
        const toysBetween = await toyModel.find({ price: { $gt: (Number)(price1), $lte: (Number)(price2) } })
        console.log(price1, price2)
        res.json(toysBetween)
    }
    catch (e) {
        res.json({ message: e.message })
    }
}
async function getToyById(req, res) {
    try {
        let id = req.params.id
        let toy = toyModel.find({ _id: id })
        res.json(toy)
    }
    catch (e) {
        res.json({ message: e.message })
    }
}

async function getToysByName(req, res) {
    try {
        let searchName = req.params.name
        const toys = await toyModel.find({ name: { $regex: searchName, $options: 'i' } });
        res.json(toys)
    }
    catch (e) {
        res.json({ message: e.message })
    }
}
module.exports = { getAllToys, getToyById, createToy, deleteToy, updateToy, getToysByPrice, deleteAllToys, getToysByName }