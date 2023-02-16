import {
  AUTH_SCREEN,
  FETCH_LOGIN,
  GET_USER_DATA,
  UPDATE_USER_DATA,
  LOGOUT,
  GET_BANNER,
  GET_PRODUCT,
  GET_SPESIFIC_PRODUCT,
  GET_SPESIFIC_PRODUCT_BUYER,
  GET_ORDER,
  CLEAR_PRODUCT,
  CONNECTED,
  NOT_CONNECTED,
  TYPE_USER,
  ADD_CART,
  GET_NUMBER_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  DELETE_CART,
  SAVE_ADDRESS,
  CLEAR_CART,
  ORDER_SCREEN,
  INPUT_QUANTITY
} from '../types';
const initialState = {
  Carts:[],
  numberCart:0,
  authScreen: 'Login',
  loginUser: null,
  userData: {},
  accessToken:null,
  idUser :null,
  product: [],
  productSpesific: null,
  productSpesificBuyer: null,
  connection: false,
  orderScreen:'pending',
  Orders:[]
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
                //user_id:action.payload.user_id
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
                    //user_id:action.payload.user_id
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
    case INPUT_QUANTITY:
      state.numberCart=action.number
      state.Carts[action.payload].quantity= action.number;
      return {
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
    case SAVE_ADDRESS:
      return {
        ...state,
        userData:action.payload
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
        Carts:[],
        numberCart:0
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
    case CLEAR_CART:
      return{
        ...state,
        Carts:[],
        numberCart:0,
      }
    case CLEAR_PRODUCT:
      return {
        ...state,
        product: [],
      };
    case GET_SPESIFIC_PRODUCT:
      return {
        ...state,
        productSpesific: action.payload,
      };
    case GET_SPESIFIC_PRODUCT_BUYER:
      return {
        ...state,
        productSpesificBuyer: action.payload,
      };
    case GET_ORDER:
      return {
        ...state,
        Orders: action.payload,
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
    case ORDER_SCREEN:
      return {
        ...state,
        orderScreen:action.payload
      }
    case GET_ORDER:
      return {
        ...state,
        Orders:action.payload
      }

    default:
      return state;
  }
};

export default Reducer;
