import {ScrollView, View, Dimensions} from 'react-native';
import React from 'react';
import {ms} from 'react-native-size-matters';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const DetailProductShimmer = () => {
  const window = Dimensions.get('window');

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
      <SkeletonPlaceholder>
        <View
          style={{
            width: window.width * 1,
            height: ms(250),
            backgroundColor: '#000',
          }}
        />
        <View
          style={{
            width: window.width * 0.9,
            height: ms(40),
            alignSelf: 'center',

            borderBottomLeftRadius: ms(10),
            borderBottomRightRadius: ms(10),
          }}
        />
        <View
          style={{
            width: window.width * 0.9,
            alignSelf: 'center',
            flexDirection: 'row',
            marginTop: ms(20),
            paddingHorizontal: ms(20),
          }}>
          <View style={{width: ms(50), height: ms(50), borderRadius: ms(10)}} />
          <View
            style={{
              marginLeft: ms(10),
              justifyContent: 'center',
            }}>
            <View
              style={{width: ms(230), height: ms(20), marginBottom: ms(4)}}
            />
            <View style={{width: ms(150), height: ms(15)}} />
          </View>
        </View>
        <View style={{width: window.width * 0.8, alignSelf: 'center'}}>
          <View
            style={{
              marginTop: ms(15),
              marginBottom: ms(10),
              width: ms(150),
              height: ms(20),
            }}
          />
          {[1, 2, 3, 4].map(() => (
            <View
              key={i => i}
              style={{
                width: ms(295),
                height: ms(15),
                marginBottom: ms(8),
              }}
            />
          ))}
        </View>
        <View
          style={{
            width: ms(300),
            height: ms(60),
            alignSelf: 'center',
            marginTop: ms(20),

            borderRadius: ms(10),
          }}
        />
      </SkeletonPlaceholder>
    </ScrollView>
  );
};

export default DetailProductShimmer;
