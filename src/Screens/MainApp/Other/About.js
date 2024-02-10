import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Dimensions,
  NativeModules,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {Button, Header} from '../../../Components';
import {COLORS, FONTS} from '../../../Utils';
import {useNavigation} from '@react-navigation/native';
import {ms} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {sendOnWhatsApp} from '../../../Redux/actions';
import {Kamutahugak} from '../../../Assets/Images';

const About = () => {
  const navigation = useNavigation();
  const url =
    'whatsapp://send?text=' +
    'Hello Harits Salsabila I Wanna Ask Some Questions With Chillet Apps &phone=6285691038590';

  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent
        barStyle={'dark-content'}
      />
      <Header title={'About'} navigation={navigation} />
      <ScrollView style={{flexGrow: 1}}>
        <View
          style={{
            flexDirection: 'column',
            backgroundColor: COLORS.red,
            borderTopLeftRadius: ms(40),
            // height: window.height,
          }}>
          <View
            style={{
              backgroundColor: COLORS.yellow,
              width: window.width * 1,
              borderBottomRightRadius: ms(40),
              borderTopLeftRadius: ms(40),
              padding: ms(10),
            }}>
            <Text
              style={[
                styles.Text,
                {
                  fontSize: ms(15),
                  alignSelf: 'flex-start',
                  marginTop: ms(15),
                  padding: ms(10),
                  fontFamily: FONTS.SemiBold,
                },
              ]}>
              Cara Melakukan Order Pada Aplikasi Chillet :
            </Text>
            <View style={{flexDirection: 'row', padding: ms(5)}}>
              <Icon name={'check'} size={ms(17)} color={COLORS.red} />
              <Text
                style={[
                  styles.Text,
                  {
                    fontSize: ms(13.5),
                    alignSelf: 'flex-start',
                    paddingLeft: ms(5),
                  },
                ]}>
                1. Pilih produk yang diinginkan.
              </Text>
            </View>
            <View style={{flexDirection: 'row', padding: ms(5)}}>
              <Icon name={'check'} size={ms(17)} color={COLORS.red} />
              <Text
                style={[
                  styles.Text,
                  {
                    fontSize: ms(13.5),
                    alignSelf: 'flex-start',
                    paddingLeft: ms(5),
                  },
                ]}>
                2. Tambahkan produk kedalam keranjang belanja
              </Text>
            </View>
            <View style={{flexDirection: 'row', padding: ms(5)}}>
              <Icon name={'check'} size={ms(17)} color={COLORS.red} />
              <Text
                style={[
                  styles.Text,
                  {
                    fontSize: ms(13.5),
                    alignSelf: 'flex-start',
                    paddingLeft: ms(5),
                  },
                ]}>
                3. Register akun anda pada menu My Profile
              </Text>
            </View>
            <View style={{flexDirection: 'row', padding: ms(5)}}>
              <Icon name={'check'} size={ms(17)} color={COLORS.red} />
              <Text
                style={[
                  styles.Text,
                  {
                    fontSize: ms(13.5),
                    alignSelf: 'flex-start',
                    paddingLeft: ms(5),
                  },
                ]}>
                4. Checkout pesanan anda
              </Text>
            </View>
            <ImageBackground
              source={Kamutahugak}
              style={{width: ms(300), height: ms(300), alignSelf: 'center'}}
            />
          </View>
          <View
            style={{
              backgroundColor: COLORS.red,
              width: window.width * 1,
              borderBottomRightRadius: ms(40),
              padding: ms(10),
            }}>
            <Text
              style={[
                styles.Text,
                {
                  fontSize: ms(15),
                  alignSelf: 'flex-start',
                  marginTop: ms(15),
                  padding: ms(10),
                  fontFamily: FONTS.SemiBold,
                },
              ]}>
              Jika ada kendala mengenai pesanan, Silahkan Hubungi :
              +6285691038590
            </Text>
            <Button
              caption={'Contact Chillet via Whatsapp'}
              style={{
                width: window.width * 0.8,
                marginVertical: 15,
                backgroundColor: COLORS.green,
              }}
              styleText={{paddingLeft: ms(8)}}
              onPress={() => {
                sendOnWhatsApp(url);
              }}
              whatsApp
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default About;
const window = Dimensions.get('window');
const {StatusBarManager} = NativeModules;
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: StatusBarManager.HEIGHT + 20,
    // paddingBottom: Platform.OS === 'ios' ? ms(25) : ms(15),
  },
  Box: {
    paddingBottom: 25,
  },
  Text: {
    fontSize: 12,
    fontFamily: FONTS.Regular,
    color: COLORS.white,
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
