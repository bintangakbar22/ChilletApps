import {
  View,
  StatusBar,
  NativeModules,
  Platform,
  Dimensions,
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {rupiah, buyProduct, saveAddress} from '../../Redux/actions';
import {COLORS} from '../../Utils';
import {ms} from 'react-native-size-matters';
import {Button, CartCard, Header, Input} from '../../Components';
import {useNavigation} from '@react-navigation/native';
import {FONTS} from '../../Utils';
import * as yup from 'yup';
import {Formik} from 'formik';

const Checkout = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const loginUser = useSelector(state => state.appData.loginUser);
  const userData = useSelector(state => state.appData.userData);
  const cartId = useSelector(state => state.appData.cartId);

  const appData = useSelector(state => state.appData);

  console.log('appdata', appData);
  const {finalPrice} = route.params;
  const Carts = useSelector(state => state.appData.Carts);
  const cart = Carts.filter(p => {
    return (p.user_id = userData?.id);
  });

  console.log('cart', cart);
  const priceFinal = finalPrice;

  const dataValidation = yup.object().shape({
    name: yup.string().required('Name is Required!'),
    email: yup
      .string()
      .email('Please Enter Valid Email!')
      .required('Email is Required!'),
    phone: yup
      .string()
      .required('Phone Number is Required!')
      .matches(/^[0][0-9]{10,14}$/, 'Please Enter Valid Phone Number'),
    address: yup.string().required('Address is Required!'),
    city: yup.string().required('City is Required!'),
    province: yup.string().required('Province is Required!'),
    postal: yup.string().required('Postal is Required!'),
  });
  console.log('cartId', cartId);
  const goBuy = values => {
    const Orders = cart.map(order => ({
      product_id: order.product.id,
      quantity: order.quantity,
      price: Number(order.price),
      id: order.id,
      cart_id: cartId,
    }));
    const finalData = {
      ...values,
      payment_method: 'transfer',
      orders: Orders,
    };
    dispatch(buyProduct(finalData, loginUser.access_token)).then(() => {
      const address = {
        ...userData,
        ...values,
      };
      dispatch(saveAddress(address)).then(() => {
        navigation.navigate('MainApp');
      });
    });
  };

  return (
    <Formik
      initialValues={{
        name: userData?.name,
        email: userData?.email,
        phone: userData?.phone ? userData.phone : '',
        address: userData?.address ? userData.address : '',
        city: userData?.city ? userData.city : '',
        postal: userData?.postal ? userData.postal : '',
        province: userData?.province ? userData.province : '',
      }}
      validationSchema={dataValidation}
      onSubmit={values => goBuy(values)}>
      {({handleChange, handleBlur, handleSubmit, values, errors}) => (
        <View style={styles.Container}>
          <StatusBar
            barStyle={'dark-content'}
            backgroundColor={'transparent'}
            translucent
          />
          <Header navigation={navigation} title={'Checkout'} />
          <ScrollView contentContainerStyle={{marginHorizontal: 20}}>
            <Text style={[styles.Text, {fontSize: 18}]}>List Products</Text>

            <View style={styles.FlatlistContainer}>
              {cart.map((item, key) => (
                <CartCard
                  data={item}
                  label={'checkout'}
                  style={{width: window.width * 0.85}}
                  key={key}
                />
              ))}
            </View>

            <View
              style={{
                width: window.width * 0.9,
                borderColor: COLORS.grey,
                borderWidth: 0.5,
                marginVertical: 10,
                flexDirection: 'column',
              }}
            />
            <Text style={[styles.Text, {fontSize: 15}]}>Shipping Address</Text>
            <View
              style={{
                width: window.width * 0.9,
                borderColor: COLORS.grey,
                borderWidth: 0.5,
                marginVertical: 8,
              }}
            />
            {/* <Text style={[styles.TextPrice]}>Name : {userData.name}</Text> */}
            <Text style={[styles.TextPrice, {paddingVertical: ms(10)}]}>
              Email : {userData.email}
            </Text>
            {/* <Text style={[styles.Text,{fontSize:15,color:COLORS.red,paddingBottom:ms(10)}]} >Fill up this Data!</Text> */}
            <Input
              icon={'account-outline'}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              placeholder={'Name'}
              error={errors.name}
              Checkout
            />
            <Input
              icon={'phone-outline'}
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              value={values.phone}
              placeholder={'Phone Number'}
              error={errors.phone}
              Checkout
            />
            <Input
              icon={'home-outline'}
              onChangeText={handleChange('address')}
              onBlur={handleBlur('address')}
              value={values.address}
              placeholder={'Address'}
              error={errors.address}
              Checkout
            />
            <Input
              icon={'city-variant-outline'}
              onChangeText={handleChange('city')}
              onBlur={handleBlur('city')}
              value={values.city}
              placeholder={'City'}
              error={errors.city}
              Checkout
            />
            <Input
              icon={'city-variant-outline'}
              onChangeText={handleChange('province')}
              onBlur={handleBlur('province')}
              value={values.province}
              placeholder={'Province'}
              error={errors.province}
              Checkout
            />
            <Input
              icon={'city-variant-outline'}
              onChangeText={handleChange('postal')}
              onBlur={handleBlur('postal')}
              value={values.postal}
              placeholder={'Postal Code'}
              error={errors.postal}
              Checkout
              numeric
            />
            <View
              style={{
                width: window.width * 0.9,
                borderColor: COLORS.grey,
                borderWidth: 0.5,
                marginVertical: 8,
              }}
            />
            <View style={{height: ms(50)}} />
          </ScrollView>
          <View style={styles.Bottom}>
            <View style={{flexDirection: 'column'}}>
              <Text style={[styles.Text, {fontSize: ms(16)}]}>Total Price</Text>
              <Text style={[styles.TextPrice]}>Rp. {rupiah(priceFinal)}</Text>
            </View>
            {values.city !== '' &&
            values.address !== '' &&
            values.postal !== '' &&
            values.phone !== '' &&
            values.province !== '' ? (
              <Button
                style={{
                  width: window.width * 0.35,
                  marginTop: 0,
                  height: 50,
                  backgroundColor: COLORS.green,
                }}
                caption={'Order'}
                onPress={handleSubmit}
              />
            ) : (
              <Button
                style={{
                  width: window.width * 0.35,
                  marginTop: 0,
                  height: 50,
                  backgroundColor: COLORS.grey,
                }}
                caption={'Order'}
                disabled
              />
            )}
          </View>
        </View>
      )}
    </Formik>
  );
};

export default Checkout;

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
  },
  Text: {
    fontFamily: FONTS.Bold,
    color: COLORS.black,
  },
  TextPrice: {
    fontFamily: FONTS.SemiBold,
    color: COLORS.grey,
    fontSize: ms(14),
  },
  Bottom: {
    width: window.width * 1.0,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: COLORS.white,
    padding: ms(14),
    paddingTop: ms(8),
    elevation: ms(10),
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: ms(0.5),
    shadowRadius: ms(4),
    justifyContent: 'space-between',
  },
});
