import { useEffect, useState } from 'react';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import Loader from '../components/Loader';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toastSuccess, toastWarn } from '../components/UI/Toast';
// import { toast } from 'react-toastify';
// import { toastError } from '../components/UI/Toast';
const ProfileScreen = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, user } = userDetails;
  console.log(userDetails);
  //we have to check that user is login
  // only logged in user can access this Screen

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  console.log(userLogin);

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;
  console.log(userUpdateProfile);
  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'));
      } else {
        console.log(user.name);
        setName(user.name);
        setEmail(user.email);
        console.log(user.email);
      }
    }
  }, [dispatch, navigate, user, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toastWarn('Both Password are not Match');
    } else {
      //DISPATCH UPDATE PROFILE
      dispatch(updateUserProfile({ _id: user._id, name, email, password }));
    }
  };
  return (
    <Row>
      <Col md={3}>
        <h1>User Profile</h1>
        {loading && <Loader />}
        {/* {success && toastSuccess('Successfully Update')} */}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              className='mb-2'
              type='text'
              value={name}
              placeholder='Enter Your Email'
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              className='mb-2'
              type='email'
              value={email}
              placeholder='Enter Your Email'
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              className='mb-2'
              type='password'
              value={password}
              placeholder='Enter Your Password'
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='confirmpassword'>
            <Form.Label>ReEnter Password</Form.Label>
            <Form.Control
              className='mb-2'
              type='password'
              value={confirmPassword}
              placeholder='ReEnter Password'
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button className='mt-2' type='submit' variant='light'>
            UPDATE
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Order</h2>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
