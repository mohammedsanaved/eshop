import { Col, Row, ListGroup, Image, Card } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { toastError, toastWarn } from '../components/UI/Toast';
import { getOrderDetails, payOrder } from '../actions/orderActions';
import { server } from '../App';
import { ORDER_PAY_RESET } from '../constants/OrderConstants';
import { PayPalButton } from 'react-paypal-button-v2';
// import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const OrderScreen = () => {
  const { id } = useParams();
  const [sdkReady, setSdkReady] = useState(false); // console.log(id);
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

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;
  console.log(orderPay);

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };
    // console.log(addDecimals);

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
    console.log(order.itemsPrice);
  }
  console.warn('first itemprice finded');
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get(`${server}/api/config/paypal`);
      console.log(clientId);
      const script = document.createElement('script');

      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(id));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, id, successPay, order]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(id, paymentResult));
    console.log(paymentResult);
  };
  return loading ? (
    <Loader />
  ) : error ? (
    toastError(error)
  ) : (
    <>
      {/* <PayPalScriptProvider> */}
      <h1>Order-Id {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping Details</h2>
              <p>
                <h5>
                  Name: <strong>{order.user.name}</strong>
                </h5>
                <h5>
                  Email: <strong>{order.user.email}</strong>
                </h5>
                <h5>Address: </h5>
                {order.shippingAddress.address},{order.shippingAddress.city},
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              <h6
                style={{
                  display: 'flex',
                  float: 'right',
                }}
              >
                {order.isDelivered === false ? (
                  <h6
                    style={{
                      color: 'red',
                      backgroundColor: 'yellow',
                      padding: '5px',
                    }}
                  >
                    Not Delivered Yet
                  </h6>
                ) : (
                  <h6
                    style={{
                      color: 'green',
                      backgroundColor: 'yellow',
                      padding: '5px',
                    }}
                  >
                    Delivered
                  </h6>
                )}
              </h6>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <h5>Method: </h5>
                {order.paymentMethod}
                <h6
                  style={{
                    display: 'flex',
                    float: 'right',
                  }}
                >
                  {order.isPaid === false ? (
                    <h6
                      style={{
                        color: 'red',
                        backgroundColor: 'yellow',
                        padding: '5px',
                      }}
                    >
                      Not Paid
                    </h6>
                  ) : (
                    <h6
                      style={{
                        color: 'green',
                        backgroundColor: 'yellow',
                        padding: '5px',
                      }}
                    >
                      Paid
                    </h6>
                  )}
                </h6>
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
                  {/* <Col>Sum of Items</Col> */}
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
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                    /* <PayPalButtons
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      /> */
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
      {/* </PayPalScriptProvider> */}
    </>
  );
};

export default OrderScreen;
