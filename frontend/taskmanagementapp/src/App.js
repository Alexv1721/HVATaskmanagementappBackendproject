import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Tasks from './components/Tasks';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
  <Routes>

    <Route path='/' element={<Tasks/>}/>
        <Route path='/admin' element={<Tasks/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='register' element={<Register/>}/>
  </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
