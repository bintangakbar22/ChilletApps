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
} from 'react-native';
import React, {useEffect, useState, useMemo, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// import Carousel from 'react-native-reanimated-carousel';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ms} from 'react-native-size-matters';
import {
  getBanner,
  getProduct,
  clearProduct,
  addWishlist,
  connectionChecker,
  getSpesificProductBuyer,
  getStatusOrderProduct,
  getWishlist,
  getStatusOrder,
  GetNumberCart,
} from '../../Redux/actions';
import {
  CategoryButton,
  HomeShimmer,
  Input,
  ProductCard,
} from '../../Components';
import {COLORS} from '../../Utils';
import {GET_STATUS_ORDER_PRODUCT} from '../../Redux/types';
import {useIsFocused} from '@react-navigation/native';
import { BBQ, BrownCreamy, ChickenCheese, WhiteCream } from '../../Assets/Images';
// import { ImageBanner } from '../../../api/url';

const Home = ({navigation}) => {
  const CATEGORY = [
    {
      name: 'All Product',
      icon: 'feature-search',
      onclick: () => {
        onCategory('')
      },
    }
  ];
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [currentCategory, setCurrentCategory] = useState('');
  const [isSearch, setIsSearch] = useState('');
  // const [currentPage, setCurrentPage] = useState(1);


  const loginUser = useSelector(state => state.appData.loginUser);

  let banner = useSelector(state => state.appData.banner);
  const product = useSelector(state => state.appData.product);


  const connection = useSelector(state => state.appData.connection);
  const Carts = useSelector(state => state.appData.Carts);
  const numberCart = useSelector(state => state.appData.numberCart);
  
  banner = banner?.map(({image_url}) => image_url);


  const onCategory = (category) =>{
    setCurrentCategory('');
    setIsSearch('');
    // setDefault();
    // loginUser && dispatch(getWishlist(loginUser.id));
    // dispatch(getProduct(category, '')).then(() => {
    //   setLoading(false);
    // });
  }
  const onSearch = () => {
    setDefault();
    // dispatch(getProduct(currentCategory, isSearch)).then(() => {
    //   setLoading(false);
    // });
  };

  const setDefault = () => {
    //4setLoading(true);
    dispatch(clearProduct());
    //dispatch(getBanner());
  };

  const getData = () => {
    setLoading(true);
    setIsSearch('');
    setDefault();
    dispatch(GetNumberCart())
    dispatch(getProduct()).then(() => {
      setLoading(false);
    });
    // if(loginUser){
    //   dispatch(getWishlist(loginUser.id));
    // }
    // loginUser &&
    //   dispatch(getStatusOrder(loginUser.access_token)).then(() => {
    //     setLoading(false);
    //   });
  };

  const onRefresh = useCallback(() => {
    getData();
  }, []);

  useEffect(() => {
    setLoading(false);
    if (isFocused) {
      dispatch(connectionChecker()).then(() => {
        // dispatch(getBanner()).then(()=>{ 
          getData();
        // })
      });
    }
    
  }, [connection]);

  useEffect(()=>{
      console.log("cart",{
    numberCart:numberCart,
    Carts:Carts
  })
  },[numberCart])

  const headerComponent = (
    <View style={styles.Layer}>
      <View style={styles.Headers}>
        <Input
          placeholder="Search"
          onChangeText={val => setIsSearch(val)}
          onPress={() => onSearch()}
        />
         {loginUser&&(
          <TouchableOpacity
            style={styles.Wishlist}
            onPress={() =>
              navigation.navigate('Cart')
            }>
            <Icon name={'cart'} size={ms(30)} color={COLORS.black} />
          </TouchableOpacity>
        )}
      </View>
      {/* <Carousel
        loop
        autoPlay={true}
        autoPlayInterval={5000}
        width={window.width * 0.9}
        height={ms(120)}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        data={banner}
        // renderItem={({item}) => (
        //   <Image style={styles.Banner} source={{uri:ImageBanner+ item}} />
        // )}
      /> */}
      {/* <View style={styles.CategoryContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={CATEGORY}
          renderItem={({item}) => (
            <CategoryButton
              name={item.name}
              icon={item.icon}
              onPress={item.onclick}
            />
          )}
          keyExtractor={item => item.name}
        />
      </View> */}
    </View>
  );

  const renderItem = ({item}) => (
    <ProductCard
      onPress={() => {
        if (loginUser) {
          // dispatch(
          //   getSpesificProductBuyer(item.id),
          // ).then(() => {
            navigation.navigate('Detail', {
              product_id:item.id
            })
          // });
        } else {
          navigation.navigate('Auth');
        }
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
    backgroundColor: 'red',
    alignItems: 'center',
    borderBottomRightRadius: ms(20),
    borderBottomLeftRadius: ms(20),
    paddingTop: StatusBarManager.HEIGHT + ms(10),
    marginBottom:ms(10)
  },
  Headers: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Wishlist: {
    marginBottom: ms(20),
    marginLeft: ms(15),
  },
  Banner: {
    backgroundColor: COLORS.lightGrey,
    height: ms(120),
    borderRadius: ms(10),
  },
  CategoryContainer: {
    width: window.width * 0.9,
    flexDirection: 'row',
    marginTop: ms(10),
  },
});
