//packages
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require("cors");
require("dotenv").config()

mongoose.connect(process.env.MONGO_URI)
//routes
const userRoutes=require('./user/user.route')
const TasksRoutes=require('./tasks/tasks.route')

//middleware
app.use(express.urlencoded({extended: true}))
app.use(cors());
app.use(express.json())
app.use(cors({
  origin: "*"
}))
const GlobalError=require('./utils/Globalerror')
//handle routes
app.use("/user", userRoutes);
app.use('/',TasksRoutes)


app.all('*',(req,res,next)=>
{
  res.status(404).send('Invalid Request')
  next()
})

app.use(GlobalError)
app.listen(process.env.PORT || 5000, () => console.log('server running'))

