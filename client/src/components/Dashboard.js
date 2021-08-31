import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import logo from '../images/logo.png'
import Sidebar from './Sidebar';

const Dashboard = () => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
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
        alert('Error retrieving data. Please refresh the page.');
      });
  }

  const submit = (event) => {
    event.preventDefault();

    const payload = {
      name: name,
      url: url
    };

    axios({
      url: '/api/save',
      method: 'POST',
      data: payload
    })
      .then(() => {
        console.log('Data has been sent to the server');
        setName('');
        setUrl('');
      })
      .catch(() => {
        console.log('Internal server error');
      });;
  };

  const displayPosts = () => {

    if (!posts.length) return <tr><td>No Data</td><td></td></tr>;

    return posts.map((post, index) => (
      <tr key={index}>
        <td>{post.name}</td>
        <td>{post.url}</td>
        <td><button>Delete</button></td>
      </tr>
    ));
  };

  return(
    <div>
        <Sidebar />
        <div className="content">
            <h2>Add Site</h2>
            <form onSubmit={submit}>
                <div className="form-input">
                <input 
                    type="text"
                    name="name"
                    placeholder="Enter Name..."
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                </div>
                <div className="form-input">
                <input
                    placeholder="Enter URL..."
                    name="url"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                />
                </div>

                <button>Add</button>
            </form>
            <div className="table-container">
                <table>
                    <thead>
                        <th>Name</th>
                        <th>Url</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                    {displayPosts()}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
}


export default Dashboard;