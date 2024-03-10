import { Button } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Nav = () => {
  const auth = localStorage.getItem('user')
  const navigate = useNavigate()
  const logout = () => {
    localStorage.clear()
    navigate('/signup')
  }

  return (
    <div>
     
        {auth ? <ul style={{display: 'flex', justifyContent: 'center'}}><><Link to='/'><Button variant='contained' sx={{margin: 1}}>Books</Button></Link></>
          <><Link to='/add'><Button variant='contained' sx={{margin: 1}}>Add Book</Button></Link></>
          {/* <><Link to='/update'><Button variant='contained' sx={{margin: 1}}>Update Book</Button></Link></> */}
          <><Link to='/profile'><Button variant='contained' sx={{margin: 1}}>Profile</Button></Link></>
          <><Link onClick={logout} to='/signup'><Button variant='contained' sx={{margin: 1}}>Logout ({JSON.parse(auth).name})</Button></Link></>
        </ul> : <div>
          <div><Link to='/signup'><Button variant='contained' sx={{ marginTop: 1}}>Sign Up</Button></Link></div>
          <div><Link to='/login'><Button variant='contained' sx={{ marginTop: 1}}>Login</Button></Link></div>
        </div>}
    </div>
  )
}

export default Nav