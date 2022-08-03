import {
  DesktopOutlined,
  FileOutlined,
  HomeFilled,
  TeamOutlined,
  UserOutlined,
  MessageOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux'
import { store } from './redux/store';
import Home from './pages/Home';
import Login from './pages/Login';
import Chat from './pages/Chat/Chat';
import PublicRoute from './components/common/PublicRoute';
import PrivateRoute from './components/common/PrivateRoute';
import SearchItem from './components/common/SearchItem';
import IconLogin from "./assets/images/ImageLogin.png";
import UserAccount from './components/common/userAccount';
import Profile from './pages/Profile';
import AuthProvider from './context/auth';
import 'antd/dist/antd.css';
import './App.css'
import MyProfile from './pages/MyProfile';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Home', '1', <HomeFilled />),
  getItem('Friend', '2', <UserOutlined />),
  getItem('Video', '3', <DesktopOutlined />),
  getItem('Messages', '4', <MessageOutlined />),
  getItem('Team', '5', <TeamOutlined />, [getItem('Team 1', '8'), getItem('Team 2', '9')]),
  getItem('Files', '6', <FileOutlined />),
];
function App() {

  return (
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/home' element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path='/chat' element={<PrivateRoute><Chat /></PrivateRoute>} />
            <Route path='/me' element={<PrivateRoute><MyProfile /></PrivateRoute>} />
            <Route path='/user/:username' element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route index path='/' element={<PublicRoute><Login /></PublicRoute>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  );
}

export default App;

