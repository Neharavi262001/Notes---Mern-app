import React from 'react'
import { useNotesContext } from '../hooks/useNotesContext'
import { useAuthContext } from '../hooks/useAuthContext'

const NotesDetails = ({note}) => {

  const {dispatch}=useNotesContext()
  const {user}=useAuthContext()

  const handleClick = async () => {
    if (!user){
      return
    }
    
      const response = await fetch('http://localhost:8000/api/notes/'+note._id,{
        method:'DELETE',
        headers:{
          'Authorization':`Bearer ${user.token}`
        }
      })
      const json = await response.json();
  
      if (response.ok) {
        
        
        
        dispatch({
          type: 'DELETE_NOTE',
          payload: json
        });
      }
  
  }
  
  return (
    <div className='notes-details'>
      <h4>{note.title}</h4>
      <p>{note.description}</p>
      <span onClick={handleClick}>delete</span>
    </div>
  )
}

export default NotesDetails

