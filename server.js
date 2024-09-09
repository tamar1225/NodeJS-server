const express = require('express')
const app = express()
const port = 8080
const bodyParser = require('body-parser')
const connectDB = require('./models/connectDB')
const toyRouter = require('./routers/toyRouter')
const categoryRouter = require('./routers/categoryRouter')

app.use(bodyParser.json())
app.use(bodyParser.text())

connectDB()

app.listen(port, () => {
    console.log("server is runing!!")
})

app.use('/toys', toyRouter);
app.use('/category' , categoryRouter)