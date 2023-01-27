import {View} from 'react-native';
import React, {useCallback, useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import * as yup from 'yup';
import {fetchingLogin} from '../../Redux/actions';
import Input from '../Others/Input';
import Button from '../Others/Button';

const LoginForm = ({connection}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const loginUser = useSelector(state => state.appData.loginUser);
  const loginValidation = yup.object().shape({
    email: yup
      .string()
      .email('Please Enter Valid Email!')
      .required('Email is Required!'),
    password: yup
      .string()
      .required('Password is Required!')
  });

  const goLogin = useCallback(values => {
    dispatch(fetchingLogin(values));
  }, []);

  useMemo(() => {
    loginUser && navigation.navigate('MainApp');
  }, [loginUser]);

  return (
    <Formik
      initialValues={{email: '', password: ''}}
      validationSchema={loginValidation}
      onSubmit={values => goLogin(values)}>
      {({handleChange, handleBlur, handleSubmit, values, errors}) => (
        <View>
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
          <Button
            disabled={connection ? false : true}
            caption={'Login'}
            onPress={handleSubmit}
          />
        </View>
      )}
    </Formik>
  );
};

export default LoginForm;
