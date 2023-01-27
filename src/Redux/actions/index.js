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
  TRANSACTION_SCREEN,
  CLEAR_CART,
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
        console.log(res.data)
        Toast.show({
          type: 'success',
          text1: 'Login Successful!',
        });
        dispatch({
          type: FETCH_LOGIN,
          payload: res.data.data,
          userData : res.data.data.user,
          accessToken:res.data.data.access_token,
          idUser : res.data.data.user.id
        });
        dispatch(getUserData(res.data.data.access_token));
      })
      .catch(function (error) {
          Toast.show({
            type: 'error',
            text1: 'Email or Password wRong',
          });
      });
  };
};

export const fetchingRegister = (data,photo) => {
    return async dispatch => {
      const {name, email, password, password_confirmation} = data;
      RNFetchBlob.fetch('POST', URL+'register', {
          Authorization: "Bearer access-token",
          otherHeader: "foo",
          'Content-Type': 'multipart/form-data',
      }, [
          {name:'name',data:name},
          {name:'email',data:email},
          {name:'password',data:password},
          {name:'password_confirmation',data:password_confirmation},
          {name: 'photo', filename: 'image.png', type: 'image/png', data: photo?photo:"" },
          ]).then((resp) => {
            Toast.show({
              type: 'success',
              text1: 'Register Successful!',
            });
            dispatch(authScreen('Login'));
          }).catch(err=>{
            console.log(err)
            Toast.show({
                type: 'error',
                text1: 'Something Went Wrong!!!',
            });
      })
  };
};

export const getUserData = (AccessToken) => {
  return async dispatch => {
    await axios
      .get(URL + 'user',{
        headers: {
          "Authorization": `Bearer ${AccessToken}`
        }, 
      })
      .then(res => {
        dispatch({
          type: GET_USER_DATA,
          payload: res.data.data,
        });
      })
  };
};

export const getProduct = (search) => {
  return async dispatch => {
      await axios
      .get(URL + 'products/',{
        params:{
          name:search
        }
      })
      .then(res => {
        dispatch({
          type: GET_PRODUCT,
          payload: res.data.data.products,
        });
      })
  };
};

export const getSpesificProductBuyer = (id) => {
  return async dispatch => {
      await axios
      .get(URL + 'product/'+id)
      .then(res => {
        dispatch({
          type: GET_SPESIFIC_PRODUCT_BUYER,
          payload: res.data.data.product,
        });
      })
  };
};

export const orderSuccess = (AccessToken,id) => {
  return async dispatch => {
    console.log(AccessToken)
    RNFetchBlob.fetch('POST', URL+'user/success/'+id, {
          Authorization: `Bearer ${AccessToken}`,
          otherHeader: "foo",
          'Content-Type': 'multipart/form-data',
      })
      .then(res => {
        console.log(res.data)
        if(res.data?.meta?.status=='success'){
          Toast.show({
            type: 'success',
            text1: 'Order Arrived, Thanks For The Meal :)',
          });
        }else{
          Toast.show({
            type: 'error',
            text1: 'Uknokwn Error!!!',
          });
        }
      })
  }
};

export const goLogout = (AccessToken) => {
  return async dispatch => {
    await axios
      .post(URL + 'logout',{},{
        headers: {
          Accept: 'application/json',
          "Authorization": `Bearer ${AccessToken}`
        },
      })
      .then(res => {
        Toast.show({
          type: 'success',
          text1: 'Success Logout!',
        });
        dispatch({
            type: LOGOUT,
        });
      })
  }
};

export const buyProduct = (data,AccessToken) => {
  return async dispatch => {
    await axios
      .post(URL + 'checkout',data,{
        headers: {
          Accept: 'application/json',
          "Authorization": `Bearer ${AccessToken}`
        },
      })
      .then(res => {
        dispatch(clearCart())
        Toast.show({
          type: 'success',
          text1: 'Successfuly Order!',
        });
      })

  };
};


export const clearProduct = () => {
  return async dispatch => {
    await dispatch({
      type: CLEAR_PRODUCT,
    })
}};

export const clearCart = () => ({
  type: CLEAR_CART,
});


export const saveAddress = (address) =>{
  return async dispatch => {
    await dispatch( {
        type:"SAVE_ADDRESS",
        payload:address
    })
}}

export const GetNumberCart = (product) =>{
  return async dispatch => {
    await dispatch( {
        type:"GET_NUMBER_CART",
        payload:product
    })
}}

export const AddCart = (product) =>{
  return async dispatch => {
    await dispatch( {
        type:"ADD_CART",
        payload:product
    })
    Toast.show({
      type: 'success',
      text1: 'Success To Add Cart!',
    });
}}

export const UpdateCart = (product) =>{
  return async dispatch => {
    await dispatch( {
        type:"UPDATE_CART",
        payload:product
    })
}}

export const DeleteCart = (product) =>{
  return async dispatch => {
    await dispatch( {
        type:"DELETE_CART",
        payload:product
    })
}}

export const IncreaseQuantity = (product) =>{
  return async dispatch => {
    await dispatch( {
        type:"INCREASE_QUANTITY",
        payload:product
    })
}}
export const DecreaseQuantity = (product) =>{
  return async dispatch => {
    await dispatch( {
        type:"DECREASE_QUANTITY",
        payload:product
    })
}}

export const InputQuantity = (product,number) =>{
  return async dispatch => {
    await dispatch( {
        type:"INPUT_QUANTITY",
        payload:product,
        number:number
    })
}}

export const rupiah = number => {
  let reverse,thousand ;
  if(typeof number =="number"){
    reverse =  number.toString().split('').reverse().join('')
     thousand = reverse.match(/\d{1,3}/g);
     thousand = thousand.join('.').split('').reverse().join('');
  }else if(typeof number =="string"){
    reverse =  number.split('').reverse().join('')
     thousand = reverse.match(/\d{1,3}/g);
     thousand = thousand.join('.').split('').reverse().join('');
  }
  
  return thousand;
};

export const timeDate = date => {
  const tDate = moment(date).format('Do MMMM hh:mm');
  return tDate;
};

export const getOrders = (AccessToken,userId) =>{
  return async dispatch =>{
    await axios
      .get(URL + 'orders?user_id='+userId,{
        headers: {
          "Authorization": `Bearer ${AccessToken}`
        }, 
      })
      .then(res => {
        dispatch({
          type: GET_ORDER,
          payload: res.data.data.orders,
        });
      })
  }
}

export const doneOrder = (id) => {
  return async dispatch => {
    var APIURL = url+"/seller/order.php?method=post&done";
      var headers = {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json'
      };
      var Data ={
          id_order:id
      };
      await fetch(APIURL,{
          method: 'POST',
          headers: headers,
          body: JSON.stringify(Data)
      })
      .then((Response)=>Response.json())
      .then((Response)=>{
          if (Response.message == "Success") { 
              Toast.show({
                type: 'success',
                text1: 'Successful Confirm Orders Done!',
              });
          }
      })
  };
};

export const inputReceipt = (id,no_resi) => {
  return async dispatch => {
    var APIURL = url+"/seller/order.php?method=post&uploadReceipt";
      var headers = {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json'
      };
      var Data ={
          id_order:id,
          no_resi:no_resi
      };
      await fetch(APIURL,{
          method: 'POST',
          headers: headers,
          body: JSON.stringify(Data)
      })
      .then((Response)=>Response.json())
      .then((Response)=>{
          if (Response.message == "Success") { 
              Toast.show({
                type: 'success',
                text1: 'Successful Upload Delivery Receipt!',
              });
          }
      })
  };
};

export const SoldOrder = (AccessToken, id) => {
  return async dispatch => {
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
      .then(res => {
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
      .then(res => {
        Toast.show({
          type: 'success',
          text1: 'Success Decline Order!',
        });
      })
      .catch(function (error) {
        console.log(error);
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
        // Toast.show({
        //   type: 'success',
        //   text1: 'You already ordered this product',
        // });
      })
      .catch(function (error) {
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
          Toast.show({
            type: 'error',
            text1: 'Not Connected!',
          });
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
  ).catch(error => {
    Toast.show({
      type: 'error',
      text1: 'Failed to Authenticate!',
    });
  });
};


export const sendOnWhatsApp = url => {
  Linking.openURL(url)
    .then(data => {
      console.log('WhatsApp Opened');
    })
    .catch(() => {
      Toast.show({
        type: 'error',
        text1: 'Make sure Whatsapp installed on your device',
      });
    });
};


