import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('mydb.db');

const App = () => {
 const [id, setId] = useState('');
 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [search, setSearch] = useState('');
 const [users, setUsers] = useState([]);

 useEffect(() => {
    fetchUsers();
 }, []);

 const createUser = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT)'
      );

      tx.executeSql(
        'INSERT INTO users (name, email) VALUES (?, ?)',
        [name, email],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            Alert.alert('User created successfully!');
            setName('');
            setEmail('');
          }
        }
      );
    });
 };

 const fetchUsers = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM users', [], (_, { rows }) => {
        setUsers(rows._array);
      });
    });
 };

 const updateUser = (id, name, email) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE users SET name = ?, email = ? WHERE id = ?',
        [name, email, id],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            Alert.alert('User updated successfully!');
            fetchUsers();
          }
        }
      );
    });
 };

 const deleteUser = id => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM users WHERE id = ?',
        [id],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            Alert.alert('User deleted successfully!');
            fetchUsers();
          }
        }
      );
    });
 };

 const searchUser = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users WHERE name LIKE ? OR email LIKE ?',
        [`%${search}%`, `%${search}%`],
        (_, { rows }) => {
          setUsers(rows._array);
        }
      );
    });
 };

 return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        onChangeText={text => setName(text)}
        value={name}
      />
      <TextInput
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <Button title="Create User" onPress={createUser} />

      <TextInput
        placeholder="Search"
        onChangeText={text => setSearch(text)}
        value={search}
      />
      <Button title="Search User" onPress={searchUser} />

      {users.map(user => (
        <View key={user.id}>
          <Text>Name: {user.name}</Text>
          <Text>Email: {user.email}</Text>
          <TextInput
            placeholder="New Name"
            onChangeText={text => setName(text)}
            value={name}
          />
          <TextInput
            placeholder="New Email"
            onChangeText={text => setEmail(text)}
            value={email}
          />
          <Button
            title="Update User"
            onPress={() => updateUser(user.id, name, email)}
          />
          <Button
            title="Delete User"
            onPress={() => deleteUser(user.id)}
          />
        </View>
      ))}
    </View>
 );
};

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
 },
});

export default App;