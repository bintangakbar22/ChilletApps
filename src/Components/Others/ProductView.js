import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS, FONTS} from '../../Utils';

const ProductView = ({item}) => {
  return (
    <TouchableOpacity
      style={{
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: window.width * 0.4,
        height: 240,
        flexDirection: 'column',
        marginHorizontal: 10,
        marginVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
      }}>
      <Image
        source={{uri: item.image_url}}
        style={{
          width: window.width * 0.35,
          height: 100,
          borderRadius: 8,
          marginTop: 10,
        }}
      />
      <View
        style={{
          flexDirection: 'column',
          marginTop: 5,
          alignItems: 'flex-start',
          width: window.width * 0.33,
          marginHorizontal: 10,
          height: 120,
        }}>
        <Text style={[styles.Text, {fontSize: 15}]}>{item.name}</Text>
        {item.Categories &&
          item.Categories.map(item => {
            return (
              <View style={{alignItems: 'center'}}>
                <Text style={[styles.Text, {fontSize: 10, color: COLORS.grey}]}>
                  {item.name}
                </Text>
              </View>
            );
          })}

        <Text
          style={[
            styles.Text,
            {fontSize: 15, position: 'absolute', bottom: 1},
          ]}>
          Rp {item.base_price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductView;

const styles = StyleSheet.create({
  Text: {
    fontSize: 12,
    fontFamily: FONTS.SemiBold,
    color: COLORS.black,
  },
});
