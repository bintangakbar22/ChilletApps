import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  NativeModules,
  Platform,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux/';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {ms} from 'react-native-size-matters';
import {connectionChecker, goLogout} from '../../Redux/actions';
import {userIcon} from '../../Assets';
import {AkunShimmer, ButtonShadow} from '../../Components';
import {COLORS, FONTS} from '../../Utils';
import {URLImage} from '../../Utils/Url';

const Account = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [loading, setLoading] = useState(true);

  const {connection, loginUser, userData} = useSelector(state => state.appData);

  useEffect(() => {
    if (isFocused) {
      dispatch(connectionChecker()).finally(() => setLoading(false));
    }
  }, [connection, loginUser, isFocused, dispatch]);

  return (
    <View style={styles.Container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
        translucent
      />
      {loading || !connection ? (
        <AkunShimmer />
      ) : (
        <ScrollView contentContainerStyle={styles.Box}>
          <View style={styles.Header}>
            <Text style={styles.Title}>My Account</Text>
            {userData?.photo != null ? (
              <Image
                source={{uri: URLImage + userData?.photo}}
                style={styles.Image}
              />
            ) : (
              <Image source={userIcon} style={styles.Image} />
            )}
          </View>
          <View style={styles.Content}>
            {loginUser && userData ? (
              <>
                <Text style={styles.Name} numberOfLines={1}>
                  {userData.name}
                </Text>
                <ButtonShadow
                  shadowColor={COLORS.yellow}
                  onPress={() => navigation.navigate('About')}
                  icon={'frequently-asked-questions'}
                  caption={'About'}
                />
                <ButtonShadow
                  shadowColor={COLORS.red}
                  onPress={() => {
                    dispatch(goLogout(loginUser?.access_token));
                    navigation.navigate('Auth');
                  }}
                  icon={'logout-variant'}
                  caption={'Logout'}
                />
              </>
            ) : (
              <>
                <ButtonShadow
                  shadowColor={COLORS.black}
                  onPress={() => navigation.navigate('Auth')}
                  icon={'login-variant'}
                  caption={'Login or Register'}
                />
              </>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Account;

const {StatusBarManager} = NativeModules;
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: StatusBarManager.HEIGHT,
    paddingBottom: Platform.OS === 'ios' ? ms(75) : ms(60),
  },
  Box: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: ms(25),
  },
  Header: {
    backgroundColor: COLORS.red,
    width: ms(350),
    height: ms(175),
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottomLeftRadius: ms(10),
    borderBottomRightRadius: ms(10),
  },
  Title: {
    fontFamily: FONTS.Bold,
    fontSize: ms(20),
    color: COLORS.white,
    top: ms(10),
  },
  Image: {
    backgroundColor: COLORS.grey,
    width: ms(120),
    height: ms(120),
    top: ms(50),
    borderRadius: ms(10),
  },
  Content: {
    width: ms(320),
    alignItems: 'center',
    marginTop: ms(65),
  },
  Name: {
    fontFamily: FONTS.Bold,
    fontSize: ms(15),
    color: COLORS.black,
  },
});
