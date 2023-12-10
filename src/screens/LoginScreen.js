import React, { useState } from 'react';
import { Button, TextInput, View,Text } from 'react-native';
import { loginUser } from './Database';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginHandler = () => {
    loginUser(email, password)
      .then((result) => {
        navigation.navigate('Home')
      })
      .catch((err) => {
        console.log(err);
        alert('Đăng nhập thất bại');
      });
  };

  return (
    <View>
      
      <TextInput placeholder="Email" onChangeText={setEmail} value={email} />
      <TextInput placeholder="Password" onChangeText={setPassword} value={password} secureTextEntry />
      <Button title="Login" onPress={loginHandler} />
      <Button title="Register" onPress={() => navigation.navigate('Register')} />
    </View>
  );
}
