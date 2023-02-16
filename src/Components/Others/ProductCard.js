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
import { URLProduct } from '../../Utils/Url';
const Product = ({data, onPress,  label}) => {
  return (
  <>
  {data &&
    <TouchableOpacity style={styles.Card} onPress={onPress}>
      <Image
        style={styles.Image}
        source={{uri:URLProduct+ data.image}}
      />
      <View style={{flexDirection:'row',width:window.width*0.38,justifyContent:'center',height:ms(50)}}>
        <Text style={styles.Name} numberOfLines={2}>
         {data?.name}
        </Text>
      </View>
      <Text style={styles.Price} numberOfLines={1}>
        {`Rp. ${rupiah(data.price)}`}
      </Text>
    </TouchableOpacity>
    }
  </>
  );
};

export default Product;
const window = Dimensions.get('window');
const styles = StyleSheet.create({
  Card: {
    backgroundColor: COLORS.white,
    width: window.width * 0.4,
    alignItems: 'center',
    margin: ms(10),
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
    width:window.width * 0.4,
    height: ms(200),
    borderRadius: ms(10),
    marginBottom: ms(10),
  },
  Location: {
    fontFamily: FONTS.Regular,
    fontSize: ms(10),
    color: COLORS.dark,
  },
  Name: {
    fontFamily: FONTS.Bold,
    fontSize: ms(16),
    color: COLORS.dark,
    alignSelf:'center',
    textAlign:'center'
  },
  Price: {
    fontFamily: FONTS.SemiBold,
    fontSize: ms(12),
    color: COLORS.dark,
    paddingBottom:ms(10)
  },
  AddWishlist: {
    alignItems: 'center',

    paddingHorizontal: ms(10),
    paddingVertical: ms(5),
    marginTop: ms(6),

    borderRadius: ms(10),
  },
  Wishlist: {
    fontFamily: FONTS.Medium,
    fontSize: ms(8),
    color: COLORS.white,
  },
});
