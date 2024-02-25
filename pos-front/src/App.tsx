import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import Home from './components/Home';
import Customer from './components/Customer';
import Product from './components/Product';
import Order from './components/Order';
import Login from './components/Login';
import Signup from './components/Signup';
import Calculator from './components/Calculator';

function App() {

  return (
      <Router>
        <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <div className="navbar-brand">
              <img src="https://st3.depositphotos.com/13360910/32431/v/450/depositphotos_324318086-stock-illustration-creative-initial-ss-letter-s.jpg" alt="SSAcademy" className='logo'/>
            </div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to='/'>Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to='/customer'>Customers</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to='/product'>Products</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to='/order'>Order Management</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to='/login'>Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to='/calc'>Calculator</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/customer' element={<Customer />}></Route>
            <Route path='/product' element={<Product />}></Route>
            <Route path='/order' element={<Order />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/calc' element={<Calculator />}></Route>
          </Routes>
          
        </div>
      </Router>
  )
}

export default App
