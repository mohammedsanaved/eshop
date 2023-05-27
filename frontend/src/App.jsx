// import React from 'react';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import 'react-toastify/dist/ReactToastify.css';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductScreen from './screens/ProductScreen.jsx';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
const App = () => {
  // console.log(history);
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <ToastContainer />
          <Routes>
            <Route path='/placeorder' element={<PlaceOrderScreen />} />
            <Route path='/payment' element={<PaymentScreen />} />
            <Route path='/shipping' element={<ShippingScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/products/:id' element={<ProductScreen />} />
            <Route path='/cart/:id?' element={<CartScreen />} />
            <Route path='/' element={<HomeScreen />} exact />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export const server = 'http://localhost:5000';
export default App;
