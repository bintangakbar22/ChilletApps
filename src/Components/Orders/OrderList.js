import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {ms} from 'react-native-size-matters';
import {COLORS, FONTS} from '../../Utils';
import {useNavigation} from '@react-navigation/native';
import {rupiah} from '../../Redux/actions';
import moment from 'moment';
import {URLProduct} from '../../Utils/Url';
const OrderList = ({data, type}) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        width: window.width * 0.9,
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}>
      {data &&
        data.map((item, key) => {
          const finalPrice = item?.order_item
            .map(i => i.price * i.quantity)
            .reduce((a, b) => a + b, 0);
          const product =
            item.order_item[Math.floor(Math.random() * item.order_item.length)]
              .product;

          return (
            <>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('OrderDetail', {
                    dataRoute: item,
                  });
                }}
                key={key}
                style={styles.card}>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingHorizontal: ms(5),
                      width: window.width * 0.85,
                    }}>
                    <Text style={[styles.textGrey, {}]}>{`${moment(
                      item?.date,
                    ).format('D MMMM YYYY hh:mm')}`}</Text>
                    {item.status == 'PENDING' ? (
                      <Text
                        style={[
                          styles.textGrey,
                          {color: 'orange', fontFamily: FONTS.Bold},
                        ]}>
                        Order Pending
                      </Text>
                    ) : item.status == 'CONFIRMED' ? (
                      <Text
                        style={[
                          styles.textGrey,
                          {color: COLORS.green, fontFamily: FONTS.Bold},
                        ]}>
                        Order Confirmed
                      </Text>
                    ) : item.status == 'VERIFYING' ? (
                      <Text
                        style={[
                          styles.textGrey,
                          {color: COLORS.red, fontFamily: FONTS.Bold},
                        ]}>
                        Order Verifying
                      </Text>
                    ) : item.status == 'PROCESSED' ? (
                      <Text
                        style={[
                          styles.textGrey,
                          {color: COLORS.green, fontFamily: FONTS.Bold},
                        ]}>
                        Order Processed
                      </Text>
                    ) : item.status == 'SENDING' ? (
                      <Text
                        style={[
                          styles.textGrey,
                          {color: COLORS.green, fontFamily: FONTS.Bold},
                        ]}>
                        Order Sending
                      </Text>
                    ) : (
                      <Text
                        style={[
                          styles.textGrey,
                          {color: COLORS.green, fontFamily: FONTS.Bold},
                        ]}>
                        Order Success
                      </Text>
                    )}
                  </View>
                  <View
                    style={{
                      width: window.width * 0.85,
                      borderColor: COLORS.grey,
                      borderWidth: 0.3,
                    }}
                  />
                  <View
                    style={{flexDirection: 'row', width: window.width * 0.82}}>
                    <Image
                      style={styles.image}
                      source={{uri: URLProduct + product?.image}}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        width: window.width * 0.68,
                        flexWrap: 'wrap',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={[
                          styles.textBlack,
                          {
                            marginTop: ms(12),
                            fontSize: ms(13),
                            paddingLeft: ms(5),
                          },
                        ]}>
                        {product.name}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  {item?.order_item?.length > 1 ? (
                    <Text style={[styles.textGrey, {paddingTop: ms(5)}]}>
                      +{item?.order_item?.length - 1} others products
                    </Text>
                  ) : (
                    <Text style={[styles.textGrey]}></Text>
                  )}
                  <View style={{flexDirection: 'column'}}>
                    <Text style={[styles.textGrey]}>Final Price</Text>
                    <Text style={styles.textBlack}>{`Rp. ${rupiah(
                      finalPrice,
                    )}`}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </>
          );
        })}
    </View>
  );
};

export default OrderList;

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  image: {
    width: ms(50),
    height: ms(50),
    backgroundColor: COLORS.lightGrey,
    borderRadius: ms(10),
    marginTop: ms(5),
  },
  textBlack: {
    color: COLORS.black,
    fontFamily: FONTS.Regular,
    fontSize: ms(14),
    paddingBottom: ms(2),
  },
  textGrey: {
    color: COLORS.grey,
    fontFamily: FONTS.Regular,
    fontSize: ms(12),
  },
  card: {
    marginBottom: 20,
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
});
