
import { Route, Routes } from 'react-router-dom';
import './App.css';

import Header from './Header';
import Login from './Login';
import Register from './Register';

import Admins from './Admins';
import Buslistes from './Buslistes';
import Buslayout from './Buslayout';











function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path='/' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/buslist' element={<Buslistes></Buslistes>}></Route>
        <Route path='/admin' element={<Admins></Admins>}></Route>
        <Route path='/seat/:id' element={<Buslayout></Buslayout>}></Route>
       
      </Routes>

    </div>
  );
}

export default App;
