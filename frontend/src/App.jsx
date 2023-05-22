// import React from 'react';
import { Container, ToastContainer } from 'react-bootstrap';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductScreen from './screens/ProductScreen.jsx';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='/products/:id' element={<ProductScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export const server = 'http://localhost:5000';
export default App;
