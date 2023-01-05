import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  RefreshControl,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {ms} from 'react-native-size-matters';
import {
  connectionChecker,
  getNotificationBuyer,
  getDetailNotification,
  sendOnWhatsApp,
  rupiah,
  timeDate,
  readNotif,
} from '../../Redux/actions';
import {COLORS, FONTS} from '../../Utils';
import {useDispatch} from 'react-redux';
import BottomModal from '../Others/BottomModal';
import Button from '../Others/Button';
import NotificationShimmer from '../Skeleton/NotificationShimmer';
import { ImageProduct } from '../../../api/url';

const Buyer = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const connection = useSelector(state => state.appData.connection);
  const loginUser = useSelector(state => state.appData.loginUser);
  const userData = useSelector(state => state.appData.userData);
  const notifDataBuyer = useSelector(state => state.appData.notifDataBuyer);
  const dataDetail = useSelector(state => state.appData.notifDataDetail);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [openModal, setopenModal] = useState(false);
  const [component, setComponent] = useState(null);

  useEffect(() => {
    if (isFocused) {
      dispatch(connectionChecker());
      getData();
    }
  }, [isFocused]);

  const getData = useCallback(() => {
    setLoading(true);
    dispatch(getNotificationBuyer(loginUser.id)).then(() =>
      setLoading(false),
    );
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getData();
    setRefreshing(false);
  }, []);

  const onDismiss = () => {
    setopenModal(false);
  };

  const onOpenAccepted = (id, read) => {
    if (dataDetail?.id == id) {
      setopenModal(true);
      if (read == false) {
        dispatch(readNotif(loginUser.access_token, dataDetail.id)).then(() => {
          dispatch(getNotificationBuyer(loginUser.access_token));
        });
      }

      setComponent(
        <View
          style={{
            width: window.width,
            paddingBottom: ms(60),
            paddingTop: ms(20),
          }}>
          {dataDetail?.id == id && (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: window.width * 0.9,
                alignSelf: 'center',
              }}>
              {dataDetail?.status == 'accepted' && (
                <>
                  <Text
                    style={[
                      styles.Text,
                      {
                        fontSize: ms(14),
                        paddingTop: ms(10),
                        fontFamily: FONTS.SemiBold,
                        color: COLORS.green,
                      },
                    ]}>
                    Yeay you managed to get a suitable price :)
                  </Text>
                  <Text
                    style={[
                      styles.textGrey,
                      {paddingVertical: ms(10), fontSize: ms(14)},
                    ]}>
                    Immediately contact the seller via whatsapp for further
                    transactions
                  </Text>
                  <Text
                    style={[
                      styles.Text,
                      {
                        alignSelf: 'center',
                        fontSize: ms(16),
                        paddingTop: ms(10),
                        fontFamily: FONTS.SemiBold,
                      },
                    ]}>
                    Product Bid
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: ms(10),
                      width: window.width * 0.7,
                    }}>
                    <Image style={styles.imageUser} />
                    <View style={{flexDirection: 'column'}}>
                      <Text style={[styles.Text, {fontSize: ms(14)}]}>
                        {dataDetail?.seller_name}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingTop: ms(10),
                      width: window.width * 0.7,
                    }}>
                    <Image
                      style={styles.imageUser}
                      source={{uri: dataDetail?.Product.image_url}}
                    />
                    <View style={{flexDirection: 'column'}}>
                      <Text style={[styles.Text, {fontSize: ms(14)}]}>
                        {dataDetail?.Product.name}
                      </Text>
                      <Text
                        style={[
                          styles.Text,
                          {fontSize: ms(14)},
                        ]}>{`Rp. ${rupiah(
                        dataDetail?.Product.base_price,
                      )}`}</Text>
                      <Text style={[styles.Text, {fontSize: ms(14)}]}>
                        Succesfully Bid {`Rp. ${rupiah(dataDetail?.bid_price)}`}
                      </Text>
                    </View>
                  </View>
                  <Button
                    caption={'Contact Seller via Whatsapp'}
                    onPress={() => {
                      let url =
                        'whatsapp://send?text=' +
                        'Hello this is ' +
                        userData?.full_name +
                        ' who want to buy  ' +
                        dataDetail?.product_name +
                        ' in SecondApp with bid price ' +
                        'Rp. ' +
                        rupiah(dataDetail?.bid_price) +
                        '&phone=62' +
                        dataDetail?.User?.phone_number;
                      
                      sendOnWhatsApp(url);
                    }}
                    style={{
                      width: window.width * 0.8,
                      height: ms(50),
                      marginTop: ms(20),
                    }}
                  />
                </>
              )}
              {dataDetail.status == '' && (
                <>
                  <Text
                    style={[
                      styles.Text,
                      {
                        fontSize: ms(14),
                        fontFamily: FONTS.SemiBold,
                        color: COLORS.grey,
                      },
                    ]}>
                    Wait the seller response your bid :)
                  </Text>
                  <Text
                    style={[
                      styles.Text,
                      {
                        fontSize: ms(16),
                        paddingTop: ms(10),
                        fontFamily: FONTS.SemiBold,
                      },
                    ]}>
                    Product Bid
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingVertical: ms(15),
                      width: window.width * 0.9,
                    }}>
                    <Image
                      style={styles.imageUser}
                      source={{uri: dataDetail?.Product?.image_url}}
                    />
                    <View style={{flexDirection: 'column'}}>
                      <Text style={[styles.Text, {fontSize: ms(14)}]}>
                        {dataDetail?.Product?.name}
                      </Text>
                      <Text
                        style={[
                          styles.Text,
                          {fontSize: ms(14)},
                        ]}>{`Rp. ${rupiah(
                        dataDetail?.Product?.base_price,
                      )}`}</Text>
                      <Text style={[styles.Text, {fontSize: ms(14)}]}>
                        Bid {`Rp. ${rupiah(dataDetail?.bid_price)}`}
                      </Text>
                    </View>
                  </View>
                </>
              )}
              {dataDetail?.status == 'declined' && (
                <>
                  <Text
                    style={[
                      styles.Text,
                      {
                        fontSize: ms(14),
                        fontFamily: FONTS.SemiBold,
                        color: COLORS.red,
                      },
                    ]}>
                    Mehh your order got declined by seller :({' '}
                  </Text>
                  <Text style={[styles.textGrey, {fontSize: ms(14)}]}>
                    Hope you get best price in other product!
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingTop: ms(10),
                      width: window.width * 0.7,
                    }}>
                    <Image
                      style={{
                        width: ms(60),
                        height: ms(60),
                        marginRight: ms(20),
                        borderRadius: ms(10),
                      }}
                      source={{uri: dataDetail?.image_url}}
                    />
                    <View style={{flexDirection: 'column'}}>
                      <Text
                        style={[
                          styles.Text,
                          {fontSize: ms(14), fontFamily: FONTS.SemiBold},
                        ]}>
                        {dataDetail?.product_name}
                      </Text>
                      <Text
                        style={[
                          styles.Text,
                          {fontSize: ms(14), marginVertical: ms(4)},
                        ]}>{`Rp. ${rupiah(
                        dataDetail?.Product?.base_price,
                      )}`}</Text>
                      <Text style={[styles.textGrey]}>{`${timeDate(
                        dataDetail?.Product?.updatedAt,
                      )}`}</Text>
                    </View>
                  </View>
                </>
              )}
            </View>
          )}
        </View>,
      );
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.Box}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="green"
          colors={['green']}
        />
      }>
      {loading || !connection ? (
        <NotificationShimmer />
      ) : (
        notifDataBuyer &&
        notifDataBuyer.map(item => {
          return (
            <TouchableOpacity
              style={{flexDirection: 'row', marginBottom: ms(20)}}
              key={item.id}
              onPress={() => {
                dispatch(
                  getDetailNotification(loginUser.id, item.id),
                ).then(() => {
                  onOpenAccepted(item.id, item.read);
                });
              }}>
              <Image source={{uri: ImageProduct+ item?.image_url}} style={styles.image} />
              <View style={{flexDirection: 'column', marginLeft: ms(15)}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingRight: ms(35),
                  }}>
                  {item?.status == 'accepted' || item?.status == '' ? (
                    <Text
                      style={[
                        styles.textGrey,
                        {
                          color:
                            item?.status == 'accepted'
                              ? COLORS.green
                              : COLORS.grey,
                        },
                      ]}>
                      Product Offer
                    </Text>
                  ) : (
                    <Text style={[styles.textGrey, {color: 'orange'}]}>
                      Order Pending
                    </Text>
                  )}
                  <View style={{flexDirection: 'row'}}>
                    <Text style={[styles.textGrey]}>{`${timeDate(
                      item?.updatedAt,
                    )}`}</Text>
                    {!item?.read && <View style={styles.dot} />}
                  </View>
                </View>
                <Text style={styles.textBlack}>{item.Product.name}</Text>
                <Text style={styles.textBlack}>{`Rp. ${rupiah(
                  item?.Product?.base_price,
                )}`}</Text>
                {item?.status == 'accepted' && (
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      width: window.width * 0.8,
                    }}>
                    <Text style={[styles.textGrey, {fontSize: ms(14)}]}>
                      you will be contacted by the seller via whatsapp
                    </Text>
                  </View>
                )}

                <View
                  style={{
                    flexWrap: 'wrap',
                    width: window.width * 0.82,
                    flexDirection: 'row',
                  }}></View>
              </View>
            </TouchableOpacity>
          );
        })
      )}
      {openModal && (
        <BottomModal onDismiss={onDismiss}>{component}</BottomModal>
      )}
    </ScrollView>
  );
};

export default Buyer;
const window = Dimensions.get('window');
const styles = StyleSheet.create({
  textGrey: {
    color: COLORS.grey,
    fontFamily: FONTS.Regular,
    fontSize: ms(11),
    paddingBottom: ms(2),
  },
  textBlack: {
    color: COLORS.black,
    fontFamily: FONTS.Regular,
    fontSize: ms(13),
    paddingBottom: ms(2),
  },
  image: {
    width: ms(50),
    height: ms(50),
    backgroundColor: COLORS.lightGrey,
    borderRadius: ms(10),
  },
  dot: {
    backgroundColor: '#FA2C5A',
    width: ms(8),
    height: ms(8),
    borderRadius: ms(10),
    marginTop: ms(4),
    marginLeft: ms(8),
  },
  Box: {
    width: window.width * 0.9,
  },

  imageUser: {
    width: ms(40),
    height: ms(40),
    borderRadius: ms(8),
    marginRight: ms(20),
    backgroundColor: COLORS.lightGrey,
  },
  Text: {
    fontSize: ms(12),
    fontFamily: FONTS.Regular,
    color: COLORS.black,
  },
});
