import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Manufacturer from './components/Manufacturer/Manufacturer';
import Transporter from './components/Transporter/Transporter';
import OrderManufacturer from './components/OrderManufacturer/OrderManufacturer';
import { ToastContainer } from 'react-toastify';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="">
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/manufacturer' element={<Manufacturer></Manufacturer>}></Route>
        <Route path='/transporter' element={<Transporter></Transporter>}></Route>
        <Route path='/orderManufacturer' element={<OrderManufacturer></OrderManufacturer>}></Route>
        <Route path='signup' element={<Signup></Signup>}></Route>
        <Route path='login' element={<Login></Login>}></Route>
      </Routes>
      <Footer></Footer>
      <ToastContainer />
    </div>
  );
}

export default App;
