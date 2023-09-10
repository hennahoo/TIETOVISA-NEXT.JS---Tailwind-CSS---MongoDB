import React, { useState, useEffect } from 'react';

import Header from '../components/Header';

function Posts() {

const [posts, setPosts] = useState([]);

useEffect(() => {

fetch('https://jsonplaceholder.typicode.com/posts')

.then(response => response.json())

.then(data => setPosts(data))

.catch(error => console.error('Virhe:', error));

}, []);

return (

  <div>

    <Header />

    <h2>Blogipostaukset</h2>

    <ul>

    {posts.map(post => (

    <li key={post.id}>{post.title}</li>

    ))}

    </ul>

  </div>

);

}

export default Posts;