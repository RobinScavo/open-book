import React from 'react';

import { Link } from 'react-router-dom';

import './notFound.css';

const NotFound = () => {
    return (
        <div className="not-found">
            <h2>Sorry</h2>
            <p>That page cannot be found</p>
            <Link to='/decks' className='btn'>Home</Link>
        </div>
     );
}

export default NotFound;
