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
const App = () => {
  // console.log(history);
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <ToastContainer />
          <Routes>
            <Route path='/register' element={<RegisterScreen />} />
            <Route
              path='/login'
              element={<LoginScreen location={window.location} />}
            />
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
