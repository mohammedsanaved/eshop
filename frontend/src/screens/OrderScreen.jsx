import { Col, Row, ListGroup, Image, Card } from 'react-bootstrap';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { toastError, toastWarn } from '../components/UI/Toast';
import { getOrderDetails } from '../actions/orderActions';

const OrderScreen = () => {
  const { id } = useParams();
  //   const navigate = useNavigate();
  //   const cart = useSelector((state) => state.cart);

  //   if (!cart.shippingAddress.address) {
  //     navigate('/shipping');
  //   } else if (!cart.paymentMethod) {
  //     navigate('/payment');
  //   }

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails; // Add default empty object if OrderCreate is undefined
  console.log(orderDetails);
  console.log(order);

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);
  return loading ? (
    <Loader />
  ) : error ? (
    toastError(error)
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Order</h2>
              <p>
                <h5>Address: </h5>
                {order.shippingAddress.address},{order.shippingAddress.city},
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <h5>Method: </h5>
                {order.paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              <p>
                {order.orderItems.length === 0 ? (
                  toastWarn('Order is Empty')
                ) : (
                  <ListGroup variant='flush'>
                    {order.orderItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md='1'>
                            <Image src={item.image} alt={item.name} fluid />
                          </Col>
                          <Col>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x ${item.price} = $
                            {item.qty * item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
