const Note=require('../models/noteModel')
const mongoose=require('mongoose')



//get all notes
const getNotes=async(req,res)=>{

    const user_id=req.user._id

    //find all notes in the descending order of created date.  recently  created notes comes first
    const notes=await Note.find({user_id}).sort({createdAt:-1})
    res.status(200).json(notes)
}

//get single note
const getNote=async(req,res)=>{
    const {id}=req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Notes not found"})
    }

    const note=await Note.findById(id)

    if (!note){
        return res.status(404).json({error:"Notes not found !"})
    }

    res.status(200).json(note)
}

//post a new note
const createNote=async(req,res)=>{
    const {title,description}=req.body

    let emptyFields=[]

    if(!title){
        emptyFields.push(title)
    }

    if(emptyFields.length>0){
        return res.status(400).json({error:'Title required for note',emptyFields})
    }
    
    try{
        const user_id=req.user._id
        const note= await Note.create({title,description,user_id})
        res.status(200).json(note)

    }catch(error){
        res.status(400).json({error:error.message})
    }
}

//delete a single note
const deleteNote=async(req,res)=>{
    const {id}=req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Notes not found"})
    }

    const note=await Note.findOneAndDelete({_id:id})

    if (!note){
        return res.status(404).json({error:"Notes not found !"})
    }

    res.status(200).json(note)
}


//update a single note
const updateNote=async (req,res)=>{
    const {id}=req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Notes not found"})
    }

    const note=await Note.findOneAndUpdate({_id:id},{
        ...req.body
    })

    if (!note){
        return res.status(404).json({error:"Notes not found !"})
    }

    res.status(200).json(note)

}


module.exports={
    createNote,
    getNote,
    getNotes,
    deleteNote,
    updateNote
}