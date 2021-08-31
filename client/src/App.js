import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';

const App = () => {
  // const [name, setName] = useState('');
  // const [url, setUrl] = useState('');
  // const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   getBlogPost();
  // }, []);


  // const getBlogPost = () => {
  //   axios.get('/api')
  //     .then((response) => {
  //       const data = response.data;
  //       setPosts(data);
  //       console.log('Data has been received!!');
  //     })
  //     .catch(() => {
  //       alert('Error retrieving data!!!');
  //     });
  // }

  // const submit = (event) => {
  //   event.preventDefault();

  //   const payload = {
  //     name: name,
  //     url: url
  //   };

  //   axios({
  //     url: '/api/save',
  //     method: 'POST',
  //     data: payload
  //   })
  //     .then(() => {
  //       console.log('Data has been sent to the server');
  //       setName('');
  //       setUrl('');
  //       getBlogPost();
  //     })
  //     .catch(() => {
  //       console.log('Internal server error');
  //     });;
  // };

  // const displayPosts = (posts) => {

  //   if (!posts.length) return null;

  //   return posts.map((post, index) => (
  //     <div key={index} className="blog-post__display">
  //       <iframe src={post.url} height="600" width="300" title={post.name}></iframe>
  //       <h3>{post.name}</h3>
  //     </div>
  //   ));
  // };

  return(
    // <div className="app">
    //   <h2>Sofia Pulse</h2>
    //   <form onSubmit={submit}>
    //     <div className="form-input">
    //       <input 
    //         type="text"
    //         name="name"
    //         placeholder="name"
    //         value={name}
    //         onChange={e => setName(e.target.value)}
    //       />
    //     </div>
    //     <div className="form-input">
    //       <input
    //         placeholder="url"
    //         name="url"
    //         value={url}
    //         onChange={e => setUrl(e.target.value)}
    //       />
            
    //     </div>

    //     <button>Submit</button>
    //   </form>

    //   <div className="blog-">
    //     {displayPosts(posts)}
    //   </div>
    // </div>
    <Router>
      <div>
        <Switch>
          <Route component={Home} path="/" exact/>
          <Route component={Dashboard} path="/dashboard" />
        </Switch>
      </div>
    </Router>
  );
}


export default App;