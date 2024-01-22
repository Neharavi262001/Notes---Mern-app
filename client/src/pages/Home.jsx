import React, {useEffect,useState} from 'react'
import NotesDetails from '../components/NotesDetails'
import NoteForm from '../components/NoteForm'
import { useNotesContext } from '../hooks/useNotesContext'
import {useAuthContext} from '../hooks/useAuthContext'

const Home = () => {
    const {notes,dispatch} = useNotesContext()
    const {user}=useAuthContext()

    useEffect(()=>{
        const fetchNotes=async()=>{
            const response=await fetch('http://localhost:8000/api/notes',{
              headers:{
                'Authorization':`Bearer ${user.token}`
              }
            })
            const json=await response.json()
            console.log(response)

            if (response.ok){
                dispatch({
                  type:"SET_NOTES",
                  payload: json
                })

            }

        }

        if (user){
          fetchNotes()
        }
       

    },[dispatch,user])
  return (
    <div className='home'>
      <div className="notes">
      {notes && notes.map((note)=>(
            <NotesDetails key={note._id} note={note}/>
        ))}
       
      </div>
      <NoteForm/>
      
    </div>
  )
}

export default Home
