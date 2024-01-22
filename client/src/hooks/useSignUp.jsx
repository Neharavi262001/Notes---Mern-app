import React, { useState } from 'react'
import {useAuthContext} from './useAuthContext'


const useSignUp = () => {
    const [error,setError]=useState(null)
    const [isLoading,setIsLoading]=useState(null)
    const { dispatch } = useAuthContext();

    const signup=async(email,password)=>{
        setError(null)
        setIsLoading(true)

        const response = await fetch('http://localhost:8000/api/user/signup',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({email,password})
        })
        const json = await response.json()
        if (!response.ok){
            setIsLoading(false)
            setError(json.error)
        }

        //if response is ok, save the user to local storage
        // it is done by  taking the json web token and saving it
        // also update auth context to login

        if (response.ok){
            localStorage.setItem('user',JSON.stringify(json))

            dispatch({type:'LOGIN', payload:json})
            setIsLoading(false)
        }
    }
  return {signup,isLoading,error}

   
}

export default useSignUp
