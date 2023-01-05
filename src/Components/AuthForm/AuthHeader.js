import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ms} from 'react-native-size-matters';
import {authScreen} from '../../Redux/actions';
import {COLORS, FONTS} from '../../Utils';

const AuthHeader = ({screen}) => {
  const dispatch = useDispatch();

  const selectScreen = useSelector(state => state.appData.authScreen);

  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(authScreen(screen));
      }}>
      <Text
        style={[
          selectScreen == screen ? styles.ActivePage : styles.PasivePage,
        ]}>
        {screen}
      </Text>
    </TouchableOpacity>
  );
};

export default AuthHeader;

const styles = StyleSheet.create({
  ActivePage: {
    fontFamily: FONTS.Bold,
    fontSize: ms(18),
    color: COLORS.black,

    borderBottomWidth: ms(4),
    borderColor: COLORS.red,
  },

  PasivePage: {
    fontFamily: FONTS.Regular,
    color: COLORS.grey,
    fontSize: ms(14),
  },
});
