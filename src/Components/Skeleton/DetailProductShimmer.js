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
            height: ms(400),
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
      </SkeletonPlaceholder>
    </ScrollView>
  );
};

export default DetailProductShimmer;
