import { Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Books = () => {

    const [books, setBooks] = useState<any>([])

    const getBooks = async () => {

        let result = await fetch('http://localhost:5000/books', {
            method: 'get',
        })
        result = await result.json()
        setBooks(result)
        console.log("##result", result)
    }

    useEffect(() => {
        getBooks()
    }, [])
    console.log("##books", books)

    const onDelete = async (id: string) => {
        console.log("##id", id)
        let result = await fetch(`http://localhost:5000/book/${id}`, {
            method: 'Delete',
        })
        result = await result.json()
        if (result) {
            getBooks()
        }
    }

    const onSearchChange = async (event: { target: { value: string } }) => {
        const key = event.target.value

        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`)
            result = await result.json()
            if (result) {
                setBooks(result)
            }

        } else {
            getBooks()
        }
    }

    return (
        <div>
            <h1> Books List</h1>
            <div>
                <span>
                <TextField type='search' id="standard-email" label="Search Book..." variant="outlined" onChange={onSearchChange} sx={{marginBottom: 2}}/>
                    {/* <input type='search' placeholder='Sarch book'
                        onChange={onSearchChange}></input> */}
                </span></div>

            <div style={{display: 'flex', alignItems: 'center', marginLeft:'180px'}} >
                <span style={{width:'180px'}}>title</span>
                <span style={{width:'180px'}}>url</span>
                <span style={{width:'180px'}}>author</span>
                <span style={{width:'180px'}}>published date</span>
                <span style={{width:'180px'}}>category</span>
                <span style={{width:'180px'}}>Delete</span>
            </div>
            {books.length > 0 ? books.map((b: {
                _id: string,
                title: String,
                url: String,
                author: String,
                published_date: Date,
                category: String,
            }) => {
                return (
                    <div style={{display: 'flex', alignItems: 'center', marginLeft:'180px'}}>
                        <span style={{width:'180px'}}> {b.title}</span>
                        <span style={{width:'180px'}}> {b.url}</span>
                        <span style={{width:'180px'}}> {b.author}</span>
                        {/* <span> {b.published_date ? b.published_date.toString() : ''}</span> */}
                        <span style={{width:'180px'}}> {b.category}</span>
                        <span style={{width:'180px'}}><button onClick={() => onDelete(b._id)}>Delete</button></span>
                        <span style={{width:'180px'}}><Link to={`/update/${b._id}`}><Button size='small' sx={{ marginTop: 0.5}} variant='contained'>Update</Button></Link></span>
                    </div>
                )

            }) : 'No Books found'}
        </div>
    )
}

export default Books