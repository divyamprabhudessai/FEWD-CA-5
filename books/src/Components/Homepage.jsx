import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'
import {Link, Route,Routes} from 'react-router-dom'

import Form from './Form';


function Homepage() {
  const [myData, setMyData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    axios.get("https://reactnd-books-api.udacity.com/books", {
      headers: {
        'Authorization': 'authorization'
      }
    })
      .then(res => {
        const bookData = res.data
        console.log(bookData)
        setMyData(bookData.books)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const filteredBooks = myData.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <nav>
        <h1 id='title'>Kalvium Books</h1>
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='searchba'
        />
        <Link to= "/form"><button id='register' >Register</button></Link>
        
      </nav>
      <div className='books'>
        {filteredBooks.map((book) => (
          <div key={book.id} className='onebook'>
            <img src={book.imageLinks.smallThumbnail} alt="" />
            <h3 className='booktit'>{book.title}</h3>
            {/* <p>{book.authors.map((authors)=> <div>{authors}</div>)}</p> */}
            <div className='bottom'>
            <p>{book.averageRating || 4}⭐</p>
            <p>Free</p>
            </div>
          </div>
        ))}
      </div>

     
    </>
  );    
}

export default Homepage;
