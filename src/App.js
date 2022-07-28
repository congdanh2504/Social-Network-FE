import {
  DesktopOutlined,
  FileOutlined,
  HomeFilled,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux'
import { store } from './redux/store';
import Home from './pages/Home';
import Login from './pages/Login';
import './App.css'
import Chat from './pages/Chat';
import PublicRoute from './components/common/PublicRoute';
import PrivateRoute from './components/common/PrivateRoute';
import 'antd/dist/antd.css';
import SearchItem from './components/common/SearchItem';
import IconLogin from "./assets/images/ImageLogin.png";
import UserAccount from './components/common/userAccount';

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
  getItem('Team', '4', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '5', <FileOutlined />),
];
function App() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Provider store={store}>
      <Layout
        style={{
          minHeight: '100vh',
        }}
      >
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
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
            <div className='ml-[15px]'>
              <SearchItem />
            </div>
            <UserAccount/>
          </Header>
          <Content
            style={{
              margin: '0 16px',
            }}
          >
            <BrowserRouter>
              <Routes>
                <Route index path='/' element={<PublicRoute><Login /></PublicRoute>} />
                <Route path='/home' element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path='/chat' element={<PrivateRoute><Chat /></PrivateRoute>} />
              </Routes>
            </BrowserRouter>
          </Content>
        </Layout>
      </Layout>
    </Provider>
  );
}

export default App;

