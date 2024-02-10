import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';
import {
  AUTH_SCREEN,
  FETCH_LOGIN,
  GET_USER_DATA,
  LOGOUT,
  GET_PRODUCT,
  ORDER_SCREEN,
  GET_SPESIFIC_PRODUCT_BUYER,
  GET_STATUS_ORDER_PRODUCT,
  GET_STATUS_ORDER,
  GET_ORDER,
  CLEAR_PRODUCT,
  CONNECTED,
  NOT_CONNECTED,
  TYPE_USER,
  CLEAR_CART,
  GET_CART,
} from '../types';
import {URL} from '../../Utils/Url';

import Toast from 'react-native-toast-message';

import moment from 'moment';

import NetInfo from '@react-native-community/netinfo';

import TouchID from 'react-native-touch-id';

import {Linking} from 'react-native';

export const authScreen = data => ({
  type: AUTH_SCREEN,
  payload: data,
});

export const orderScreen = data => ({
  type: ORDER_SCREEN,
  payload: data,
});

export const typeUser = data => ({
  type: TYPE_USER,
  payload: data,
});

export const fetchingLogin = data => {
  return async dispatch => {
    const {email, password} = data;
    await axios
      .post(URL + 'login', {
        email: email,
        password: password,
      })
      .then(res => {
        Toast.show({
          type: 'success',
          text1: 'Login Successful!',
        });
        dispatch({
          type: FETCH_LOGIN,
          payload: res.data.data,
          userData: res.data.data.user,
          accessToken: res.data.data.access_token,
          idUser: res.data.data.user.id,
        });
        dispatch({
          type: GET_USER_DATA,
          payload: res.data.data.user,
        });
        // dispatch(getUserData(res.data.data.access_token));
      })
      .catch(function (error) {
        console.log('error', error);
        Toast.show({
          type: 'error',
          text1: 'Email or Password wRong',
        });
      });
  };
};

export const fetchingRegister = (data, photo) => {
  return async dispatch => {
    const {name, email, password, password_confirmation} = data;
    RNFetchBlob.fetch(
      'POST',
      URL + 'register',
      {
        Authorization: 'Bearer access-token',
        otherHeader: 'foo',
        'Content-Type': 'multipart/form-data',
      },
      [
        {name: 'name', data: name},
        {name: 'email', data: email},
        {name: 'password', data: password},
        {name: 'password_confirmation', data: password_confirmation},
        photo
          ? {
              name: 'photo',
              filename: 'image.png',
              type: 'image/png',
              data: photo ? photo : '',
            }
          : {},
      ],
    )
      .then(res => {
        Toast.show({
          type: 'success',
          text1: 'Register Successful!',
        });
        dispatch(authScreen('Login'));
      })
      .catch(err => {
        console.log(err);
        Toast.show({
          type: 'error',
          text1: 'Something Went Wrong!!!',
        });
      });
  };
};

export const getUserData = AccessToken => {
  return async dispatch => {
    await axios
      .get(URL + 'user', {
        headers: {
          Authorization: `Bearer ${AccessToken}`,
        },
      })
      .then(res => {
        dispatch({
          type: GET_USER_DATA,
          payload: res.data.data,
        });
      });
  };
};

export const getProduct = search => {
  return async dispatch => {
    await axios
      .get(URL + 'products/', {
        params: {
          name: search,
        },
      })
      .then(res => {
        dispatch({
          type: GET_PRODUCT,
          payload: res.data.data.products,
        });
      });
  };
};

export const getCart = AccessToken => {
  return async dispatch => {
    await axios
      .get(URL + 'cart', {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${AccessToken}`,
        },
      })
      .then(res => {
        console.log('resCart', res);
        dispatch({
          type: GET_CART,
          payload: res.data.data,
        });
      });
  };
};

export const getSpesificProductBuyer = id => {
  return async dispatch => {
    await axios.get(URL + 'product/' + id).then(res => {
      dispatch({
        type: GET_SPESIFIC_PRODUCT_BUYER,
        payload: res.data.data.product,
      });
    });
  };
};

export const orderSuccess = (AccessToken, id) => {
  return async dispatch => {
    RNFetchBlob.fetch('POST', URL + 'user/success/' + id, {
      Authorization: `Bearer ${AccessToken}`,
      otherHeader: 'foo',
      'Content-Type': 'multipart/form-data',
    }).then(res => {
      console.log(res.data);
      if (res.data?.meta?.status === 'success') {
        Toast.show({
          type: 'success',
          text1: 'Order Arrived, Thanks For The Meal :)',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Uknokwn Error!!!',
        });
      }
    });
  };
};

export const goLogout = AccessToken => {
  return async dispatch => {
    Toast.show({
      type: 'success',
      text1: 'Success Logout!',
    });
    dispatch({
      type: LOGOUT,
    });
  };
};

export const AddToCart = async (data, productId, AccessToken) => {
  console.log('props', data, productId, AccessToken);
  try {
    const res = await axios.post(URL + `add/cart/${productId}`, data, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${AccessToken}`,
      },
    });
    console.log('res1', res?.data);
    return Promise.resolve(res?.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const RemoveToCart = async (data, productId, AccessToken) => {
  try {
    console.log('url', URL + `remove/cart/${productId}`);
    const res = await axios.post(URL + `remove/cart/${productId}`, data, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${AccessToken}`,
      },
    });
    console.log('res2', res?.data);

    return Promise.resolve(res?.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const buyProduct = (data, AccessToken) => {
  return async dispatch => {
    console.log('accsstoken', AccessToken);
    console.log('data', data);
    const res = await axios
      .post(URL + 'checkout', data, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${AccessToken}`,
        },
      })
      .then(() => {
        dispatch(clearCart());
        Toast.show({
          type: 'success',
          text1: 'Successfuly Order!',
        });
      });
    console.log('rssss', res?.data);
  };
};

export const clearProduct = () => {
  return async dispatch => {
    await dispatch({
      type: CLEAR_PRODUCT,
    });
  };
};

export const clearCart = () => ({
  type: CLEAR_CART,
});

export const saveAddress = address => {
  return async dispatch => {
    await dispatch({
      type: 'SAVE_ADDRESS',
      payload: address,
    });
  };
};

export const GetNumberCart = () => {
  return async dispatch => {
    await dispatch({
      type: 'GET_NUMBER_CART',
    });
  };
};

export const AddCart = product => {
  return async dispatch => {
    await dispatch({
      type: 'ADD_CART',
      payload: product,
    });
    Toast.show({
      type: 'success',
      text1: 'Success To Add Cart!',
    });
  };
};

export const UpdateCart = product => {
  return async dispatch => {
    await dispatch({
      type: 'UPDATE_CART',
      payload: product,
    });
  };
};

export const DeleteCart = product => {
  return async dispatch => {
    await dispatch({
      type: 'DELETE_CART',
      payload: product,
    });
  };
};

export const IncreaseQuantity = product => {
  return async dispatch => {
    await dispatch({
      type: 'INCREASE_QUANTITY',
      payload: product,
    });
  };
};

export const DecreaseQuantity = product => {
  return async dispatch => {
    await dispatch({
      type: 'DECREASE_QUANTITY',
      payload: product,
    });
  };
};

export const InputQuantity = (product, number) => {
  return async dispatch => {
    await dispatch({
      type: 'INPUT_QUANTITY',
      payload: product,
      number: number,
    });
  };
};

export const rupiah = number => {
  let reverse, thousand;
  if (typeof number === 'number') {
    reverse = number.toString().split('').reverse().join('');
    thousand = reverse.match(/\d{1,3}/g);
    thousand = thousand.join('.').split('').reverse().join('');
  } else if (typeof number === 'string') {
    reverse = number.split('').reverse().join('');
    thousand = reverse.match(/\d{1,3}/g);
    thousand = thousand.join('.').split('').reverse().join('');
  }
  return thousand;
};

export const timeDate = date => {
  const tDate = moment(date).format('Do MMMM hh:mm');
  return tDate;
};

export const getOrders = (AccessToken, userId) => {
  return async dispatch => {
    await axios
      .get(URL + 'orders', {
        headers: {
          Authorization: `Bearer ${AccessToken}`,
        },
      })
      .then(res => {
        dispatch({
          type: GET_ORDER,
          payload: res.data.data,
        });
        console.log('resorders', res?.data?.data);
      });
  };
};

export const SoldOrder = (AccessToken, id) => {
  return async () => {
    await axios
      .patch(
        URL + 'seller/order/' + id,
        {
          status: 'accepted',
        },
        {
          headers: {
            access_token: `${AccessToken}`,
          },
        },
      )
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Success Sold Order!',
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const declineOrder = (AccessToken, id) => {
  return async dispatch => {
    await axios
      .patch(
        URL + 'seller/order/' + id,
        {
          status: 'declined',
        },
        {
          headers: {
            access_token: `${AccessToken}`,
          },
        },
      )
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Success Decline Order!',
        });
      });
  };
};

export const getStatusOrder = AccessToken => {
  return async dispatch => {
    await axios
      .get(URL + 'buyer/order/', {
        headers: {
          access_token: `${AccessToken}`,
        },
      })
      .then(res => {
        dispatch({
          type: GET_STATUS_ORDER,
          payload: res.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const getStatusOrderProduct = (AccessToken, id) => {
  return async dispatch => {
    await axios
      .get(URL + 'buyer/order/' + id, {
        headers: {
          access_token: `${AccessToken}`,
        },
      })
      .then(res => {
        dispatch({
          type: GET_STATUS_ORDER_PRODUCT,
          payload: res.data,
        });
      })
      .catch(function () {
        dispatch({
          type: GET_STATUS_ORDER_PRODUCT,
          payload: null,
        });
      });
  };
};

export const connectionChecker = () => {
  return async dispatch => {
    try {
      NetInfo.addEventListener(state => {
        if (state.isConnected) {
          dispatch({
            type: CONNECTED,
          });
        } else {
          dispatch({
            type: NOT_CONNECTED,
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const goFingerprint = () => {
  const optionalConfigObject = {
    title: 'Authentication Required',
    color: '#e00606',
    unifiedErrors: false, // use unified error messages (default false)
    passcodeFallback: false,
  };
  return TouchID.authenticate(
    'Please scan your finger print to buy this product!',
    optionalConfigObject,
  ).catch(() => {
    Toast.show({
      type: 'error',
      text1: 'Failed to Authenticate!',
    });
  });
};

export const sendOnWhatsApp = url => {
  Linking.openURL(url)
    .then(() => {
      console.log('WhatsApp Opened');
    })
    .catch(() => {
      Toast.show({
        type: 'error',
        text1: 'Make sure Whatsapp installed on your device',
      });
    });
};
