import {View} from 'react-native';
import React, {useCallback,useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {Formik} from 'formik';
import * as yup from 'yup';
import {fetchingRegister} from '../../Redux/actions';
import Input from '../Others/Input';
import Button from '../Others/Button';
import ImagePicker from 'react-native-image-picker';
import ImageShow from '../Others/ImageShow';

const RegisterForm = ({label, connection}) => {
  const dispatch = useDispatch();

  const [ImageSource,setImageSource] = useState(null)
  const [dataImage,setDataImage] = useState(null)
  const userData = useSelector(state => state.appData.userData);

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
    password_confirmation: yup.string().when('showPassword2', {
      is: true,
      then: yup
        .string()
        .required('Confirmation Password is Required!')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
          'Must Contain 8 Characters, One Uppercase, One Lowercase and One Number!',
        ),
    }),
  });

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


  const goRegister = (values) => {
    dispatch(fetchingRegister(values,dataImage));
  };

  return (
    <Formik
      initialValues={
        {
              name: '',
              email: '',
              password: '',
              password_confirmation: '',
              showPassword: true,
              showPassword2: true,
        }
      }
      validationSchema={dataValidation}
      onSubmit={values =>  goRegister(values)}>
      {({handleChange, handleBlur, handleSubmit, values, errors}) => (
        <View>
            <ImageShow
                onPress={imagePicker}
                uri={ImageSource}
            />
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
          <Input
              icon={'lock-outline'}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              placeholder={'Password'}
              error={errors.password}
              secureTextEntry={true}
              isPassword={true}
          />
          <Input
              icon={'lock-outline'}
              onChangeText={handleChange('password_confirmation')}
              onBlur={handleBlur('password_confirmation')}
              value={values.password_confirmation}
              placeholder={'Confirm Password'}
              error={errors.password_confirmation}
              secureTextEntry={true}
              isPassword={true}
          />
          <Button
            disabled={connection ? false : true}
            caption={'Register'}
            onPress={handleSubmit}
          />
        </View>
      )}
    </Formik>
  );
};

export default RegisterForm;
