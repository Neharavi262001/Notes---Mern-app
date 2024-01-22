import { createContext,useEffect,useReducer } from "react";

//create context
export const AuthContext=createContext()

//reducer function that takes previous state and actions to dispatch
export const authReducer=(state,action)=>{
    switch(action.type){
        case 'LOGIN':
            //return the user that is the payload in action
            return {user:action.payload}
        case 'LOGOUT':
            return {user:null}
        default:
            return state
    }
}

//create context provider
export const AuthContextProvider=({children})=>{
    //reducer 
    const [state,dispatch]=useReducer(authReducer,{
        user:null //initial state
    })
    useEffect(()=>{
        const user=JSON.parse(localStorage.getItem('user'))
        if(user){
           dispatch({
            type:'LOGIN',
            payload:user
           })
        }
    },[])

    console.log('AuthContext state: ',state)

    return(
       <AuthContext.Provider value={{...state,dispatch}}>
        {children}
       </AuthContext.Provider> 
    )
}
