import {View, StyleSheet} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux/';
import {ms} from 'react-native-size-matters';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const AkunShimmer = () => {
  const userData = useSelector(state => state.appData.userData);
  const loginUser = useSelector(state => state.appData.loginUser);

  return (
    <View style={styles.Container}>
      <SkeletonPlaceholder>
        <View style={styles.Header}>
          <View style={styles.Image} />
        </View>
        <View style={styles.Content}>
          {loginUser && userData ? (
            <>
              <View style={styles.Name} />
              <View style={styles.ButtonShadow} />
              <View style={styles.ButtonShadow} />
              <View style={styles.ButtonShadow} />
            </>
          ) : (
            <>
              <View style={styles.ButtonShadow} />
            </>
          )}
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

export default AkunShimmer;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
  },
  Header: {
    backgroundColor: '#000',
    width: ms(350),
    height: ms(175),
    justifyContent: 'flex-end',
    alignItems: 'center',

    borderBottomLeftRadius: ms(10),
    borderBottomRightRadius: ms(10),
  },
  Image: {
    width: ms(120),
    height: ms(120),
    top: ms(50),

    borderRadius: ms(10),
  },
  Content: {
    width: ms(350),
    alignItems: 'center',

    marginTop: ms(65),
  },
  Name: {
    width: ms(320),
    height: ms(20),
    marginBottom: ms(10),
  },
  ButtonShadow: {
    width: ms(320),
    height: ms(60),
    marginTop: ms(15),

    borderRadius: ms(10),
  },
});
