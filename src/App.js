import { BrowserRouter, Route, Routes } from 'react-router-dom';
import request from './service/request';

import { Provider } from 'react-redux'
import { store } from './redux/store';
import Sockjs from 'sockjs-client';
import { over } from 'stompjs'
import Home from './pages/Home';
import Login from './pages/Login';
import axios from 'axios';
import './App.css'
function App() {
  let Sock = new Sockjs('http://localhost:8080/ws')

  const data = {
    "username": "duong",
    "password": "123456",
  }
  const response = async () =>
    await axios({
      method: 'POST',
      url: 'http://localhost:8080/api/v1/users/login',
      headers: {
        "content-type": "application/json",
        'Access-Control-Allow-Origin': true
      },
      data: {
        username: "duong",
        password: "123456",
      }
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

  ;
  response()
  console.log(response())

  return (

    <BrowserRouter>
      <Routes>
        <Route index path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
