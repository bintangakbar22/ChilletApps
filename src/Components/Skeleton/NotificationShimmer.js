import {View, ScrollView, Dimensions, NativeModules} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {ms} from 'react-native-size-matters';

const NotificationShimmer = () => {
  const window = Dimensions.get('window');

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        alignItems: 'center',
      }}>
      <SkeletonPlaceholder>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
          <View
            key={i => i}
            style={{
              flexDirection: 'row',
              width: window.width * 0.9,
              marginTop: ms(20),
            }}>
            <View
              style={{width: ms(40), height: ms(40), borderRadius: ms(10)}}
            />
            <View style={{flex: 1, marginHorizontal: ms(10)}}>
              <View
                style={{width: ms(150), height: ms(15), borderRadius: ms(10)}}
              />
              <View
                style={{
                  width: ms(100),
                  height: ms(15),
                  borderRadius: ms(10),
                  marginVertical: ms(5),
                }}
              />
              <View
                style={{width: ms(125), height: ms(15), borderRadius: ms(10)}}
              />
            </View>
            <View
              style={{width: ms(80), height: ms(15), borderRadius: ms(10)}}
            />
          </View>
        ))}
      </SkeletonPlaceholder>
    </ScrollView>
  );
};

export default NotificationShimmer;
