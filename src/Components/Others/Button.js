import React from 'react';
import {Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import {ms} from 'react-native-size-matters';
import {COLORS} from '../../Utils/Colors';
import {FONTS} from '../../Utils/Fonts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Button = ({caption, onPress, disabled, style, styleText, whatsApp}) => {
  return (
    <TouchableOpacity
      style={[
        styles.Container,
        {
          width:
            caption === 'Preview' || caption === 'Posting'
              ? window.width * 0.75
              : window.width * 0.75,
          marginHorizontal: 5,
          backgroundColor: COLORS.red,
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled}>
      {whatsApp && (
        <Icon name={'whatsapp'} size={ms(30)} color={COLORS.white} />
      )}
      <Text style={[styles.Text, styleText]}>{caption}</Text>
    </TouchableOpacity>
  );
};

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#E7E7E7',
    width: window.width * 0.75,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 15,
    marginTop: 10,
    flexDirection: 'row',
  },
  Text: {
    fontFamily: FONTS.Bold,
    fontSize: ms(16),
    color: COLORS.white,
  },
});

export default Button;
