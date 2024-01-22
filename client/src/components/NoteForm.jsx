import React,{useState} from 'react'
import { useNotesContext } from '../hooks/useNotesContext'
import { useAuthContext } from '../hooks/useAuthContext'



const NoteForm = () => {
  const {dispatch} = useNotesContext()
  const {user}=useAuthContext()

    const [title,setTitle]=useState('')
    const [description,setDescription]=useState('')
    const [error,setError]=useState(null)
    const [emptyFields, setEmptyFields]=useState([])

    const handleSubmit=async(e)=>{
        e.preventDefault()

        if(!user){
          setError('You must be Logged in !')
          return
        }
       
        const note={title,description}
        const response=await fetch('http://localhost:8000/api/notes' , {
          method:'POST',
          body:JSON.stringify(note),
          headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${user.token}`
          }
        })

        const json=await response.json()

        if(!response.ok){
          setError(json.error)
          setEmptyFields(json.emptyFields)
        }

        if(response.ok){
          setTitle('')
          setDescription('')
          setError(null)
          setEmptyFields([])
          
          console.log('new note added successfully',json)
          dispatch({
            type:'CREATE_NOTES',
            payload:json
          })
        }

        
    }

  return (
    <form className='create-note' onSubmit={handleSubmit}>
        <h1>Add a new note</h1>

        <label >Title : </label>
        <input 
        type="text" 
        placeholder="Enter title"
        onChange={(e)=>setTitle(e.target.value)} 
        value={title}
        className={emptyFields.includes('title')?'error':''}
        />

        <label >Description : </label>
        <textarea  
        name="descriptionBox" 
        rows="4" 
        placeholder="Enter description here"
        onChange={(e)=>setDescription(e.target.value)}
        value={description}
        ></textarea>
        <button>Add Note</button>
        {error && <div className='error'>{error}</div>}

      
    </form>
  )
}

export default NoteForm

