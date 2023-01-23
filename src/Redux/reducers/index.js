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
  GET_NOTIFICATION_SELLER,
  GET_NOTIFICATION_BUYER,
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
  GET_ORDER_BUYER_PENDING,
  GET_ORDER_BUYER_INDELIVERY,
  GET_ORDER_BUYER_DONE,
  GET_ORDER_SELLER_PENDING,
  GET_ORDER_SELLER_INDELIVERY,
  GET_ORDER_SELLER_DONE,
  GET_ORDER_BUYER_PENDING_SPECIFIC,
  GET_ORDER_SELLER_PENDING_SPECIFIC,
  ADD_CART,
  GET_NUMBER_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  DELETE_CART
} from '../types';
const initialState = {
  Carts:[],
  numberCart:0,
  authScreen: 'Login',
  loginUser: null,
  userData: {},
  accessToken:null,
  idUser :null,
  banner: [],
  product: [],
  wishlist: [],
  productToCart:{},
  wishlistDataSeller: null,
  productDataSeller: [],
  daftarJualScreen: 'Product',
  notifDataSeller: null,
  notifDataBuyer: null,
  notifScreen: 'Buyer',
  category: [],
  productSpesific: null,
  wishlistSpesific: null,
  productSpesificBuyer: null,
  order: null,
  statusOrder: null,
  statusOrderProduct: null,
  notifDataDetail: null,
  soldSeller: null,
  connection: false,
  history:null,
  historyProduct:null,
  transactionScreen: 'Pending',
  orderBuyerPending:[],
  orderBuyerinDelivery:[],
  orderBuyerDone:[],
  orderSellerPending:[],
  orderSellerinDelivery:[],
  orderSellerDone:[],
  orderBuyerPendingSpecific:null,
  orderSellerPendingSpecific:null
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    

    case TYPE_USER:
      return {
        ...state,
        userType: action.payload,
      };
    case AUTH_SCREEN:
      return {
        ...state,
        authScreen: action.payload,
      };
    case GET_NUMBER_CART:
            return{
                ...state
            }
    case ADD_CART:
        if(state.numberCart==0){
            let cart = {
                id:action.payload.id,
                quantity:1,
                name:action.payload.name,
                image:action.payload.image,
                price:action.payload.price,
                user_id:state.userData.id
            } 
            state.Carts.push(cart); 
        }
        else{
            let check = false;
            state.Carts?.map((item,key)=>{
                if(item.id==action.payload.id){
                    state.Carts[key].quantity++;
                    check=true;
                }
            });
            if(!check){
                let _cart = {
                    id:action.payload.id,
                    quantity:1,
                    name:action.payload.name,
                    image:action.payload.image,
                    price:action.payload.price,
                    user_id:state.userData.id
                }
                state.Carts.push(_cart);
            }
        }
        return{
            ...state,
            numberCart:state.numberCart+1
        }
    case INCREASE_QUANTITY:
        state.numberCart++
        state.Carts[action.payload].quantity++;
      
        return{
            ...state
        }
    case DECREASE_QUANTITY:
        let quantity = state.Carts[action.payload].quantity;
        if(quantity>1){
            state.numberCart--;
            state.Carts[action.payload].quantity--;
        }
      
        return{
            ...state
        }
    case DELETE_CART:
        let quantity_ = state.Carts[action.payload].quantity;
        return{
            ...state,
            numberCart:state.numberCart - quantity_,
            Carts:state.Carts.filter(item=>{
                return item.id!=state.Carts[action.payload].id
            })
            
        }
    case FETCH_LOGIN:
      return {
        ...state,
        loginUser: action.payload,
        userData : action.userData,
        accessToken:action.accessToken,
        idUser : action.idUser
      };
    case GET_USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    case UPDATE_USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        loginUser: null,
        userData: null,
        notifDataSeller :null,
        notifDataBuyer :null
      };
    case GET_BANNER:
      return {
        ...state,
        banner: action.payload,
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: [...(state.product || []), ...action.payload],
      };
    case CLEAR_PRODUCT:
      return {
        ...state,
        product: null,
      };
    case GET_WISHLIST:
      return {
        ...state,
        wishlist: action.payload,
      };
    case GET_SPESIFIC_PRODUCT:
      return {
        ...state,
        productSpesific: action.payload,
      };
    case GET_WISHLIST_SPESIFIC:
      return {
        ...state,
        wishlistSpesific: action.payload,
      };
    case GET_SPESIFIC_PRODUCT_BUYER:
      return {
        ...state,
        productSpesificBuyer: action.payload,
      };
    case GET_STATUS_ORDER_PRODUCT:
      return {
        ...state,
        statusOrderProduct: action.payload,
      };
    case GET_STATUS_ORDER:
      return {
        ...state,
        statusOrder: action.payload,
      };
    case GET_ORDER:
      return {
        ...state,
        order: action.payload,
      };
    case GET_DETAIL_NOTIFICATION:
      return {
        ...state,
        notifDataDetail: action.payload,
      };
    case GET_SOLD_SELLER:
      return {
        ...state,
        soldSeller: action.payload,
      };
    case CONNECTED:
      return {
        ...state,
        connection: true,
      };
    case NOT_CONNECTED:
      return {
        ...state,
        connection: false,
      };

    default:
      return state;
  }
};

export default Reducer;
