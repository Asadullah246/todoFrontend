import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Navbar from './Components/Navbar';
import RequireAuth from "./Components/RequireAuth"

function App() {
  return (
    <div className="App">
     <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<RequireAuth>
          <Home></Home>
        </RequireAuth>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
      </Routes>
     
    </div>
  );
}

export default App;
