import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import Sidebar from './Sidebar';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState('All');
  const [postsOriginal, setPostsOriginal] = useState([]);
  const filters = ['All', 'Format', 'Product', 'Feature'];

  useEffect(() => {
    getBlogPost();
  }, []);

  const getBlogPost = () => {
    axios.get('/api')
      .then((response) => {
        const data = response.data;
        setPosts(data);
        setPostsOriginal(data);
      })
      .catch(() => {
        alert('Error retrieving data. Please refresh page.');
      });
  }

  const onChangeFilter = (e) => {
    setFilter(e);

    if (e !== 'All') {
      const filteredPosts = postsOriginal.filter(post => post.category === e);
      setPosts(filteredPosts);
    } else {
      setPosts(postsOriginal);
    }
  }

  const displayPosts = () => {

    if (!posts.length) return null;

    return posts.map((post, index) => {
        const url = post.url.replace('https:','') || post.url.replace('http:','');
        return (
            <div key={index} className="post__display">
              <iframe src={url} height="200px" width="100%" title={post.name}></iframe>
              <h5>{post.name}</h5>
              <div className="post-overlay"></div>
              <a className="view-demo-button" href={post.url} target="_blank">View Demo</a>
            </div>
        )
    });
  };

  return(
   <div>
       <Sidebar filter={filter} filters={filters} isPublic={true} onFliter={(event) => onChangeFilter(event)}/>
       <div className="content">{displayPosts()}</div>
   </div>
  );
}


export default App;