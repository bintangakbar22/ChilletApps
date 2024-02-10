import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {ms} from 'react-native-size-matters';
import {COLORS, FONTS} from '../../Utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Blank = ({caption, onRefresh}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
      }}>
      {caption == 'Empty Cart' ? (
        <Icon name={'cart-off'} size={ms(80)} color={COLORS.red} />
      ) : (
        <Icon name={'circle-off-outline'} size={ms(80)} color={COLORS.red} />
      )}
      <Text
        style={{
          fontFamily: FONTS.SemiBold,
          marginVertical: ms(10),
          color: COLORS.black,
        }}>
        {caption}
      </Text>
      {caption == 'Empty Cart' ? (
        <></>
      ) : (
        <TouchableOpacity
          onPress={onRefresh}
          style={{
            paddingHorizontal: ms(20),
            paddingVertical: ms(10),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: ms(10),
            backgroundColor: COLORS.green,
          }}>
          <Text
            style={{
              color: COLORS.white,
              fontFamily: FONTS.Bold,
              fontSize: ms(14),
            }}>
            Try Again
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Blank;
