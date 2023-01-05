import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';
import {ms} from 'react-native-size-matters';
import ButtonIcon from './ButtonIcon';
import {COLORS, FONTS} from '../../Utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Header = ({navigation, title}) => {
  return (
    <View style={styles.Container}>
      {navigation && (
        <ButtonIcon
          icon="keyboard-backspace"
          onPress={() => navigation.goBack()}
          color={COLORS.black}
        />
      )}
      <Text style={styles.Title}>{title}</Text>
      {navigation && (
        <Icon name={'keyboard-backspace'} size={25} color={COLORS.white} />
      )}
    </View>
  );
};

export default Header;

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: window.width * 0.05,
    marginBottom: ms(15),
  },
  Title: {
    flex: 1,
    fontFamily: FONTS.Bold,
    fontSize: ms(18),
    textAlign: 'center',
    color: COLORS.black,
  },
});
