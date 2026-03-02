import dotenv from 'dotenv';
import  express from 'express'
import mongoose from 'mongoose'

dotenv.config()

const app=express()
app.use(express.json())
const urlMongoDB=process.env.MONGO_URI
mongoose.connect(urlMongoDB)
.then(()=>console.log('MongoDB connected'))
.catch(err=>console.log(err))

const PORT=process.env.PORT || 5000;
app.listen(PORT,
    ()=>console.log(`Server running on ${PORT}`)
)
