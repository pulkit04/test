import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';


const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const onLoginClick = async () => {
        let result = await fetch('http://localhost:5000/login', {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json()
        if (result.status === 400 || result.status === 403) {
            alert('Please enter correct credentials')
        } else {
            localStorage.setItem('user', JSON.stringify(result))
            navigate('/')
        }

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
            <h1>Login</h1>
            <div>
                <TextField type='text' id="standard-email" label="Enter Email" variant="standard" value={email} onChange={(e) => { setEmail(e.target.value) }} sx={{marginTop: 3}}/>
            </div>
            {/* <input type='text' placeholder='Enter Email'
                value={email} onChange={(e) => { setEmail(e.target.value) }}
            ></input> */}
            <div>
                <TextField type='password' id="standard-password" label="Enter Password" variant="standard" value={password} onChange={(e) => { setPassword(e.target.value) }} sx={{marginTop: 3}}/>
            </div>
            {/* <input type='password' placeholder='Enter Password'
                value={password} onChange={(e) => { setPassword(e.target.value) }}
            ></input> */}
            <div>
                <Button onClick={onLoginClick} size={'large'} variant='contained' sx={{marginTop: 10}}>Login</Button>
            </div>
            {/* <button onClick={onLoginClick}>Login</button> */}
        </div>
    )
}

export default Login