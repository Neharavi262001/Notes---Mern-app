import React from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'


const Navbar = () => {

   const {logout}=useLogout()
   const {user}=useAuthContext()
    

    const handleClick=()=>{
        logout()

    }
  return (
    <header>
        <div className='navbar'>
       
            <Link to='/'>
                <h2>Notes</h2>
            </Link>
            <nav>
                {user && (
                    <div>
                    <span>{user.email}</span>
                    <button className='button' onClick={handleClick}>Logout</button>
                    </div>

                )}

                {!user && (
                   
                   <div>
                   <Link to='/login'>Login </Link>
                   <Link to='/signup'>Signup</Link>
                   </div>
                )}
                

                
               
              
           
            </nav>
     
        </div>

    </header>
   
  )
}

export default Navbar
