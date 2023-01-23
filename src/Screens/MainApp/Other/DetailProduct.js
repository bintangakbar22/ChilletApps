import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  StatusBar,
  ImageBackground,
  Dimensions,
  RefreshControl,
  NativeModules,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {COLORS, FONTS} from '../../../Utils';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {
  AddCart,
  connectionChecker,
  deleteProduct,
  rupiah,
  getCart,
  getCategory,
  getSpesificProductBuyer
} from '../../../Redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../../../Components/Others/Button';
import {ButtonIcon, DetailProductShimmer, Input} from '../../../Components';
import {ms} from 'react-native-size-matters';
import { URLProduct } from '../../../Utils/Url';
const Detail = ({route}) => {
  const {product_id} = route.params;

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const connection = useSelector(state => state.appData.connection);
  const loginUser = useSelector(state => state.appData.loginUser);
  const userData = useSelector(state => state.appData.userData);
  const Carts = useSelector(state => state.appData.Carts) 
  
  const productSpesific = useSelector(state => state.appData.productSpesificBuyer);

  var checkCart = Carts?.filter(itemS => {
    return itemS.product_id == productSpesific.id;
  }).map(i => {
    return i.id;
  })

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const addtoCart = (prod) =>{
    dispatch(AddCart(prod)).then(()=>{
      navigation.navigate("Home")
    })
  }

  const cekData = () =>{
    setLoading(true);
    dispatch(getSpesificProductBuyer(product_id)).then(()=>{setLoading(false)})
  }
  useEffect(() => {
    if (isFocused) {
      dispatch(connectionChecker());
      cekData();
    }
  }, [connection]);

  const onRefresh = useCallback(() => {
    setLoading(true);
    dispatch(getSpesificProductBuyer(product_id))
    .then(
      ()=>{
        setLoading(false)
        setRefreshing(false);
      })
    
  }, []);

  return (
    <View style={styles.Container}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent
        barStyle={'light-content'}
      />
      {loading || !connection ? (
        <DetailProductShimmer />
      ) : (
        <ScrollView
          contentContainerStyle={styles.Box}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="green"
              colors={['green']}
            />
          }>
          <ImageBackground
            style={styles.Image}
            source={{uri: URLProduct+ productSpesific?.image}}
            >
            <TouchableOpacity style={styles.Header}>
              <ButtonIcon
                icon="keyboard-backspace"
                onPress={() => navigation.goBack()}
                color={COLORS.white}
              />
            </TouchableOpacity>
            <View style={styles.Card}>
              <Text style={styles.Name}>{productSpesific?.name}</Text>
              <Text style={styles.Price}>
                {`Rp. ${rupiah(productSpesific?.price)}`}
              </Text>
            </View>
          </ImageBackground>
          <View style={styles.Description}>
            <Text style={styles.SubTitle}>Description</Text>
            <Text style={styles.DescriptionText}>
              {productSpesific?.description}
            </Text>
            <Text style={styles.SubTitle}>Stock</Text>
            <Text style={styles.DescriptionText}>
              {productSpesific?.stock}
            </Text>
          </View>
          <View style={styles.Button}>
                {/* {checkCart?.length!=0  ? (
                  <Button
                    caption={'Already in Cart'}
                    style={{width: window.width * 0.9,backgroundColor:COLORS.grey}}
                    disabled
                  />
                ) : ( */}
                  <Button
                    caption={'Add to Cart'}
                    style={{width: window.width * 0.9,backgroundColor:COLORS.primaryBlue}}
                    onPress={() => {
                      addtoCart(productSpesific);
                    }}
                  />
                {/* )} */}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Detail;
const {StatusBarManager} = NativeModules;
const window = Dimensions.get('window');
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingBottom: Platform.OS === 'ios' ? ms(25) : ms(10),
  },
  Box: {
    flexGrow: 1,
    alignItems: 'center',
  },
  Image: {
    backgroundColor: COLORS.lightGrey,
    width: window.width * 1,
    height: ms(250),

    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: StatusBarManager.HEIGHT + ms(10),
    paddingHorizontal: ms(20),

    resizeMode: 'cover',
  },
  Header: {
    width: ms(45),
    padding: ms(10),
    backgroundColor: COLORS.grey,
    borderRadius: ms(50),
  },
  Card: {
    backgroundColor: COLORS.white,
    width: window.width * 0.9,
    top: ms(35),
    paddingHorizontal: ms(20),
    paddingVertical: ms(15),
    borderRadius: ms(10),
    elevation: ms(2),
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: ms(0.25),
    shadowRadius: ms(2),
  },
  Name: {
    fontFamily: FONTS.Medium,
    fontSize: ms(16),
    color: COLORS.black,
  },
  CategoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  Category: {
    fontFamily: FONTS.Regular,
    fontSize: ms(12),
    color: COLORS.black,
  },
  Price: {
    fontFamily: FONTS.Bold,
    fontSize: ms(14),
    color: COLORS.black,
  },
  Seller: {
    width: window.width * 0.9,
    marginTop: ms(80),
    paddingHorizontal: ms(20),

    flexDirection: 'row',
  },
  ProfileImage: {
    width: ms(50),
    height: ms(50),
    borderRadius: ms(10),
    backgroundColor: COLORS.lightGrey,
  },
  SellerText: {
    marginLeft: ms(10),
    justifyContent: 'center',
  },
  SellerName: {
    fontFamily: FONTS.Medium,
    fontSize: ms(14),
    color: COLORS.black,
  },
  SellerLocation: {
    fontFamily: FONTS.Regular,
    fontSize: ms(12),
    color: COLORS.black,
  },
  Description: {
    width: window.width * 0.9,
    paddingHorizontal: ms(25),
    marginTop:ms(40)
  },
  SubTitle: {
    fontFamily: FONTS.Medium,
    color: COLORS.black,
    fontSize: ms(15),
    marginTop: ms(15),
    marginBottom: ms(10),
  },
  DescriptionText: {
    fontFamily: FONTS.Regular,
    fontSize: ms(13),
    color: COLORS.black,
    textAlign: 'justify',
  },
  Button: {
    bottom: 0,
    position: 'absolute',
  },
  Text: {
    fontFamily: FONTS.Regular,
    color: COLORS.black,
  },
  textGrey: {
    color: COLORS.grey,
    fontFamily: FONTS.Regular,
    fontSize: 12,
    paddingBottom: 4,
  },
  imageUser: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 20,
    backgroundColor: 'black',
  },
});
