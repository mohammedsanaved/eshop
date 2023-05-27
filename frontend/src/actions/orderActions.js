import axios from 'axios';
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
} from '../constants/OrderConstants';
import { server } from '../App.jsx';
import { toastError } from '../components/UI/Toast';

export const createOrder = (order) => async (dispatch, getState) => {
  // console.warn(order);
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    // console.warn(userInfo);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    console.warn(config);
    const { data } = await axios.post(`${server}/api/orders`, order, config);
    // console.warn('api data', data);
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    toastError(error.response.data.message);
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
