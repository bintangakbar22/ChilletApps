import {View, Image, StatusBar, StyleSheet, ImageBackground} from 'react-native';
import React, {useEffect} from 'react';
import {ms} from 'react-native-size-matters';
import {COLORS} from '../../../Utils/Colors';
import { ChilletRound, Pattern } from '../../../Assets';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('MainApp');
    }, 1500);
  }, []);

  return (
    <ImageBackground style={styles.Container} source={Pattern}>
      <Image style={styles.Image} source={ChilletRound} />
    </ImageBackground>
  );
};

export default Splash;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLORS.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Image: {
    width: ms(220),
    height: ms(220),
  },
});
