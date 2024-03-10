import { Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
    const navigate = useNavigate()
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const onSignUpClick = async () => {
        let result = await fetch('http://localhost:5000/register', {
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json()
        localStorage.setItem('user', JSON.stringify(result))
        navigate('/')
        console.log("##result", result)
    }

    useEffect(() => {
        const auth = localStorage.getItem('user')
        if (auth) {
            navigate('/')
        }
    }, [])

    return (
        <div>
            <h1>Register User</h1>
            <div>
                <TextField type='text' id="standard-email" label="Enter Name" variant="standard" value={name} onChange={(e) => { setName(e.target.value) }} sx={{marginTop: 3}}/>
            </div>
            <div>
                <TextField type='text' id="standard-email" label="Enter Email" variant="standard" value={email} onChange={(e) => { setEmail(e.target.value) }} sx={{marginTop: 3}}/>
            </div>
            <div>
                <TextField type='text' id="standard-email" label="Enter Password" variant="standard" value={password} onChange={(e) => { setPassword(e.target.value) }} sx={{marginTop: 3}}/>
            </div>
            <div>
                <Button onClick={onSignUpClick} size={'large'} variant='contained' sx={{marginTop: 10}}>SignUp</Button>
            </div>
            {/* <input type='text' placeholder='Enter Name'
                value={name} onChange={(e) => { setName(e.target.value) }}
            ></input> */}
            {/* <input type='text' placeholder='Enter Email'
                value={email} onChange={(e) => { setEmail(e.target.value) }}
            ></input> */}
            {/* <input type='password' placeholder='Enter Password'
                value={password} onChange={(e) => { setPassword(e.target.value) }}
            ></input> */}
            {/* <button onClick={onSignUpClick}>Sign Up</button> */}
        </div>
    )
}

export default SignUp