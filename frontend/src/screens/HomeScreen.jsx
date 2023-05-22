import { useEffect } from 'react';
import Loader from '../components/Loader';
import { Bars } from 'react-loader-spinner';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Products';
import { listProducts } from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
('../actions/productActions.js');
import { toast } from 'react-toastify';
const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  console.log(productList);
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        toast.error(`${error}`, {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        })
      ) : (
        <Row>
          <h1>Latest Products</h1>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
