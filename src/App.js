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
import Chat from './pages/Chat';
import PublicRoute from './components/common/PublicRoute';
import PrivateRoute from './components/common/PrivateRoute';
import SearchItem from './components/common/SearchItem';
import IconLogin from "./assets/images/ImageLogin.png";
import UserAccount from './components/common/userAccount';
import Profile from './pages/Profile';
import 'antd/dist/antd.css';
import './App.css'

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
          <BrowserRouter>
            <Layout
              style={{
                minHeight: '100vh',
              }}
            >
              <Sider collapsible /* collapsed={collapsed} */ /* onCollapse={(value) => setCollapsed(value)} */>
                <div className='w-full h-[60px] flex justify-center items-center p-0 m-0'><img className='w-[40px] h-[40px]' src={IconLogin} /></div>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
              </Sider>
              <Layout className="site-layout">
                <Header
                  className="site-layout-background flex items-center justify-between"
                  style={{
                    padding: 0,
                  }}
                >
                  <div className='ml-[15  px]'>
                    <SearchItem />
                  </div>
                  <UserAccount />
                </Header>
                <Content
                  style={{
                    margin: '0 0',
                  }}
                > <Routes>
                    <Route path='/home' element={<PrivateRoute><Home /></PrivateRoute>} />
                    <Route path='/chat' element={<PrivateRoute><Chat /></PrivateRoute>} />
                    <Route path='/profile' element={<PrivateRoute><Profile/></PrivateRoute>} />
                    <Route index path='/' element={<PublicRoute><Login /></PublicRoute>} />
                  </Routes>
                </Content>
              </Layout>
            </Layout>
          </BrowserRouter>
    </Provider>
  );
}

export default App;

