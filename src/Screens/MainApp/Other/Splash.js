import {View, Image, StatusBar, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {ms} from 'react-native-size-matters';
import {COLORS} from '../../../Utils/Colors';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('MainApp');
    }, 500);
  }, []);

  return (
    <View style={styles.Container}>
      <Image style={styles.Image}  />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Image: {
    width: ms(360),
    height: ms(360),
  },
});
