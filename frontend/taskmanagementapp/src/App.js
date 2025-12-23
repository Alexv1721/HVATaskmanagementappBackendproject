import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Tasks from './components/Tasks';
import Login from './components/Login';
import Register from './components/Register';
import Admin from './/components/Admin'
function App() {
  return (
    <BrowserRouter>
      <div className="App">
  <Routes>

    <Route path='/' element={<Tasks/>}/>
        <Route path='/admin' element={<Admin/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='register' element={<Register/>}/>
  </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
