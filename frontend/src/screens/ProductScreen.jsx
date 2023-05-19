import React from 'react';
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Rating from '../components/Rating';
import products from '../products';

const ProductScreen = () => {
  const { id } = useParams();
  console.log(id);

  const product = products.find((p) => p.id === +id);
  console.log(product);

  return (
    <>
      <Link to={'/'} className='btn btn-dark my-3'>
        Go Back
      </Link>
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
              <strong>Price:</strong> {product.price}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Rating:</strong>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Category:</strong> {product.category}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Description:</strong> {product.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
