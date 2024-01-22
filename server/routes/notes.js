const express=require('express')

const {createNote,getNote,getNotes,deleteNote,updateNote}=require('../controllers/noteControllers')

const requireAuth=require('../middleware/requireAuth')

const router=express.Router()

//require authentication for all routes 
router.use(requireAuth)


//get all notes
router.get('/',getNotes)

//get a single note
router.get('/:id',getNote)

//post a new note
router.post('/',createNote)

//delete a note
router.delete('/:id',deleteNote)

//update a note
router.patch('/:id',updateNote)


module.exports=router