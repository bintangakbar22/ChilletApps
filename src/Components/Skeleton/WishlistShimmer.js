import {View, ScrollView, Dimensions} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {ms} from 'react-native-size-matters';

const WishlistShimmer = () => {
  const window = Dimensions.get('window');
  return (
    <ScrollView
      contentContainerStyle={{alignItems: 'center', width: window.width * 1}}>
      <SkeletonPlaceholder>
        <View style={{alignItems: 'center'}}>
          {[1, 2, 3, 4, 5].map(() => (
            <View style={{flexDirection: 'row'}} key={i => i}>
              <View
                style={{
                  width: window.width * 0.4,
                  height: ms(160),
                  alignItems: 'center',
                  margin: ms(10),
                  borderRadius: ms(10),
                }}
              />
              <View
                style={{
                  width: window.width * 0.4,
                  height: ms(160),
                  alignItems: 'center',
                  margin: ms(10),
                  padding: ms(10),
                  borderRadius: ms(10),
                }}
              />
            </View>
          ))}
        </View>
      </SkeletonPlaceholder>
    </ScrollView>
  );
};

export default WishlistShimmer;
