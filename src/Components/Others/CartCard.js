import {
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  View
} from 'react-native';
import React from 'react';
import {ms} from 'react-native-size-matters';
import {rupiah} from '../../Redux/actions';
import {COLORS, FONTS} from '../../Utils';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { URLProduct } from '../../Utils/Url';
const CartCard = ({data, onPressCart, cart, label,onPressMin,onPressPlus}) => {
  const loginUser = useSelector(state => state.appData.loginUser);
  function TotalPrice(price,qty){
        return Number(price * qty).toLocaleString('en-US');
    }

  return (
  <>
  {data &&
    <TouchableOpacity style={styles.Card}>
     <View style={{flexDirection:'row'}}>
      <Image
        style={styles.Image}
        source={{uri: URLProduct+ data?.image }}
      />
      <View style={{flexDirection:'column',width:window.width*0.5,justifyContent:'center'}}>
        <Text style={styles.Name} numberOfLines={2}>
          { data?.name }
        </Text>
        <Text style={styles.Location} numberOfLines={1}>
            { data?.Product?.location}
        </Text>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={styles.Price} numberOfLines={1}>
                {`Rp. ${rupiah( TotalPrice(data.price,data.quantity) )}`}
            </Text>
            {loginUser &&label=='checkout'&&
            <Text style={[styles.Price,{color:COLORS.grey}]} numberOfLines={1}>
              Qty :{data.quantity}
            </Text>
            }
            {loginUser &&label=='cart'? (
                <>
                {data.quantity>1&&
                
                <TouchableOpacity
                style={[
                    styles.AddWishlist,
                ]}
                onPress={onPressMin}>
                <Icon name={'minus-circle-outline'} size={ms(22)} color={COLORS.green} />
                </TouchableOpacity>
                }
                <TouchableOpacity
                style={[
                    styles.AddWishlist,
                ]}
                onPress={onPressPlus}>
                <Icon name={'plus-circle-outline'} size={ms(22)} color={COLORS.primaryBlue} />
                </TouchableOpacity>
                <TouchableOpacity
                style={[
                    styles.AddWishlist,
                ]}
                onPress={onPressCart}>
                <Icon name={'trash-can-outline'} size={ms(22)} color={COLORS.red} />
                </TouchableOpacity>
                </>
            ) : null}
        </View>
        
      </View>
     </View>
    </TouchableOpacity>
    }
  </>
  );
};

export default CartCard;
const window = Dimensions.get('window');
const styles = StyleSheet.create({
  Card: {
    backgroundColor: COLORS.white,
    width: window.width * 0.9,
    alignItems: 'flex-start',
    margin: ms(10),
    padding: ms(10),
    paddingVertical:ms(15),
    borderRadius: ms(10),
    elevation: ms(2),
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: ms(0.25),
    shadowRadius: ms(2),
  },
  Image: {
    backgroundColor: COLORS.lightGrey,
    resizeMode: 'cover',
    width: ms(110),
    marginRight:ms(10)
  },
  Location: {
    fontFamily: FONTS.Regular,
    fontSize: ms(10),
    color: COLORS.dark,
  },
  Name: {
    fontFamily: FONTS.Bold,
    fontSize: ms(14),
    color: COLORS.dark,
    marginTop: ms(6),
  },
  Price: {
    fontFamily: FONTS.SemiBold,
    fontSize: ms(12),
    color: COLORS.dark,
  },
  AddWishlist: {
    alignItems: 'flex-start',
  },
  Wishlist: {
    fontFamily: FONTS.Medium,
    fontSize: ms(8),
    color: COLORS.white,
  },
});
