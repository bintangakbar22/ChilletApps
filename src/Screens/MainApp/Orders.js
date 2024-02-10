import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  NativeModules,
  ScrollView,
  RefreshControl,
  Platform,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {FONTS} from '../../Utils/Fonts';
import {COLORS} from '../../Utils/Colors';
import {ms} from 'react-native-size-matters';
import {getOrders, orderScreen} from '../../Redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import {OrderList} from '../../Components';

const Orders = () => {
  const dispatch = useDispatch();
  const loginUser = useSelector(state => state.appData.loginUser);
  const userData = useSelector(state => state.appData.userData);

  console.log('loginuser', loginUser);
  const getData = () => {
    dispatch(getOrders(loginUser.access_token, loginUser.id));
  };

  useEffect(() => {
    dispatch(orderScreen('pending'));
    getData();
  }, []);

  const screenType = useSelector(state => state.appData.orderScreen);
  const Orders = useSelector(state => state.appData.orders);

  console.log('orders', Orders);
  const ordersPending = Orders?.filter(item => {
    return item.status !== 'SUCCESS';
  });
  const ordersSuccess = Orders?.filter(item => {
    return item.status === 'SUCCESS';
  });

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getData();
    setRefreshing(false);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent
        barStyle={'dark-content'}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: window.width * 0.9,
          marginBottom: ms(20),
        }}>
        <Text style={[styles.textBold, {fontSize: ms(18)}]}>Orders</Text>
        <View style={{flexDirection: 'row'}}>
          {screenType == 'pending' ? (
            <>
              <TouchableOpacity
                onPress={() => {
                  dispatch(orderScreen('pending'));
                }}>
                <Text style={styles.ActivePage}>On Process </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  dispatch(orderScreen('success'));
                }}>
                <Text style={styles.PasivePage}> / Success</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                onPress={() => {
                  dispatch(orderScreen('pending'));
                }}>
                <Text style={styles.PasivePage}>On Process / </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  dispatch(orderScreen('success'));
                }}>
                <Text style={styles.ActivePage}>Success</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="green"
            colors={['green']}
          />
        }>
        {screenType == 'pending' ? (
          <OrderList type={'pending'} data={ordersPending} />
        ) : (
          <OrderList type={'success'} data={ordersSuccess} />
        )}
      </ScrollView>
    </View>
  );
};

export default Orders;
const window = Dimensions.get('window');
const {StatusBarManager} = NativeModules;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: StatusBarManager.HEIGHT + ms(20),
    paddingBottom: Platform.OS === 'ios' ? ms(75) : ms(60),
    alignItems: 'center',
  },
  Box: {
    width: window.width * 0.9,
  },
  textBold: {
    color: COLORS.black,
    fontFamily: FONTS.Bold,
    fontSize: ms(20),
  },
  ActivePage: {
    fontFamily: FONTS.Bold,
    fontSize: ms(16),
    color: COLORS.black,
    borderBottomWidth: 2,
    borderColor: COLORS.red,
  },
  PasivePage: {
    fontFamily: FONTS.Regular,
    color: COLORS.grey,
    fontSize: ms(14),
  },
});
