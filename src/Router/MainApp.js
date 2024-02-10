import React from 'react';
import {Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ms} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import {Home, Account, Orders} from '../Screens';
import {COLORS} from '../Utils/Colors';
import Toast from 'react-native-toast-message';
const Tab = createBottomTabNavigator();

const MainApp = () => {
  const loginUser = useSelector(state => state.appData.loginUser);

  const handleNotLogin = ({navigation}) => ({
    tabPress: e => {
      if (!loginUser) {
        e.preventDefault();
        navigation.navigate('Auth');
        Toast.show({
          type: 'error',
          text1: 'Please Login Or Register!',
        });
      }
    },
  });

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({color}) => {
          if (route.name === 'Home') {
            return <Icon name={'home-outline'} size={ms(27)} color={color} />;
          } else if (route.name === 'Notifikasi') {
            return <Icon name={'bell-outline'} size={ms(22)} color={color} />;
          } else if (route.name === 'Jual') {
            return (
              <Icon name={'plus-circle-outline'} size={ms(22)} color={color} />
            );
          } else if (route.name === 'Orders') {
            return (
              <Icon name={'view-list-outline'} size={ms(22)} color={color} />
            );
          } else if (route.name === 'Akun') {
            return (
              <Icon name={'account-outline'} size={ms(27)} color={color} />
            );
          } else if (route.name === 'Cart') {
            return <Icon name={'cart'} size={ms(22)} color={color} />;
          } else if (route.name === 'Transaksi') {
            return (
              <Icon name={'notebook-outline'} size={ms(22)} color={color} />
            );
          }
        },
        tabBarActiveTintColor: COLORS.white,
        tabBarInactiveTintColor: COLORS.grey,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: COLORS.black,
          height: ms(60),
          borderTopLeftRadius: ms(30),
          borderTopRightRadius: ms(30),
          paddingHorizontal: ms(20),
          bottom: Platform.OS === 'ios' ? ms(0) : ms(0),
        },
        tabBarItemStyle: {
          height: ms(40),
          marginHorizontal: ms(10),
          alignSelf: 'center',
        },
        tabBarActiveBackgroundColor: COLORS.black,
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Orders" component={Orders} listeners={handleNotLogin} />
      <Tab.Screen name="Akun" component={Account} listeners={handleNotLogin} />
    </Tab.Navigator>
  );
};

export default MainApp;
