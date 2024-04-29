
import './App.css';
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import Read from './Read';
import Update from './Update';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path='/home' element={<Home />} />
      <Route path='/read/:id' element={<Read />}></Route>
      <Route path='/edit/:id' element={<Update />}></Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
