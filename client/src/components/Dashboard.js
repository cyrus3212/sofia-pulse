import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import '../App.css';

const Dashboard = () => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('Product')
  const [posts, setPosts] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const filters = ['Format', 'Product', 'Feature'];

  useEffect(() => {
    getBlogPost();
  }, []);

  const getBlogPost = () => {
    axios.get('/api').then((response) => {
      const data = response.data;
      setPosts(data);
    }).catch(() => {
      alert('Error retrieving data. Please refresh the page.');
    });
  }

  const submit = (event) => {
    event.preventDefault();
    setIsError(false);
    setIsSuccess(false);

    if (!name || !url) {
        setIsError(true);
        return;
    }

    const payload = { name, url, category };

    axios.post('/api/save', payload).then(() => {
      getBlogPost();
      setIsSuccess(true);
      setName('');
      setUrl('');
    }).catch(() => {});
  };

  const deleteSite = (id) => {
    axios.delete(`api/site/${id}`).then((res) => {
      getBlogPost();
      alert('Site deleted successfuly');
    }).catch(() => {});
  }

  const displayPosts = () => {

    if (!posts.length) return <tr><td>No Data</td><td></td></tr>;

    return posts.map((post, index) => (
      <tr key={index}>
        <td>{post.name}</td>
        <td>{post.url}</td>
        <td>{post.category || '-'}</td>
        <td><button onClick={() => deleteSite(post._id)}>Delete</button></td>
      </tr>
    ));
  };

  return(
    <div>
        <Sidebar />
        <div className="content">
            <h4 className="mb-3">ADD SITE</h4>
            <Form onSubmit={submit}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Control value={name}  placeholder="Enter Name..." name="name" onChange={e => setName(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Control value={url}  placeholder="Enter URL..." name="url" onChange={e => setUrl(e.target.value)}/>
                </Form.Group>
                <FloatingLabel controlId="category" label="Select Category">
                  <Form.Select className="mb-1" value={category} name="category" onChange={e => setCategory(e.target.value)} aria-label="Default select example">
                      { filters.map(filter => {
                          return <option name={filter} value={filter}>{filter}</option>
                        })
                      }
                    </Form.Select>
                </FloatingLabel>

                { isError && <div className="text-error">*Name and URL are required</div> }
                { isSuccess && <div className="text-success">Successfully added site.</div> }
                
                <Button className="mt-4" variant="primary" onClick={submit}>Add</Button>{' '}
            </Form>
            <div className="table-container">
                <table>
                    <thead>
                        <th>Name</th>
                        <th>Url</th>
                        <th>Category</th>
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