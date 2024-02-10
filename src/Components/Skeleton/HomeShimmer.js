import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Platform,
  NativeModules,
} from 'react-native';
import React from 'react';
import {ms} from 'react-native-size-matters';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const HomeShimmer = () => {
  return (
    <ScrollView contentContainerStyle={styles.Container}>
      <SkeletonPlaceholder>
        <View style={styles.Layer}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: ms(15),
            }}>
            <View style={{width: ms(30), height: ms(30), marginRight: ms(15)}} />
            <View
              style={{
                width: window.width * 0.7,
                height: ms(45),
                borderRadius: ms(10),
              }}
            />
            <View style={{width: ms(30), height: ms(30), marginLeft: ms(15)}} />
          </View>
          <View
            style={{
              width: window.width * 0.9,
              height: ms(120),
              borderRadius: ms(10),
            }}
          />
        </View>
        <View style={{alignItems: 'center'}}>
          {[1, 2, 3, 4, 5].map(() => (
            <View style={{flexDirection: 'row'}} key={i => i}>
              <View
                style={{
                  width: window.width * 0.4,
                  height: ms(290),
                  alignItems: 'center',
                  margin: ms(10),
                  borderRadius: ms(10),
                }}
              />
              <View
                style={{
                  width: window.width * 0.4,
                  height: ms(290),
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

export default HomeShimmer;

const {StatusBarManager} = NativeModules;
const window = Dimensions.get('window');
const styles = StyleSheet.create({
  Layer: {
    width: window.width * 1,
    alignItems: 'center',
    paddingTop: StatusBarManager.HEIGHT + ms(10),
    paddingBottom: ms(18),
  },
});
