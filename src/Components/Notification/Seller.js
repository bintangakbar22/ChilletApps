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
import React, {useState, useCallback, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {ms} from 'react-native-size-matters';
import {
  connectionChecker,
  getDetailNotification,
  getNotificationSeller,
  readNotif,
  rupiah,
  timeDate,
} from '../../Redux/actions';
import BottomModal from '../Others/BottomModal';
import NotificationShimmer from '../Skeleton/NotificationShimmer';
import {COLORS, FONTS} from '../../Utils';
import { ImageProduct } from '../../../api/url';

const Seller = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const connection = useSelector(state => state.appData.connection);
  const loginUser = useSelector(state => state.appData.loginUser);
  const notifDataSeller = useSelector(state => state.appData.notifDataSeller);
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
    dispatch(getNotificationSeller(loginUser?.id)).then(() =>
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

  const onOpenAccepted = id => {
    if (dataDetail?.id == id) {
      setopenModal(true);
      dispatch(readNotif(loginUser?.access_token, dataDetail?.id)).then(() => {
        dispatch(getNotificationSeller(loginUser?.id));
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
                  alignSelf: 'center',
                  width: window.width * 0.9,
                }}>
                {dataDetail?.status == 'bid' && (
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
                        alignItems: 'center',
                        paddingVertical: ms(15),
                        width: window.width * 0.8,
                      }}>
                      <Image style={styles.imageUser} />
                      <View style={{flexDirection: 'column'}}>
                        <Text style={[styles.Text, {fontSize: 16}]}>
                          {dataDetail?.buyer_name}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingTop: ms(15),
                        width: window.width * 0.8,
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
                          Bid {`Rp. ${rupiah(dataDetail?.bid_price)}`}
                        </Text>
                      </View>
                    </View>
                  </>
                )}
                {dataDetail?.status == 'create' && (
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
                      Yeay you managed to publised product!
                    </Text>
                    <Text
                      style={[
                        styles.textGrey,
                        {marginVertical: ms(10), fontSize: ms(14)},
                      ]}>
                      Hope you get best price with the buyer!
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingTop: ms(5),
                        width: window.width * 0.9,
                      }}>
                      <Image
                        style={{
                          width: ms(60),
                          height: ms(60),
                          borderRadius: ms(10),
                          marginRight: ms(15),
                          backgroundColor: COLORS.lightGrey,
                        }}
                        source={{uri: ImageProduct+ dataDetail?.image_url}}
                      />
                      <View style={{flexDirection: 'column'}}>
                        <Text
                          style={[
                            styles.Text,
                            {fontSize: ms(16), fontFamily: FONTS.SemiBold},
                          ]}>
                          {dataDetail?.product_name}
                        </Text>
                        <Text
                          style={[
                            styles.Text,
                            {fontSize: ms(14), marginVertical: ms(1)},
                          ]}>{`Rp. ${rupiah(dataDetail?.base_price)}`}</Text>
                        <Text style={[styles.textGrey]}>{`${timeDate(
                          dataDetail?.updatedAt,
                        )}`}</Text>
                      </View>
                    </View>
                  </>
                )}
              </View>
            )}
          </View>,
        );
      });
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
        <>
          {notifDataSeller &&
            notifDataSeller.map(item => {
              return (
                <TouchableOpacity
                  style={{flexDirection: 'row', marginBottom: ms(20)}}
                  key={item?.id}
                  onPress={() => {
                    dispatch(
                      getDetailNotification(loginUser?.access_token, item?.id),
                    ).then(() => {
                      onOpenAccepted(item?.id);
                    });
                  }}>
                  {item.Product && (
                    <>
                      <Image
                        source={{uri: ImageProduct+ item?.Product.image_url}}
                        style={styles.image}
                      />
                      <View
                        style={{flexDirection: 'column', marginLeft: ms(15)}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingRight: ms(30),
                            width: window.width * 0.8,
                          }}>
                          {item?.status == 'create' && 
                            <Text style={styles.textGrey}>Successfully Published</Text>
                          }{item?.status == 'updated' && 
                            <Text style={[styles.textGrey,{color:COLORS.softDark}]}>Successfully Updated</Text>
                          }{item?.status == 'sold' && 
                            <Text style={[styles.textGrey,{color:COLORS.green}]}>Product Sold</Text>
                          }
                          <View style={{flexDirection: 'row'}}>
                            <Text style={[styles.textGrey]}>{`${timeDate(
                              item?.updatedAt,
                            )}`}</Text>
                            {item?.read == "false" && <View style={styles.dot} />}
                          </View>
                        </View>
                        <View style={{width: window.width * 0.7,flexWrap:"wrap",flexDirection: 'row'}}>
                          <Text style={styles.textBlack}>
                            {item?.Product?.name}
                          </Text>
                        </View>
                        <Text style={styles.textBlack}>{`Rp. ${rupiah(
                          item?.Product?.base_price,
                        )}`}</Text>
                        {item.bid_price != null && (
                          <Text style={styles.textBlack}>
                            Bid {`Rp. ${rupiah(item?.bid_price)}`}
                          </Text>
                        )}
                      </View>
                    </>
                  ) }
                </TouchableOpacity>
              );
            })}
          {openModal && (
            <BottomModal onDismiss={onDismiss}>{component}</BottomModal>
          )}
        </>
      )}
    </ScrollView>
  );
};

export default Seller;
const window = Dimensions.get('window');
const styles = StyleSheet.create({
  textGrey: {
    color: COLORS.grey,
    fontFamily: FONTS.Regular,
    fontSize: ms(11),
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
  textBlack: {
    color: COLORS.black,
    fontFamily: FONTS.Regular,
    fontSize: ms(13),
    paddingBottom: ms(2),
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
