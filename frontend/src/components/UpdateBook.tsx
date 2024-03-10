import { Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateBook = () => {
    const navigate = useNavigate()
    const [title, setTitle] = useState<string>('')
    const [url, setUrl] = useState<string>('')
    const [author, setAuthor] = useState<string>('')
    const [category, setCategory] = useState<string>('')
    const params = useParams()

    const getBookDetails = async () => {
        const result = await fetch(`http://localhost:5000/book/${params.id}`, {
            method: 'get',
        })
        const updatedResult: {  
            title: string,
            url: string,
            author: string,
            category: string, } = await result.json()

        if (updatedResult) {
            setTitle(updatedResult.title)
            setUrl(updatedResult.url)
            setAuthor(updatedResult.author)
            setCategory(updatedResult.category)
        }
    }

    useEffect(() => {
        getBookDetails()
    }, [])



    const onUpdateClick = async () => {
        let result = await fetch(`http://localhost:5000/book/${params.id}`, {
            method: 'Put',
            body: JSON.stringify({ title, url, author, category }),
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
            <h1>Update Book</h1>
            <div>
            <TextField type='text' id="standard-title" label="Enter title" variant="standard" value={title} onChange={(e) => { setTitle(e.target.value) }} sx={{ marginBottom: 1 }} />
            </div>
            <div>
            <TextField type='text' id="standard-title" label="Enter url" variant="standard" value={url} onChange={(e) => { setUrl(e.target.value) }} sx={{ marginBottom: 1 }} />
            </div>
            <div>
            <TextField type='text' id="standard-title" label="Enter author" variant="standard" value={author} onChange={(e) => { setAuthor(e.target.value) }} sx={{ marginBottom: 1 }} />
            </div>
            <div>
            <TextField type='text' id="standard-title" label="Enter category" variant="standard" value={category} onChange={(e) => { setCategory(e.target.value) }} sx={{ marginBottom: 1 }} />
            </div>
            <div>
            <Button disabled={title === '' || url === '' || author === '' || category === ''} onClick={onUpdateClick} variant='contained'>Update</Button>

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
            {/* <input type='text' placeholder='Enter Category'
                value={category} onChange={(e) => { setCategory(e.target.value) }}
            ></input> */}
            {/* <button onClick={onUpdateClick}>Update</button> */}
        </div>
    )
}

export default UpdateBook