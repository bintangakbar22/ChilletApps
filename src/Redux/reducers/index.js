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
  GET_ORDER_SELLER_PENDING_SPECIFIC
} from '../types';
const initialState = {
  authScreen: 'Login',
  userType: 'Buyer',
  loginUser: null,
  userData: {},
  banner: [],
  product: [],
  wishlist: [],
  cart:[],
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
    case FETCH_LOGIN:
      return {
        ...state,
        loginUser: action.payload,
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
    case DAFTARJUAL_SCREEN:
      return {
        ...state,
        daftarJualScreen: action.payload,
      };
    case NOTIFICATION_SCREEN:
      return {
        ...state,
        notifScreen: action.payload,
      };

    case GET_PRODUCT_SELLER:
      return {
        ...state,
        productDataSeller: action.payload,
      };
    case GET_WISHLIST_SELLER:
      return {
        ...state,
        wishlistDataSeller: action.payload,
      };
    case GET_NOTIFICATION_SELLER:
      return {
        ...state,
        notifDataSeller: action.payload,
      };
    case GET_NOTIFICATION_BUYER:
      return {
        ...state,
        notifDataBuyer: action.payload,
      };
    case GET_CATEGORY:
      return {
        ...state,
        category: action.payload,
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
    case GET_HISTORY:
      return {
        ...state,
        history: action.payload,
      };
    case GET_HISTORY_PRODUCT:
      return {
        ...state,
        historyProduct: action.payload,
      };
    case GET_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case TRANSACTION_SCREEN:
      return {
        ...state,
        transactionScreen: action.payload,
    };
    case GET_ORDER_BUYER_PENDING:
      return {
        ...state,
        orderBuyerPending: action.payload,
    };
    case GET_ORDER_BUYER_INDELIVERY:
      return {
        ...state,
        orderBuyerinDelivery: action.payload,
    };
    case GET_ORDER_BUYER_DONE:
      return {
        ...state,
        orderBuyerDone: action.payload,
    };
    case GET_ORDER_SELLER_PENDING:
      return {
        ...state,
        orderSellerPending: action.payload,
    };
    case GET_ORDER_SELLER_INDELIVERY:
      return {
        ...state,
        orderSellerinDelivery: action.payload,
    };
    case GET_ORDER_SELLER_DONE:
      return {
        ...state,
        orderSellerDone: action.payload,
    };
    case GET_ORDER_BUYER_PENDING_SPECIFIC:
      return {
        ...state,
        orderBuyerPendingSpecific: action.payload,
    };
    case GET_ORDER_SELLER_PENDING_SPECIFIC:
      return {
        ...state,
        orderSellerPendingSpecific: action.payload,
    };
    default:
      return state;
  }
};

export default Reducer;
