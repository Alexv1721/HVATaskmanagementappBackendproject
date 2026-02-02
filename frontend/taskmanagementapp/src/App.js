import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Tasks from './components/Tasks';
import Login from './components/Login';
import Register from './components/Register';
import Admin from './/components/Admin'
import ProtectedRoute from './components/ProtectedRoute'
function App() {
  return (
    <BrowserRouter>
      <div className="App">
  <Routes>
  <Route path='/'element={<ProtectedRoute allowedRole="normal"><Tasks /></ProtectedRoute>}/>
    <Route path='/admin' element={<ProtectedRoute allowedRole="admin"><Admin /></ProtectedRoute>
          }/>
    <Route path='/login' element={<Login/>}/>
    <Route path='register' element={<Register/>}/>
  </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
