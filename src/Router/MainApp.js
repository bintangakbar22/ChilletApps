import React from 'react';
import {Platform,Dimensions} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/Ionicons';
import {ms} from 'react-native-size-matters';
import { useSelector} from 'react-redux';
import {Home, Splash} from '../Screens';
import {COLORS} from '../Utils/Colors';
import Toast from 'react-native-toast-message';
import { AppBar, IconButton, FAB } from "@react-native-material/core";
const Tab = createBottomTabNavigator();

const MainApp = () => {
  const loginUser = useSelector(state => state.appData.loginUser);
  const userType = useSelector(state => state.appData.userType);

  const handleNotLogin = ({navigation}) => ({
    tabPress: e => {
      if (!loginUser) {
        e.preventDefault();
        navigation.navigate('Auth');
        
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
          let iconName;
          if (route.name === 'Home') {
            return <Icon name={'home-outline'} size={ms(27)} color={color} />;
          } else if (route.name === 'Notifikasi') {
            return <Icon name={'bell-outline'} size={ms(22)} color={color} />;
          } else if (route.name === 'Jual') {
            return <Icon name={'plus-circle-outline'} size={ms(22)} color={color} />;
          } else if (route.name === 'DaftarJual') {
            return <Icon name={'view-list-outline'} size={ms(22)} color={color} />;
          } else if (route.name === 'Akun') {
            return <Icon name={'account-outline'} size={ms(27)} color={color} />;
          } else if (route.name === 'Cart') {
            return <FAB
                      icon={props => <Icons name="cart-outline" {...props} size={ms(25)} color={'black'} />}
                      color='yellow'
                      style={{
                        position: 'absolute', 
                        alignSelf: 'center', 
                        bottom: 25, 
                      }}
                      />;
          } else if (route.name === 'Transaksi') {
            return <Icon name={'notebook-outline'} size={ms(22)} color={color} />;
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
          alignSelf:'center',
        },
        tabBarActiveBackgroundColor:COLORS.black
      })}>

        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Notifikasi" component={Home} />
        <Tab.Screen name="Cart" component={Home} />
        <Tab.Screen name="DaftarJual" component={Home} />
        <Tab.Screen name="Akun" component={Home} />

    </Tab.Navigator>
  );
};

export default MainApp;
const window = Dimensions.get('window');