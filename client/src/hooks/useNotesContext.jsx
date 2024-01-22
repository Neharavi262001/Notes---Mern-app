import { NotesContext } from "../context/notesContext";
import { useContext } from "react";


export const useNotesContext = ()=>{
    const context = useContext(NotesContext)

    if  (!context){
        throw Error('error error error error !')
    }

    return context
}