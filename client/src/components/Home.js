import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import Sidebar from './Sidebar';

const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getBlogPost();
  }, []);


  const getBlogPost = () => {
    axios.get('/api')
      .then((response) => {
        const data = response.data;
        setPosts(data);
        console.log('Data has been received!!');
      })
      .catch(() => {
        alert('Error retrieving data. Please refresh page.');
      });
  }

  const displayPosts = (posts) => {

    if (!posts.length) return null;

    return posts.map((post, index) => {
        const url = post.url.replace('https:','');
        return (
            <div key={index} className="post__display">
              <iframe src={url} height="600" width="100%" title={post.name}></iframe>
              <h3>{post.name}</h3>
              <div className="post-overlay"></div>
              <a className="view-demo-button" href={post.url} target="_blank">View Demo</a>
            </div>
        )
    });
  };

  return(
   <div>
       <Sidebar isPublic={true}/>
       <div className="content">{displayPosts(posts)}</div>
   </div>
  );
}


export default App;