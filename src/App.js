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
function App() {
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
