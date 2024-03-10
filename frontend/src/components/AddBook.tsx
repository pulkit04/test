import { Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddBook = () => {
    const navigate = useNavigate()
    const [title, setTitle] = useState<string>('')
    const [url, setUrl] = useState<string>('')
    const [author, setAuthor] = useState<string>('')
    // const [publishedDate, setPublishedDate] = useState<Date>(new Date ())
    const [category, setCategory] = useState<string>('')


    // const onLoginClick = async () => {
    //     let result = await fetch('http://localhost:5000/login', {
    //         method: 'post',
    //         body: JSON.stringify({ email, password }),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //     result = await result.json()
    //     if (result.status === 400 || result.status === 403) {
    //         alert('Please enter correct credentials')
    //     } else {
    //     localStorage.setItem('user', JSON.stringify(result))
    //     navigate('/')
    //     }

    //     console.log("##result", result)
    // }

    // useEffect(() => {
    //     const auth = localStorage.getItem('user')
    //     if (auth) {
    //         navigate('/')
    //     }
    // }, [])

    const onAddClick = async () => {
        console.log("##", title, url, author, new Date(), category)
        const published_date = new Date().toString()
        let result = await fetch('http://localhost:5000/add-book', {
            method: 'post',
            body: JSON.stringify({ title, url, author, published_date, category }),
            headers: {
                'Content-Type': 'Application/json'
            }
        })
        result = await result.json()
        navigate('/')
        console.log("##result", result)
    }

    return (
        <div>
            <h1>Add Book</h1>
            <div>
            <TextField type='text' id="standard-email" label="Enter title" variant="standard" value={title} onChange={(e) => { setTitle(e.target.value) }} sx={{ marginBottom: 1 }} />
            </div>
            <div>
            <TextField type='text' id="standard-email" label="Enter url" variant="standard" value={url} onChange={(e) => { setUrl(e.target.value) }} sx={{ marginBottom: 1 }} />
            </div>
            <div>
            <TextField type='text' id="standard-email" label="Enter author" variant="standard" value={author} onChange={(e) => { setAuthor(e.target.value) }} sx={{ marginBottom: 1 }} />
            </div>
            <div>
            <TextField type='text' id="standard-email" label="Enter category" variant="standard" value={category} onChange={(e) => { setCategory(e.target.value) }} sx={{ marginBottom: 1 }} />
            </div>
            <div>
            <Button disabled={title === '' || url === '' || author === '' || category === ''} onClick={onAddClick} variant='contained'>Add</Button>
            </div>
            {/* <input type='text' placeholder='Enter title'
                value={title} onChange={(e) => { setTitle(e.target.value) }}
            ></input> */}
            {/* <input type='text' placeholder='Enter url'
                value={url} onChange={(e) => { setUrl(e.target.value) }}
            ></input> */}
            {/* <input type='text' placeholder='Enter author'
                value={author} onChange={(e) => { setAuthor(e.target.value) }}
            ></input> */}
            {/* <input type='date' placeholder='Enter published date'
               min="01-01-1997" max="31-12-2030" value={publishedDate.toDateString()} onChange={(e) => { setPublishedDate(new Date((e.target.value))) }}
            ></input> */}
            {/* <input type='text' placeholder='Enter Category'
                value={category} onChange={(e) => { setCategory(e.target.value) }}
            ></input> */}
            {/* <button disabled={title === '' || url === '' || author === '' || category === ''} onClick={onAddClick}>Add</button> */}
        </div>
    )
}

export default AddBook