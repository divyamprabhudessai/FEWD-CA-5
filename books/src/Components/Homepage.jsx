import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'
import { Link } from 'react-router-dom';

import Form from './Form';

function Homepage() {
  // State variables
  const [myData, setMyData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch data from the API when the component mounts
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

  // Filter books based on the search query
  const filteredBooks = myData.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Navigation */}
      <nav>
        <h1 id='title'>Kalvium Books</h1>
        {/* Search input */}
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='searchba'
        />
        {/* Link to the registration form */}
        <Link to="/form"><button id='register'>Register</button></Link>
      </nav>

      {/* Display filtered books */}
      <div className='books'>
        {filteredBooks.map((book) => (
          <div key={book.id} className='onebook'>
            <img src={book.imageLinks.smallThumbnail} alt="" />
            <h3 className='booktit'>{book.title}</h3>
            {/* Display average rating or default to 4 stars */}
            <div className='bottom'>
              <p>{book.averageRating || 4}⭐</p>
              <p>Free</p>
            </div>
          </div>
        ))}
      </div>

      {/* Extra area */}
      <div className='extraArea'>
        {/* You can add content or components here if needed */}
      </div>
    </>
  );
}

export default Homepage;
