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
import PublicRoute from './components/common/PublicRoute';
import PrivateRoute from './components/common/PrivateRoute';
import 'antd/dist/antd.css';

function App() {
  let Sock = new Sockjs('http://localhost:8080/ws')
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route index path='/' element={<PublicRoute><Login /></PublicRoute>} />
          <Route path='/home' element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path='/chat' element={<PrivateRoute><Chat /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
