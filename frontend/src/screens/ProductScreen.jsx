import { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '../components/Rating';
import { listProductsDetails } from '../actions/productActions';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
const ProductScreen = () => {
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  console.log(window);
  useEffect(() => {
    dispatch(listProductsDetails(id));
  }, [dispatch, id]);
  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  return (
    <>
      <Link to={'/'} className='btn btn-dark my-3'>
        Go Back
      </Link>
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
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <strong>Name:</strong> {product.name}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Price:</strong>
                {product.price}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Rating:</strong>
                <Rating value={product.rating} text={`${product.numReviews}`} />
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Category:</strong> {product.category}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Description:</strong> {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price: </Col>
                    <Col>
                      <strong>Rs. {product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status: </Col>
                    <Col>
                      {product.countInStock > 0 ? 'In Stock ' : 'OUT Stock '}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as='select'
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    onClick={addToCartHandler}
                    type='button'
                    className='btn btn-dark'
                    disabled={product.countInStock === 0}
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
