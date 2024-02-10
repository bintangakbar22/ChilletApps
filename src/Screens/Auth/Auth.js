import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  ImageBackground,
  StatusBar,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ms} from 'react-native-size-matters';
import {authScreen, connectionChecker} from '../../Redux/actions';
import {Pattern} from '../../Assets';
import {AuthHeader, LoginForm, RegisterForm} from '../../Components';
import {COLORS, FONTS} from '../../Utils/';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const selectScreen = useSelector(state => state.appData.authScreen);
  const connection = useSelector(state => state.appData.connection);
  const loginUser = useSelector(state => state.appData.loginUser);

  useEffect(() => {
    dispatch(connectionChecker);
    dispatch(authScreen('Login'));
    if (loginUser) {
      navigation.replace('MainApp');
    }
  }, [loginUser]);

  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar backgroundColor={'transparent'} translucent />
      <ImageBackground source={Pattern} style={styles.ImageBackground} />
      <ScrollView contentContainerStyle={styles.Box}>
        <View style={styles.SoloAluminium}>
          <Text
            style={[
              styles.ImageSoloAluminium,
              {color: COLORS.red, paddingRight: ms(15)},
            ]}>
            Chillet
          </Text>
          <Text style={[styles.ImageSoloAluminium, {color: COLORS.black}]}>
            Apps
          </Text>
        </View>
        <View style={styles.Card}>
          <View style={styles.Header}>
            <AuthHeader screen={'Login'} />
            <AuthHeader screen={'Register'} />
          </View>
          {selectScreen == 'Login' ? (
            <LoginForm connection={connection} />
          ) : (
            <RegisterForm connection={connection} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const window = Dimensions.get('screen');
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  ImageBackground: {
    position: 'absolute',
    width: window.width * 1,
    height: window.height * 1,
    backgroundColor: COLORS.yellow,
  },
  Box: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: ms(75),
  },
  qiuqiusply: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: ms(20),
  },
  ImageLogo: {
    width: ms(300),
    height: ms(100),
    marginRight: ms(10),
  },
  SoloAluminium: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: ms(25),
  },
  ImageSoloAluminium: {
    fontFamily: FONTS.Regular,
    fontSize: ms(35),
    fontWeight: '700',
    color: COLORS.white,
  },
  Card: {
    backgroundColor: COLORS.white,
    width: window.width * 0.9,
    alignSelf: 'center',
    borderRadius: ms(15),
    paddingVertical: ms(25),
  },
  Header: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: ms(25),
  },
});
