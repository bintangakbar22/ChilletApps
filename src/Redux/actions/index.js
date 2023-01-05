import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';
import {
  AUTH_SCREEN,
  FETCH_LOGIN,
  GET_USER_DATA,
  UPDATE_USER_DATA,
  LOGOUT,
  GET_BANNER,
  GET_PRODUCT,
  GET_PRODUCT_SELLER,
  DAFTARJUAL_SCREEN,
  GET_WISHLIST_SELLER,
  GET_NOTIFICATION_BUYER,
  GET_NOTIFICATION_SELLER,
  NOTIFICATION_SCREEN,
  GET_CATEGORY,
  GET_SPESIFIC_PRODUCT,
  GET_WISHLIST_SPESIFIC,
  GET_SPESIFIC_PRODUCT_BUYER,
  GET_STATUS_ORDER_PRODUCT,
  GET_STATUS_ORDER,
  GET_ORDER,
  GET_DETAIL_NOTIFICATION,
  GET_SOLD_SELLER,
  CLEAR_PRODUCT,
  ADD_WISHLIST,
  CONNECTED,
  NOT_CONNECTED,
  GET_WISHLIST,
  GET_HISTORY,
  GET_HISTORY_PRODUCT,
  GET_CART,
  TYPE_USER,
  TRANSACTION_SCREEN,
  GET_ORDER_BUYER,
  GET_ORDER_BUYER_PENDING,
  GET_ORDER_SELLER_PENDING,
  GET_ORDER_BUYER_PENDING_SPECIFIC,
  GET_ORDER_SELLER_PENDING_SPECIFIC,
  GET_ORDER_BUYER_INDELIVERY,
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

export const typeUser = data => ({
  type: TYPE_USER,
  payload: data,
});

export const fetchingLogin = data => {
  return async dispatch => {
    const {email, password} = data;
    if((email.length==0) || (password.length==0)){
            SimpleToast.show("Required Field is Missing!");
    }else{
        var APIURL = url+"/auth/login.php";
        var headers = {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        };
        var Data ={
            email: email,
            password: password
        };
        await fetch(APIURL,{
            method: 'POST',
            headers: headers,
            body: JSON.stringify(Data)
        })
        .then((Response)=>Response.json())
        .then((Response)=>{
            if (Response.message == "Success") { 
              console.log("login user s:",Response.data)
                Toast.show({
                  type: 'success',
                  text1: 'Login Successful!',
                });
                dispatch({
                  type: FETCH_LOGIN,
                  payload: Response.data,
                });
            }else if (Response.message == "email or password are wrong") { 
                Toast.show({
                  type: 'error',
                  text1: 'Email or Password Missmatch!',
                });
            }else{
                Toast.show({
                  type: 'error',
                  text1: 'Email or Password Missmatch!',
                });
            }
        })
      }
  };
};

export const fetchingRegister = data => {
    return async dispatch => {
      const {name, email, password, phone, address, city} = data;
      var APIURL = url+"/auth/register.php";
      var headers = {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json'
      };
      var Data ={
          full_name: name,
          email: email,
          password: password,
          phone_number: parseInt(phone),
          address: address,
          city: city,
      };
      await fetch(APIURL,{
          method: 'POST',
          headers: headers,
          body: JSON.stringify(Data)
      })
      .then((Response)=>Response.json())
      .then((Response)=>{
          if (Response.message == "Success") { 
              dispatch(authScreen('Login'));
              Toast.show({
                type: 'success',
                text1: 'Register Successful!',
              });
          }else{
              Toast.show({
                type: 'error',
                text1: 'Email already exists!',
              });
          }
      })
  };
};

export const getUserData = id => {
    return async dispatch => {
      var APIURL = url+"/auth/user.php?method=get&id="+id;
      var headers = {
          'Accept' : '*/*',
      };
      await fetch(APIURL,{
          method: 'GET',
          headers: headers,
      })
      .then((Response)=>Response.json())
      .then((Response)=>{
          if (Response.message == "Success") { 
              dispatch({
                type: GET_USER_DATA,
                payload: Response.data,
              });
          }
      })
  };
};

export const updateUserData = (data, id) => {
  return async dispatch => {
    const { name, email, phone, address, city} = data;
    var APIURL = url+"/auth/user.php?method=update";
        var headers = {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        };
        var Data ={
            id_user:id,
            full_name:name,
            email: email,
            phone_number:phone,
            address:address,
            city:city
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
                  text1: 'Update Account Successful!',
                });
                dispatch({
                  type: UPDATE_USER_DATA,
                  payload: Response.data,
                });
            }else if (Response.message == "Email already exists") { 
                Toast.show({
                  type: 'error',
                  text1: 'Email already exists!',
                });
            }else{
                Toast.show({
                  type: 'error',
                  text1: 'Change Profile Failed!',
                });
            }
        })
  };
};

export const updatePassword = (data, id) => {
  return async () => {
    const {currentPassword, newPassword, confirmPassword} = data;
        var APIURL = url+"/auth/change-password.php";
        var headers = {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        };
        var Data ={
            id_user : id,
            current_password: currentPassword,
            new_password: newPassword,
            confirm_password: confirmPassword,
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
                  text1: 'Update Password Successful!',
                });
            }else if (Response.message == "Current Password is wrong") { 
                Toast.show({
                  type: 'error',
                  text1: 'Current Password is wrong',
                });
            }else if(Response.message=="New password and confirm password not match!"){
                Toast.show({
                  type: 'error',
                  text1: 'New password and confirm password not match!',
                });
            }
        })
  };
};

export const goLogout = () => ({
  type: LOGOUT,
});

export const getBanner = () => {
  return async dispatch => {
      var APIURL = url+"/seller/banner.php";
      var headers = {
          'Accept' : '*/*',
      };
      await fetch(APIURL,{
          method: 'GET',
          headers: headers,
      })
      .then((Response)=>Response.json())
      .then((Response)=>{
          if (Response.message == "Success") { 
            console.log(Response.data)
              dispatch({
                type: GET_BANNER,
                payload: Response.data,
              });
          }else{
              dispatch({
                type: GET_BANNER,
                payload: [],
              });
          }
      })
  };
};


export const getProduct = (category_id, search) => {
  return async dispatch => {
      var APIURL;
      if(category_id!=''){
        APIURL = url+"/buyer/product.php?method=get&category_id="+category_id;
      }else if(search!=''){
        APIURL = url+"/buyer/product.php?method=get&search="+search;
      }else{
        APIURL = url+"/buyer/product.php?method=get";
      }
      var headers = {
          'Accept' : '*/*',
      };
      await fetch(APIURL,{
          method: 'GET',
          headers: headers,
      })
      .then((Response)=>Response.json())
      .then((Response)=>{
          if (Response.message == "Success") { 
            console.log(Response.data)
              dispatch({
                type: GET_PRODUCT,
                payload: Response.data,
              });
          }else{
              dispatch({
                type: GET_PRODUCT,
                payload: [],
              });
          }
      })
  };
};

export const clearProduct = () => ({
  type: CLEAR_PRODUCT,
});

export const addCart = (productId, id) => {
  return async () => {
      var APIURL = url+"/buyer/cart.php?method=post";
      var headers = {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json'
      };
      var Data ={
          id_user:id,
          id_product :productId
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
                text1: 'Successful Add to Cart!',
              });
          }else if(Response.message=="Max cart"){
              Toast.show({
                type: 'error',
                text1: 'Max Cart 5 Product!',
              });
          }else if(Response.message=="Own Product"){
              Toast.show({
                type: 'error',
                text1: 'You cannot buy your own Product!',
              });
          }
      })
  };
};

export const getCart = (id) => {
  return async dispatch => {
      var APIURL = url+"/buyer/cart.php?method=get&id="+id;
      var headers = {
          'Accept' : '*/*',
      };
      await fetch(APIURL,{
          method: 'GET',
          headers: headers,
      })
      .then((Response)=>Response.json())
      .then((Response)=>{
          if (Response.message == "Success") { 
            console.log(Response.data)
              dispatch({
                type: GET_CART,
                payload: Response.data,
              });
          }
      })
  };
};

export const removeCart = (id,id_cart) => {
  return async () => {
      var APIURL = url+"/buyer/cart.php?method=delete";
      var headers = {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json'
      };
      var Data ={
          id_user:id,
          id_cart :id_cart
      };
      console.log(Data)
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
                text1: 'Successful Remove from Cart!',
              });
          }
      })
  };
};

export const updateCart = (id,id_cart,type) => {
  return async () => {
      var APIURL = url+"/buyer/cart.php?method=update";
      var headers = {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json'
      };
      var Data ={
          id_user:id,
          id_cart :id_cart,
          type:type
      };
      console.log(Data)
      await fetch(APIURL,{
          method: 'POST',
          headers: headers,
          body: JSON.stringify(Data)
      })
      .then((Response)=>Response.json())
      
  };
};


export const addWishlist = (productId, id) => {
  return async () => {
      var APIURL = url+"/buyer/wishlist.php?method=post";
      var headers = {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json'
      };
      var Data ={
          id_user:id,
          product_id :productId
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
                text1: 'Successful Add to Wishlist!',
              });
          }
      })
  };
};

export const getWishlist = (id) => {
  return async dispatch => {
      var APIURL = url+"/buyer/wishlist.php?method=get&id="+id;
      var headers = {
          'Accept' : '*/*',
      };
      await fetch(APIURL,{
          method: 'GET',
          headers: headers,
      })
      .then((Response)=>Response.json())
      .then((Response)=>{
          if (Response.message == "Success") { 
            console.log(Response.data)
              dispatch({
                type: GET_WISHLIST,
                payload: Response.data,
              });
          }
      })
  };
};

export const removeWishlist = (id,id_wishlist) => {
  return async () => {
      var APIURL = url+"/buyer/wishlist.php?method=delete";
      var headers = {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json'
      };
      var Data ={
          id_user:id,
          id_wishlist :id_wishlist
      };
      console.log(Data)
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
                text1: 'Successful Remove from Wishlist!',
              });
          }
      })
  };
};

export const postProduct = (data, id, category,condition,image) => {
  return async dispatch => {
    const {name, description, base_price, location,stock} = data;
        var APIURL = url+"/seller/product.php?method=post";
        var headers = {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        };
        var Data ={
            id_user : id,
            name :name,
            description:description,
            price:base_price,
            location:location,
            category_ids:category,
            condition:condition,
            stock : stock
        };
        await fetch(APIURL,{
            method: 'POST',
            headers: headers,
            body: JSON.stringify(Data)
        })
        .then((Response)=>Response.json())
        .then((Response)=>{
            if (Response.message == "Success") { 
                console.log("sucess post")
                RNFetchBlob.fetch('POST', url+'seller/product.php?method=uploadPhoto', {
                  Authorization: "Bearer access-token",
                  otherHeader: "foo",
                  'Content-Type': 'multipart/form-data',
                }, [
                    { name: 'image', filename: 'image.png', type: 'image/png', data: image },
                    { name: 'id_product', data: Response.data.id_product},
                  ]).then((resp) => {
                    console.log("Upload Berhasil")
                    Toast.show({
                      type: 'success',
                      text1: 'Success Post Product!',
                    });
                  }).catch((err) => {
                    console.log("Upload gagal")
                    Toast.show({
                      type: 'error',
                      text1: 'Failed Post Photo!',
                    });
                  })
            }else {
                Toast.show({
                  type: 'error',
                  text1: 'Failed Post Product!',
                });
            }
        })
  };
};

export const DaftarJualScreen = data => ({
  type: DAFTARJUAL_SCREEN,
  payload: data,
});

export const TransactionScreen = data => ({
  type: TRANSACTION_SCREEN,
  payload: data,
});

export const NotificationScreen = data => ({
  type: NOTIFICATION_SCREEN,
  payload: data,
});

export const getProductSeller = id => {
  return async dispatch => {
    var APIURL = url+"/seller/product.php?method=get&id="+id;
      var headers = {
          'Accept' : '*/*',
      };
      await fetch(APIURL,{
          method: 'GET',
          headers: headers,
      })
      .then((Response)=>Response.json())
      .then((Response)=>{
          if (Response.message == "Success") { 
            console.log("data pro ",Response.data)
              dispatch({
                type: GET_PRODUCT_SELLER,
                payload: Response.data,
              });
          }else{
              dispatch({
                type: GET_PRODUCT_SELLER,
                payload: [],
              });
          }
      })
  };
};

export const getWishlistSeller = AccessToken => {
  return async dispatch => {
    await axios
      .get(URL + 'seller/order?status=', {
        headers: {
          access_token: `${AccessToken}`,
        },
      })
      .then(res => {
        dispatch({
          type: GET_WISHLIST_SELLER,
          payload: res.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const rupiah = number => {
  let reverse ;
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

export const getNotificationSeller = (id_user) => {
  return async dispatch => {
    var APIURL = url+"/notification/index.php?method=get&id_user="+id_user+"&type=seller";
      var headers = {
          'Accept' : '*/*',
      };
      await fetch(APIURL,{
          method: 'GET',
          headers: headers,
      })
      .then((Response)=>Response.json())
      .then((Response)=>{
          if (Response.message == "Success") { 
              dispatch({
                type: GET_NOTIFICATION_SELLER,
                payload: Response.data,
              });
          }else{
              dispatch({
                type: GET_NOTIFICATION_SELLER,
                payload: [],
              });
          }
      })
  };
};

export const getNotificationBuyer = id_user => {
  return async dispatch => {
     var APIURL = url+"/notification/index.php?method=get&id_user="+id_user+"&type=buyer";
      var headers = {
          'Accept' : '*/*',
      };
      await fetch(APIURL,{
          method: 'GET',
          headers: headers,
      })
      .then((Response)=>Response.json())
      .then((Response)=>{
          if (Response.message == "Success") { 
              dispatch({
                type: GET_NOTIFICATION_BUYER,
                payload: Response.data,
              });
          }else{
              dispatch({
                type: GET_NOTIFICATION_BUYER,
                payload: [],
              });
          }
      })
  };
};

export const getCategory = () => {
  return async dispatch => {
    var APIURL = url+"/category/index.php?method=get";
      var headers = {
          'Accept' : '*/*',
      };
      await fetch(APIURL,{
          method: 'GET',
          headers: headers,
      })
      .then((Response)=>Response.json())
      .then((Response)=>{
          if (Response.message == "Success") { 
            console.log("category actions: ",Response)
              dispatch({
                type: GET_CATEGORY,
                payload: Response.category,
              });
          }else{
              dispatch({
                type: GET_CATEGORY,
                payload: [],
              });
          }
      })
  };
};

export const getSpesificProduct = (id, id_product) => {
  return async dispatch => {
    var APIURL = url+"/seller/product.php?method=get&id="+id+"&id_product="+id_product;
      var headers = {
          'Accept' : '*/*',
      };
      await fetch(APIURL,{
          method: 'GET',
          headers: headers,
      })
      .then((Response)=>Response.json())
      .then((Response)=>{
          if (Response.message == "Success") { 
            console.log("data pro ",Response.data)
              dispatch({
                type: GET_SPESIFIC_PRODUCT,
                payload: Response.data,
              });
          }
      })
  };
};

export const deleteProduct = (id,id_product) => {
  return async dispatch => {
      var APIURL = url+"/seller/product.php?method=delete";
      var headers = {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json'
      };
      var Data ={
            id_user : id,
            id_product:id_product,
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
                text1: 'Success Delete Product!',
              });
          }
      })
  };
};

export const updateProduct = (data, id_user, id_product, category,condition) => {
  return async dispatch => {
    const {name, description, base_price, location,stock} = data;
        var APIURL = url+"/seller/product.php?method=update";
        var headers = {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        };
        var Data ={
            id_user : id_user,
            id_product : id_product,
            name :name,
            description:description,
            price:base_price,
            location:location,
            category_ids:category,
            condition:condition,
            stock:stock,
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
                    text1: 'Success Update Product!',
                  });
                }else {
                  Toast.show({
                    type: 'error',
                    text1: 'Failed Update Product!',
                  });
            }
        })
  };
};

export const acceptOrder = (id) => {
  return async dispatch => {
    var APIURL = url+"/seller/order.php?method=post&confirm";
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
                text1: 'Successful Accept Order!',
              });
          }
      })
  };
};

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

export const getWishlistSpesific = (AccessToken, id) => {
  return async dispatch => {
    await axios
      .get(URL + 'seller/order/' + id, {
        headers: {
          access_token: `${AccessToken}`,
        },
      })
      .then(res => {
        dispatch({
          type: GET_WISHLIST_SPESIFIC,
          payload: res.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const getSpesificProductBuyer = (id) => {
  return async dispatch => {
      var APIURL = url+"/buyer/product.php?method=get_spesific&id="+id;
      var headers = {
            'Accept' : '*/*',
      };
      await fetch(APIURL,{
          method: 'GET',
          headers: headers,
      })
      .then((Response)=>Response.json())
      .then((Response)=>{
          if (Response.message == "Success") { 
              dispatch({
                type: GET_SPESIFIC_PRODUCT_BUYER,
                payload: Response.data,
              });
          }
      })
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

export const getDetailNotification = (AccessToken, id) => {
  return async dispatch => {
    await axios
      .get(URL + 'notification/' + id, {
        headers: {
          access_token: `${AccessToken}`,
        },
      })
      .then(res => {
        dispatch({
          type: GET_DETAIL_NOTIFICATION,
          payload: res.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const readNotif = (AccessToken, id) => {
  return async dispatch => {
    await axios
      .patch(
        URL + 'notification/' + id,
        {},
        {
          headers: {
            access_token: `${AccessToken}`,
          },
        },
      )
      .then(res => {
        console.log('patch read sucess!');
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const getSoldSeller = AccessToken => {
  return async dispatch => {
    await axios
      .get(URL + 'seller/order?status=accepted', {
        headers: {
          access_token: `${AccessToken}`,
        },
      })
      .then(res => {
        dispatch({
          type: GET_SOLD_SELLER,
          payload: res.data,
        });
      })
      .catch(function (error) {
        console.log(error);
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

export const getHistory = AccessToken => {
  return async dispatch => {
    await axios
      .get(URL + 'history', {
        headers: {
          access_token: `${AccessToken}`,
        },
      })
      .then(res => {
        dispatch({
          type: GET_HISTORY,
          payload: res.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const getHistoryProduct = (AccessToken, id) => {
  return async dispatch => {
    await axios
      .get(URL + 'history/' + id, {
        headers: {
          access_token: `${AccessToken}`,
        },
      })
      .then(res => {
        dispatch({
          type: GET_HISTORY_PRODUCT,
          payload: res.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
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

export const getOrderBuyerPending = (id_user) => {
  return async dispatch => {
    var APIURL = url+"/buyer/order.php?method=get_byid&id_buyer="+id_user+"&status=pending";
      var headers = {
          'Accept' : '*/*',
      };
      await fetch(APIURL,{
          method: 'GET',
          headers: headers,
      })
      .then((Response)=>Response.json())
      .then((Response)=>{
          if (Response.message == "Success") { 
              console.log(Response.data)
              dispatch({
                type: GET_ORDER_BUYER_PENDING,
                payload: Response.data,
              });
          }else{
              dispatch({
                type: GET_ORDER_BUYER_PENDING,
                payload: [],
              });
          }
      })
  };
};

export const getOrderBuyerinDelivery = (id_user) => {
  return async dispatch => {
    var APIURL = url+"/buyer/order.php?method=get_byid&id_buyer="+id_user+"&status=inDelivery";
      var headers = {
          'Accept' : '*/*',
      };
      await fetch(APIURL,{
          method: 'GET',
          headers: headers,
      })
      .then((Response)=>Response.json())
      .then((Response)=>{
          if (Response.message == "Success") { 
              console.log(Response.data)
              dispatch({
                type: GET_ORDER_BUYER_INDELIVERY,
                payload: Response.data,
              });
          }else{
              dispatch({
                type: GET_ORDER_BUYER_INDELIVERY,
                payload: [],
              });
          }
      })
  };
};

export const getOrderBuyerPendingSpesific = (id_order) => {
  return async dispatch => {
    var APIURL = url+"/buyer/order.php?method=get&id_order="+id_order;
      var headers = {
          'Accept' : '*/*',
      };
      await fetch(APIURL,{
          method: 'GET',
          headers: headers,
      })
      .then((Response)=>Response.json())
      .then((Response)=>{
          if (Response.message == "Success") { 
              console.log(Response.data)
              dispatch({
                type: GET_ORDER_BUYER_PENDING_SPECIFIC,
                payload: Response.data,
              });
          }
      })
  };
};

export const getOrderSellerPending = (id_user) => {
  return async dispatch => {
    var APIURL = url+"/seller/order.php?method=get_byid&id_seller="+id_user+"&status=pending";
      var headers = {
          'Accept' : '*/*',
      };
      await fetch(APIURL,{
          method: 'GET',
          headers: headers,
      })
      .then((Response)=>Response.json())
      .then((Response)=>{
          if (Response.message == "Success") { 
              console.log(Response.data)
              dispatch({
                type: GET_ORDER_SELLER_PENDING,
                payload: Response.data,
              });
          }else{
              dispatch({
                type: GET_ORDER_SELLER_PENDING,
                payload: [],
              });
          }
      })
  };
};

export const getOrderSellerPendingSpesific = (id_order) => {
  return async dispatch => {
    var APIURL = url+"/seller/order.php?method=get&id_order="+id_order;
      var headers = {
          'Accept' : '*/*',
      };
      await fetch(APIURL,{
          method: 'GET',
          headers: headers,
      })
      .then((Response)=>Response.json())
      .then((Response)=>{
          if (Response.message == "Success") { 
              console.log(Response.data)
              dispatch({
                type: GET_ORDER_SELLER_PENDING_SPECIFIC,
                payload: Response.data,
              });
          }
      })
  };
};

export const buyProduct = (id,productId,qty,finalPrice,courier) => {
  return async dispatch => {
    var APIURL = url+"/buyer/order.php?method=post";
      var headers = {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json'
      };
      var Data ={
          id_buyer:id,
          id_product :productId,
          qty:qty,
          final_price:finalPrice,
          courier: courier
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
                text1: 'Successful Buy!',
              });
          }
      })
  };
};