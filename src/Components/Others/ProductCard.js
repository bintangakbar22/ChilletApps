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
const Product = ({data, onPress, onPressWishlist, wishlist, label}) => {
  const wishlistButton = wishlist?.filter(i => i.product_id == data.id);
  const loginUser = useSelector(state => state.appData.loginUser);
  return (
  <>
  {data &&
    <TouchableOpacity style={styles.Card} onPress={onPress}>
      <Image
        style={styles.Image}
      />
      <Text style={styles.Location} numberOfLines={1}>
        {label ? data?.Product?.location : data?.location}
      </Text>
      <View style={{flexDirection:'row',width:window.width*0.38,justifyContent:'center',height:ms(70)}}>
        <Text style={styles.Name} numberOfLines={3}>
          {label ? data?.Product?.name : data?.name}
        </Text>
      </View>
      <Text style={styles.Price} numberOfLines={1}>
        {`Rp. ${rupiah(label ? data?.Product?.base_price : data?.base_price)}`}
      </Text>
      {loginUser&&wishlist || label ? (
        <TouchableOpacity
          disabled={label ? false : wishlistButton?.length ? true : false}
          style={[
            {
              backgroundColor: label
                ? COLORS.red
                : wishlistButton?.length
                ? COLORS.dark
                : COLORS.grey,
            },
            styles.AddWishlist,
          ]}
          onPress={onPressWishlist}>
          <Text style={styles.Wishlist}>
            {label ? 'Remove' : 'Add to Wishlist'}
          </Text>
        </TouchableOpacity>
      ) : null}
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
    padding: ms(10),

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
    width: ms(130),
    height: ms(90),

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
    fontSize: ms(14),
    color: COLORS.dark,
    alignSelf:'center',
    marginTop: ms(6),
    textAlign:'center'
  },
  Price: {
    fontFamily: FONTS.SemiBold,
    fontSize: ms(12),
    color: COLORS.dark,
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
