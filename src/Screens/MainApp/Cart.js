import {
  View,
  StatusBar,
  NativeModules,
  Platform,
  Dimensions,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity
} from 'react-native';
import React from 'react';
import {useState, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  DecreaseQuantity,
  IncreaseQuantity,
  rupiah,
  DeleteCart,
  GetNumberCart,
  InputQuantity
} from '../../Redux/actions';
import {COLORS} from '../../Utils';
import {ms} from 'react-native-size-matters';
import {Button, CartCard, Header} from '../../Components';
import {useIsFocused} from '@react-navigation/native';
import { FONTS } from '../../Utils';
import CartShimmer from '../../Components/Skeleton/CartShimmer';
import {Blank} from '../../Components';
import Toast from 'react-native-toast-message';

const Cart = ({navigation}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [loading, setLoading] = useState(true);
  
  const connection = useSelector(state => state.appData.connection);
  const loginUser = useSelector(state => state.appData.loginUser);
  const userData = useSelector(state => state.appData.userData);
  const cart = useSelector(state => state.appData.Carts);
  const finalPrice = cart.map(i=>i.price*i.quantity).reduce((a, b) => a + b, 0)
  const idProduct = cart.map(i=>i.id)

  const getData = () => {
    setLoading(true)
    dispatch(GetNumberCart()).then(() =>
      setLoading(false),
    );
  };

  const handleRemove = useCallback(id => {
    dispatch(DeleteCart(id)).then(getData());
  }, []);

  const handlePlus = useCallback(id => {
    dispatch(IncreaseQuantity(id)).then(getData());
  }, []);

  const handleMin = useCallback(id => {
    dispatch(DecreaseQuantity(id)).then(getData());
  }, []);


  useState(() => {
    if (isFocused) {
      getData();
    }
  }, []);

  const goBuy = () =>{
    if(loginUser){
      navigation.navigate("Checkout",{
        idBuyer:loginUser.id,
        idProduct:idProduct,
        finalPrice:finalPrice,
        cart:cart
      })
    }else{
      navigation.navigate('Auth');
        Toast.show({
            type: 'error',
            text1: 'Please Login Or Register!',
        })
    }
    
  }
  const renderItem = ({item,index}) => (
    <CartCard
      data={item}
      label={'cart'}
      onPressCart={() => handleRemove(index)}
      onPressMin={() => handleMin(index)}
      onPressPlus={() => handlePlus(index)}
      onPress={()=>{
        navigation.navigate('Detail', {
          product_id:item.id
        })
      }}
    />
  );

  return (
    <View style={styles.Container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
        translucent
      />
      <Header navigation={navigation} title={'My Cart'} />
      {loading || !connection ? (
        <CartShimmer />
      ) : (
        <>
        {cart.length==0?
          <Blank caption={'Empty Cart'} />
        :
          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
            numColumns={1}
            data={cart}
            renderItem={renderItem}
            contentContainerStyle={styles.FlatlistContainer}
          />
        }
        </>
      )}
        <View style={styles.Bottom}>
            <View style={{flexDirection:'column'}}>
                <Text style={[styles.Text,{fontSize:ms(16)}]}>Total Price</Text>
                <Text style={[styles.TextPrice]}>Rp. {rupiah(finalPrice)}</Text>
            </View>
            {cart.length==0?
                <Button style={{width:window.width*0.35,marginTop:0,height:50,backgroundColor:COLORS.grey}} caption={'Checkout'} disabled />
                :
                <Button style={{width:window.width*0.35,marginTop:0,height:50,backgroundColor:COLORS.green}} caption={'Checkout'} onPress={goBuy}/>
            }
        </View>
    </View>
  );
};

export default Cart;

const {StatusBarManager} = NativeModules;
const window = Dimensions.get('window');
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: StatusBarManager.HEIGHT + ms(20),
    paddingBottom: Platform.OS === 'ios' ? ms(25) : ms(15),
  },
  FlatlistContainer: {
    alignItems: 'center',
    height:window.height*1
  },
  Text: {
    fontFamily: FONTS.Bold,
    color: COLORS.black,
  },
  TextPrice: {
    fontFamily: FONTS.SemiBold,
    color: COLORS.grey,
    fontSize:ms(14)
  },
  Bottom:{
    width:window.width*1.0,
    position:'absolute',
    bottom:0,
    flexDirection:'row',
    alignSelf:'center',
    backgroundColor:COLORS.white,
    padding:ms(14),
    paddingTop:ms(8),
    elevation: ms(10),
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: ms(0.5),
    shadowRadius: ms(4),
    justifyContent:'space-between'
}
});
