import React, { useState, useEffect } from 'react';
import { Button, TextInput, View, FlatList } from 'react-native';
import { getUsers, insertUser, updateUser, deleteUser } from './Database';

export default function UserManagementScreen() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    getUsers()
      .then((result) => {
        setUsers(result.rows._array);
      })
      .catch((err) => {
        console.log(err);
        alert('Failed to fetch users');
      });
  }, []);

  // You can add handlers for adding, editing and deleting users here

  return (
    <View>
      
      <FlatList data={users} renderItem={({ item }) => (
        <View>
          <Text>{item.name}</Text>
          <Text>{item.email}</Text>
          <Button title="Edit" onPress={() => setSelectedUser(item)} />
          <Button title="Delete" onPress={() => deleteUserHandler(item.id)} />
        </View>
      )} />
      <TextInput placeholder="Name" onChangeText={setName} value={name} />
      <TextInput placeholder="Email" onChangeText={setEmail} value={email} />
      <Button title="Add User" onPress={addUserHandler} />
      {selectedUser && <Button title="Update User" onPress={updateUserHandler} />}
    </View>
  );
}
