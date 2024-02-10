import {
  View,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  Platform,
  NativeModules,
  StatusBar,
  RefreshControl,
  TouchableOpacity,
  Text,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Carousel from 'react-native-reanimated-carousel';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ms} from 'react-native-size-matters';
import {
  getProduct,
  clearProduct,
  connectionChecker,
  GetNumberCart,
  getCart,
} from '../../Redux/actions';
import {HomeShimmer, Input, ProductCard} from '../../Components';
import {COLORS} from '../../Utils';
import {useIsFocused} from '@react-navigation/native';
import {Banner1, Banner2, Banner3} from '../../Assets/Images';

// import { ImageBanner } from '../../../api/url';

const Home = ({navigation}) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [refreshing] = useState(false);
  const [isSearch, setIsSearch] = useState('');

  let banner = [
    {
      id: 1,
      image_url: Banner1,
    },
    {
      id: 2,
      image_url: Banner2,
    },
    {
      id: 3,
      image_url: Banner3,
    },
  ];

  const product = useSelector(state => state.appData.product);
  const connection = useSelector(state => state.appData.connection);
  const numberCart = useSelector(state => state.appData.numberCart);
  const loginUser = useSelector(state => state.appData.loginUser);

  banner = banner?.map(({image_url}) => image_url);

  const onSearch = () => {
    setDefault();
    dispatch(getProduct(isSearch)).then(() => {
      setIsSearch(isSearch);
      setLoading(false);
    });
  };

  const setDefault = () => {
    setLoading(true);
    dispatch(clearProduct());
  };

  const getData = () => {
    setLoading(true);
    setIsSearch('');
    setDefault();
    dispatch(getCart(loginUser.access_token));
    dispatch(clearProduct()).then(() => {
      setTimeout(() => {
        dispatch(getProduct(isSearch)).then(() => {
          setLoading(false);
        });
      }, 500);
    });
  };

  const onRefresh = useCallback(() => {
    setLoading(true);
    dispatch(clearProduct()).then(() => {
      setTimeout(() => {
        dispatch(getProduct()).then(() => {
          setLoading(false);
        });
      }, 500);
    });
  }, []);

  useEffect(() => {
    setLoading(false);
    if (isFocused) {
      dispatch(connectionChecker()).then(() => {
        getData();
      });
    }
  }, [connection]);

  const headerComponent = (
    <View style={styles.Layer}>
      <View style={styles.Headers}>
        <TouchableOpacity
          style={[
            styles.Wishlist,
            {marginHorizontal: ms(8), marginLeft: ms(0)},
          ]}
          onPress={() => navigation.navigate('About')}>
          <View>
            <Icon
              name={'frequently-asked-questions'}
              size={ms(30)}
              color={COLORS.white}
            />
          </View>
        </TouchableOpacity>
        <Input
          placeholder="Search"
          onChangeText={val => setIsSearch(val)}
          onPress={() => onSearch()}
        />
        <TouchableOpacity
          style={styles.Wishlist}
          onPress={() => navigation.navigate('Cart')}>
          <View>
            <Icon name={'cart'} size={ms(30)} color={COLORS.white} />
            {numberCart > 0 && (
              <View
                style={{
                  backgroundColor: COLORS.red,
                  width: ms(20),
                  height: ms(20),
                  borderRadius: 15,
                  position: 'absolute',
                  left: ms(15),
                  bottom: ms(15),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{}}>{numberCart}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
        {/* )} */}
      </View>
      <Carousel
        loop
        autoPlay={true}
        autoPlayInterval={2500}
        width={window.width * 0.9}
        height={ms(135)}
        mode="stack-horizontal-right"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        data={banner}
        renderItem={({item}) => <Image style={styles.Banner} source={item} />}
      />
    </View>
  );

  const renderItem = ({item}) => (
    <ProductCard
      onPress={() => {
        navigation.navigate('Detail', {
          product_id: item.id,
        });
      }}
      data={item}
    />
  );

  return (
    <View style={styles.Container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'transparent'}
        translucent
      />
      {loading || !connection ? (
        <HomeShimmer />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          numColumns={2}
          data={product}
          renderItem={renderItem}
          refreshing={true}
          onRefresh={() => onRefresh()}
          ListHeaderComponent={headerComponent}
          contentContainerStyle={styles.FlatlistContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => getData()}
              tintColor={COLORS.softDark}
              colors={['green']}
            />
          }
        />
      )}
    </View>
  );
};

export default Home;

const {StatusBarManager} = NativeModules;
const window = Dimensions.get('window');
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingBottom: Platform.OS === 'ios' ? ms(75) : ms(60),
  },
  FlatlistContainer: {
    alignItems: 'center',
  },
  Layer: {
    width: window.width * 1,
    backgroundColor: COLORS.yellow,
    alignItems: 'center',
    borderBottomRightRadius: ms(20),
    borderBottomLeftRadius: ms(20),
    paddingTop: StatusBarManager.HEIGHT + ms(10),
    marginBottom: ms(10),
  },
  Headers: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Wishlist: {
    marginBottom: ms(20),
    marginLeft: ms(5),
  },
  Banner: {
    backgroundColor: COLORS.lightGrey,
    height: ms(120),
    borderRadius: ms(12),
    width: window.width * 0.9,
    borderColor: COLORS.white,
    borderWidth: ms(1.5),
  },
  CategoryContainer: {
    width: window.width * 0.9,
    flexDirection: 'row',
    marginTop: ms(10),
  },
});
