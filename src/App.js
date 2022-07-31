import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux'
import { store } from './redux/store';
import Home from './pages/Home';
import Login from './pages/Login';
import Chat from './pages/Chat';
import PublicRoute from './components/common/PublicRoute';
import PrivateRoute from './components/common/PrivateRoute';
import 'antd/dist/antd.css';
import Profile from './pages/Profile';

function App() {
  
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route index path='/' element={<PublicRoute><Login /></PublicRoute>} />
          <Route path='/home' element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path='/chat' element={<PrivateRoute><Chat /></PrivateRoute>} />
          <Route path='/user/:username' element={<PrivateRoute><Profile /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

