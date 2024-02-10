import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Splash,
  Auth,
  Detail,
  Cart,
  Checkout,
  OrderDetail,
  About,
} from '../Screens';
import MainApp from './MainApp';

const Router = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Splash">
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="MainApp" component={MainApp} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="OrderDetail" component={OrderDetail} />
      <Stack.Screen name="About" component={About} />
    </Stack.Navigator>
  );
};

export default Router;
