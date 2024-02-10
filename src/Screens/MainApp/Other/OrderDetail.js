import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Dimensions,
  Image,
  NativeModules,
  Platform,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {Button, Header} from '../../../Components';
import {COLORS, FONTS} from '../../../Utils';
import {useNavigation} from '@react-navigation/native';
import {
  acceptOrder,
  rupiah,
  doneOrder,
  orderSuccess,
} from '../../../Redux/actions';
import {useSelector, useDispatch} from 'react-redux';
import {ms} from 'react-native-size-matters';
// import { ImageProduct, ImageUser } from '../../../../api/url';
import ImagePicker from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import RNFetchBlob from 'rn-fetch-blob';
import {URL, URLImage, URLProduct} from '../../../Utils/Url';
import BottomModal from '../../../Components/Others/BottomModal';

const OrderDetail = ({route}: {route: any}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [ImageSource, setImageSource] = useState(null);
  const [dataImage, setDataImage] = useState(null);
  const [openModal, setopenModal] = useState(false);
  const userData = useSelector(state => state.appData.userData);
  const loginUser = useSelector(state => state.appData.loginUser);

  const data = route.params.dataRoute;

  console.log(data);
  const imagePicker = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setImageSource(response.uri);
        setDataImage(response.data);
        onOpenAccepted();
      }
      console.log('response', response);
    });
  };
  console.log(ImageSource);
  const uploadImageToServer = () => {
    RNFetchBlob.fetch(
      'POST',
      URL + 'user/order/verify/' + data.id,
      {
        Authorization: `Bearer ${loginUser.access_token}`,
        otherHeader: 'foo',
        'Content-Type': 'multipart/form-data',
      },
      [
        {
          name: 'payment',
          filename: 'image.png',
          type: 'image/png',
          data: dataImage,
        },
      ],
    )
      .then(resp => {
        Toast.show({
          type: 'success',
          text1: 'Upload Payment Success!',
        });
        navigation.navigate('Orders');
      })
      .catch(err => {
        Toast.show({
          type: 'error',
          text1: 'Upload Payment Failed!',
        });
      });
  };

  const onDismiss = () => {
    setopenModal(false);
    setImageSource(null);
    setDataImage(null);
  };

  const onOpenAccepted = () => {
    setopenModal(true);
  };

  return (
    <>
      {data && (
        <SafeAreaView style={styles.Container}>
          <StatusBar
            backgroundColor={'transparent'}
            translucent
            barStyle={'dark-content'}
          />
          <Header title={'Detail Orders'} navigation={navigation} />
          <ScrollView contentContainerStyle={styles.Box}>
            <View
              style={{
                flexDirection: 'row',
                width: window.width * 0.5,
                alignSelf: 'center',
              }}></View>
            <View
              style={{
                margin: ms(25),
                flexDirection: 'column',
                marginTop: ms(5),
              }}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={[styles.Text, {fontSize: 20}]}>
                  List of Orders
                </Text>
                {data.status == 'PENDING' && (
                  <Text style={[styles.Text, {color: 'orange', fontSize: 17}]}>
                    Pending
                  </Text>
                )}

                {data.status == 'CONFIRMED' && (
                  <Text
                    style={[styles.Text, {color: COLORS.green, fontSize: 17}]}>
                    Confirmed
                  </Text>
                )}
                {data.status == 'VERIFYING' && (
                  <Text
                    style={[styles.Text, {color: COLORS.red, fontSize: 17}]}>
                    Verifying
                  </Text>
                )}
                {data.status === 'PROCESSED' && (
                  <Text
                    style={[styles.Text, {color: COLORS.green, fontSize: 17}]}>
                    Processed
                  </Text>
                )}
                {data.status == 'SENDING' && (
                  <Text
                    style={[styles.Text, {color: COLORS.green, fontSize: 17}]}>
                    Sending
                  </Text>
                )}
                {data.status == 'SUCCESS' && (
                  <Text
                    style={[styles.Text, {color: COLORS.green, fontSize: 17}]}>
                    Success
                  </Text>
                )}
              </View>
              {data.order_item &&
                data.order_item.map(item => {
                  return (
                    <View style={{flexDirection: 'row', marginTop: 24}}>
                      <View>
                        <Image
                          style={styles.image}
                          source={{uri: URLProduct + item.product.image}}
                        />
                      </View>
                      <View style={{flexDirection: 'column', marginLeft: 16}}>
                        <View style={{width: window.width * 0.7}}>
                          <Text style={[styles.textBlack]}>
                            {item.product.name}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text style={styles.textBlack}>
                            {`Rp. ${rupiah(item.price)}`} x {item.quantity}
                          </Text>
                          <Text style={styles.textBlack}>{`Rp. ${rupiah(
                            item.price * item.quantity,
                          )}`}</Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              <View
                style={{
                  width: window.width * 0.9,
                  borderColor: COLORS.grey,
                  borderWidth: 0.5,
                  marginVertical: 8,
                }}
              />
              {data.status == 'PENDING' && (
                <>
                  <Text
                    style={[
                      styles.Text,
                      {
                        fontSize: ms(14.5),
                        alignSelf: 'flex-end',
                        marginTop: ms(5),
                        color: 'orange',
                      },
                    ]}>
                    Waiting confirmation from Admin
                  </Text>
                  <View
                    style={{
                      width: window.width * 0.9,
                      borderColor: COLORS.grey,
                      borderWidth: 0.5,
                      marginVertical: 8,
                    }}
                  />
                </>
              )}
              {data.status == 'VERIFYING' && (
                <>
                  <Text
                    style={[
                      styles.Text,
                      {
                        fontSize: ms(14.5),
                        alignSelf: 'flex-end',
                        marginTop: ms(5),
                        color: COLORS.red,
                      },
                    ]}>
                    Waiting for payment confirmation from Admin
                  </Text>
                  <View
                    style={{
                      width: window.width * 0.9,
                      borderColor: COLORS.grey,
                      borderWidth: 0.5,
                      marginVertical: 8,
                    }}
                  />
                </>
              )}
              {data.status == 'SUCCESS' && (
                <>
                  <Text
                    style={[
                      styles.Text,
                      {
                        fontSize: ms(14.5),
                        alignSelf: 'flex-end',
                        marginTop: ms(5),
                        color: COLORS.green,
                      },
                    ]}>
                    Thanks For Your Order !!
                  </Text>
                  <View
                    style={{
                      width: window.width * 0.9,
                      borderColor: COLORS.grey,
                      borderWidth: 0.5,
                      marginVertical: 8,
                    }}
                  />
                </>
              )}
              {data.status == 'PROCESSED' && (
                <>
                  <Text
                    style={[
                      styles.Text,
                      {
                        fontSize: ms(14.5),
                        alignSelf: 'flex-end',
                        marginTop: ms(5),
                        color: COLORS.green,
                      },
                    ]}>
                    Waiting restaurant to process your food
                  </Text>
                  <View
                    style={{
                      width: window.width * 0.9,
                      borderColor: COLORS.grey,
                      borderWidth: 0.5,
                      marginVertical: 8,
                    }}
                  />
                </>
              )}
              {data.status == 'SENDING' && (
                <>
                  <Text
                    style={[
                      styles.Text,
                      {
                        fontSize: ms(14.5),
                        alignSelf: 'flex-end',
                        marginTop: ms(5),
                        color: COLORS.green,
                      },
                    ]}>
                    Your Order In The Road, Please Wait :D
                  </Text>
                  <View
                    style={{
                      width: window.width * 0.9,
                      borderColor: COLORS.grey,
                      borderWidth: 0.5,
                      marginVertical: 8,
                    }}
                  />
                </>
              )}
              <>
                <Text
                  style={[
                    styles.textBlack,
                    {fontSize: 15, fontFamily: FONTS.Bold},
                  ]}>
                  {userData.name}
                </Text>
                <Text style={[styles.textBlack, {fontSize: 15}]}>
                  {data?.address}, {data?.city}, {data?.province},{' '}
                  {data?.postal}
                </Text>
                <Text style={[styles.textBlack, {fontSize: 15}]}>
                  {data?.telephone}
                </Text>
              </>
              <View
                style={{
                  width: window.width * 0.9,
                  borderColor: COLORS.grey,
                  borderWidth: 0.5,
                  marginVertical: 8,
                }}
              />
              {data.status == 'CONFIRMED' && (
                <>
                  <Text
                    style={[
                      styles.Text,
                      {
                        fontSize: 16,
                        alignSelf: 'flex-start',
                        marginTop: ms(5),
                        color: COLORS.red,
                      },
                    ]}>
                    Please Make Payment within 1 x 24 hours
                  </Text>
                  <Text
                    style={[styles.Text, {fontSize: 20, paddingTop: ms(5)}]}>
                    Mandiri
                  </Text>
                  <Text style={[styles.textBlack, {fontSize: 15}]}>
                    1330015378144
                  </Text>
                  <Text style={[styles.textBlack, {fontSize: 15}]}>
                    a.n Harits Salsabilla
                  </Text>
                  <View
                    style={{
                      width: window.width * 0.9,
                      borderColor: COLORS.grey,
                      borderWidth: 0.5,
                      marginVertical: 8,
                    }}
                  />
                </>
              )}
            </View>
          </ScrollView>
          {data.status == 'INDELIVERY' && (
            <>
              <Button
                caption={'Orders Done'}
                style={{
                  width: window.width * 0.8,
                  height: 50,
                  backgroundColor: COLORS.green,
                  position: 'absolute',
                  bottom: 15,
                }}
                onPress={() => {
                  dispatch(doneOrder(data.Orders.id)).then(() => {
                    navigation.navigate('MainApp');
                  });
                }}
              />
            </>
          )}
          {ImageSource != null && openModal && data.status == 'CONFIRMED' && (
            <BottomModal onDismiss={onDismiss}>
              <View style={{width: window.width, height: ms(440)}}>
                <Text
                  style={[
                    styles.Text,
                    {
                      fontSize: ms(23),
                      alignSelf: 'center',
                      fontFamily: FONTS.Bold,
                    },
                  ]}>
                  Your Payment Proof
                </Text>
                <Image
                  source={{uri: ImageSource}}
                  style={{
                    width: ms(300),
                    height: ms(300),
                    alignSelf: 'center',
                    borderColor: COLORS.grey,
                    borderWidth: ms(2),
                    borderRadius: ms(10),
                    marginTop: ms(15),
                  }}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: ms(10),
                  }}>
                  <Button
                    caption={'Confirm Payment'}
                    style={{
                      width: window.width * 0.55,
                      height: 50,
                      backgroundColor: COLORS.green,
                    }}
                    onPress={() => {
                      uploadImageToServer();
                    }}
                  />
                  <Button
                    caption={'Cancel'}
                    style={{
                      width: window.width * 0.25,
                      height: 50,
                      backgroundColor: COLORS.red,
                    }}
                    onPress={() => {
                      setImageSource(null);
                      setDataImage(null);
                      setopenModal(false);
                    }}
                  />
                </View>
              </View>
            </BottomModal>
          )}
          {data.status == 'Sending' && (
            <Button
              caption={'Order Already Arrived'}
              style={{
                width: window.width * 0.8,
                height: 50,
                backgroundColor: COLORS.green,
                position: 'absolute',
                bottom: ms(15),
              }}
              onPress={() => {
                dispatch(orderSuccess(loginUser.access_token, data.id)).then(
                  () => {
                    navigation.navigate('Orders');
                  },
                );
              }}
            />
          )}
          {ImageSource == null && data.status == 'CONFIRMED' && (
            <Button
              caption={'Upload Payment Proof'}
              style={{
                width: window.width * 0.8,
                height: 50,
                backgroundColor: COLORS.green,
                position: 'absolute',
                bottom: ms(15),
              }}
              onPress={() => {
                imagePicker();
              }}
            />
          )}
        </SafeAreaView>
      )}
    </>
  );
};

export default OrderDetail;
const window = Dimensions.get('window');
const {StatusBarManager} = NativeModules;
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: StatusBarManager.HEIGHT + 20,
    paddingBottom: Platform.OS === 'ios' ? ms(25) : ms(15),
  },
  Box: {
    flexGrow: 1,
    paddingBottom: 25,
  },
  Text: {
    fontSize: 12,
    fontFamily: FONTS.Regular,
    color: COLORS.black,
  },
  image: {
    width: 40,
    height: 40,
    backgroundColor: 'black',
    borderRadius: 12,
  },
  textBlack: {
    color: COLORS.black,
    fontFamily: FONTS.Regular,
    fontSize: 14,
    paddingBottom: 4,
  },
  textGrey: {
    color: COLORS.grey,
    fontFamily: FONTS.Regular,
    fontSize: 12,
    paddingBottom: 4,
  },
  imageUser: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 20,
    backgroundColor: 'black',
  },
});
