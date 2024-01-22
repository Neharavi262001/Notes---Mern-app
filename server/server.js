require('dotenv').config()
const express=require('express')
const cors = require('cors');
const mongoose=require('mongoose')
const notesRoutes=require('./routes/notes')
const userRoutes=require('./routes/user')

const app=express()
const port=process.env.PORT;

//middleware
app.use(express.json())

app.use(cors());

app.use((req,res,next)=>{
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/notes',notesRoutes)
app.use('/api/user',userRoutes)


//connect to db
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(port,()=>{
        console.log(`Connected to db and app listening on port ${port}`)
    })
})
.catch((error)=>{
    console.log(error)
})

