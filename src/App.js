// import './App.css';
import * as React from 'react';
import {NavBar} from "./components/NavBar";
import Main from "./components/Main";
import InvoiceInfo from "./components/InvoiceInfo";
import {Routes,Route} from 'react-router-dom';
import {CapturePO_SOW} from './components/po_SOW_pages/CapturePO_SOW'
import Invoice from './components/invoice_pages/Invoice'
import api from './api/posts'
import { useState, useEffect } from 'react';

function App() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts');
        setPosts(response.data);
      } catch (err) {
        if (err.response) {
          // Not in the 200 response range 
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    }

    fetchPosts();
  }, [])

  return (
    <div className="App">
      <NavBar/>

      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/capture_new_SOW" element={<CapturePO_SOW editBtn={false} toggleState={false} />} />
        <Route path="/SOW_details/:id" element={<CapturePO_SOW editBtn={true} toggleState={false} />} />
        <Route path="/SOW_details/edit/:id" element={<CapturePO_SOW editBtn={true} toggleState={true} />} />
        <Route path="/invoice_details/:id" element={<Invoice/>}/>
        <Route path="/invoiceinfo" element={<InvoiceInfo/>} />
      </Routes>
    </div>
  );
}

export default App;
