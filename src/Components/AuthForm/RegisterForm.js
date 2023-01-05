import {View} from 'react-native';
import React, {useCallback,useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import * as yup from 'yup';
import ImagePicker from 'react-native-image-picker';
import {ms} from 'react-native-size-matters';
import {fetchingRegister, updateUserData} from '../../Redux/actions';
import Input from '../Others/Input';
import Button from '../Others/Button';
import ImageShow from '../Others/ImageShow';
import RNFetchBlob from 'rn-fetch-blob';
import { useNavigation } from '@react-navigation/native';
const RegisterForm = ({label, connection}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const loginUser = useSelector(state => state.appData.loginUser);
  const userData = useSelector(state => state.appData.userData);

  const [ImageSource,setImageSource] = useState(null)
  const [dataImage,setDataImage] = useState(null)
  const dataValidation = yup.object().shape({
    name: yup.string().required('Name is Required!'),
    email: yup
      .string()
      .email('Please Enter Valid Email!')
      .required('Email is Required!'),
    showPassword: yup.boolean(),
    password: yup.string().when('showPassword', {
      is: true,
      then: yup
        .string()
        .required('Password is Required!')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
          'Must Contain 8 Characters, One Uppercase, One Lowercase and One Number!',
        ),
    }),
    phone: yup
      .string()
      .required('Phone Number is Required!')
      .matches(/^[0][0-9]{10,14}$/, 'Please Enter Valid Phone Number'),
    address: yup.string().required('Address is Required!'),
    city: yup.string().required('City is Required!'),
  });

  const goRegister = useCallback(values => {
    dispatch(fetchingRegister(values));
  }, []);

  

  const imagePicker = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500
    };
    ImagePicker.launchImageLibrary(options, (response) => {
 
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        setImageSource(response.uri)
        setDataImage(response.data)
      }
    });
  };

  const uploadImageToServer = () => {

    // RNFetchBlob.fetch('POST', url+'auth/user.php?method=uploadPhoto', {
    //   Authorization: "Bearer access-token",
    //   otherHeader: "foo",
    //   'Content-Type': 'multipart/form-data',
    // }, [
    //     { name: 'image', filename: 'image.png', type: 'image/png', data: dataImage },
    //     { name: 'id_user', data: userData.id},
    //   ]).then((resp) => {
    //     var tempMSG = resp.data;
    //     console.log("Upload Berhasil")
    //     setDataImage(null)

    //   }).catch((err) => {
    //     console.log("Upload gagal")
    //     console.log(err)
    //   })

  }

  const goUpdate = (values) => {
    if(dataImage==null){
      dispatch(updateUserData(values, loginUser.id)).then(()=>{navigation.replace("Akun")})
    }else{
      uploadImageToServer()
      dispatch(updateUserData(values, loginUser.id)).then(()=>{navigation.replace("Akun")})
    } 
  }
  return (
    <Formik
      initialValues={
        label
          ? {
              name: userData.full_name,
              email: userData.email,
              phone: userData.phone_number,
              address: userData.address,
              city: userData.city,
            }
          : {
              name: '',
              email: '',
              password: '',
              phone: '',
              address: '',
              city: '',
              showPassword: true,
            }
      }
      validationSchema={dataValidation}
      onSubmit={values => (label ? goUpdate(values) : goRegister(values))}>
      {({handleChange, handleBlur, handleSubmit, values, errors}) => (
        <View>
          {label && (
            <>
            {ImageSource===null ?  
              <ImageShow
                onPress={imagePicker}
                // uri={ImageUser+ userData.image_url}
              />
            :
              <ImageShow
                onPress={imagePicker}
                uri={ImageSource}
              />
            }
            </>
          )}
          <Input
            icon={'account-outline'}
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
            placeholder={'Name'}
            error={errors.name}
          />
          <Input
            icon={'email-outline'}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            placeholder={'Email'}
            error={errors.email}
          />
          {label ? null : (
            <Input
              icon={'lock-outline'}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              placeholder={label ? 'New Password' : 'Password'}
              error={errors.password}
              secureTextEntry={true}
            />
          )}
          <Input
            icon={'phone-outline'}
            onChangeText={handleChange('phone')}
            onBlur={handleBlur('phone')}
            value={values.phone}
            placeholder={'Phone Number'}
            error={errors.phone}
          />
          <Input
            icon={'home-outline'}
            onChangeText={handleChange('address')}
            onBlur={handleBlur('address')}
            value={values.address}
            placeholder={'Address'}
            error={errors.address}
          />
          <Input
            icon={'city-variant-outline'}
            onChangeText={handleChange('city')}
            onBlur={handleBlur('city')}
            value={values.city}
            placeholder={'City'}
            error={errors.city}
          />
          <Button
            disabled={connection ? false : true}
            caption={label ? 'Update' : 'Register'}
            onPress={handleSubmit}
          />
        </View>
      )}
    </Formik>
  );
};

export default RegisterForm;
