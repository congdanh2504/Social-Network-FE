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
import Chat from './pages/Chat';
function App() {
  let Sock = new Sockjs('http://localhost:8080/ws')
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route index path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/chat' element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
