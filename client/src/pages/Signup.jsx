import React, { useState } from 'react'
import useSignUp from '../hooks/useSignUp'


const Signup = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const {signup,isLoading,error} = useSignUp()

    const handleSubmit=async(e)=>{
        e.preventDefault()
        await signup(email,password)
    }
    

  return (
   <form className='signup'onSubmit={handleSubmit}>
    <h3>Sign Up</h3>


    <label >Email</label>
    <input type="email" 
    placeholder='Enter your email address'
    value={email}
    onChange={(e)=>setEmail(e.target.value)}
     />

<label >Password</label>
    <input type="password" 
    placeholder='Enter your password'
    value={password}
    onChange={(e)=>setPassword(e.target.value)}
     />


     <button disabled={isLoading}>Sign Up</button>
     {error && <div className='error'>{error}</div>}
   </form>

  )
}

export default Signup
