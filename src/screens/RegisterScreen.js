import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import {init, insertUser } from './Database';
init()
  .then(() => {
    console.log('Initialized database');
  })
  .catch((err) => {
    console.log('Initializing db failed.');
    console.log(err);
  });
export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerHandler = () => {
    insertUser(name, email, password)
      .then((result) => {
        // Navigate to the login screen
      })
      .catch((err) => {
        console.log(err);
        alert('Failed to register');
      });
  };

  return (
    <View>
      
      <TextInput placeholder="Name" onChangeText={setName} value={name} />
      <TextInput placeholder="Email" onChangeText={setEmail} value={email} />
      <TextInput placeholder="Password" onChangeText={setPassword} value={password} secureTextEntry />
      <Button title="Register" onPress={registerHandler} />
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}
