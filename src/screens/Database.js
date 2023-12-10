import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('user.db');


export const init = () => {
  
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, email TEXT NOT NULL, password TEXT NOT NULL);',
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const insertUser = (name, email, password) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?);',
        [name, email, password],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const deleteUser = id => {
  const promise = new Promise((resolve, reject) => {
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
  });
  return promise;
};

export const updateUser = (id,name, email, password) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE users SET name = ?, email = ? , password = ? WHERE id = ?',
        [name, email, id, password],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            Alert.alert('User updated successfully!');
            fetchUsers();
          }
        }
      );
    });
  });
  return promise;
};

export const fetchUsers = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM users', [], (_, { rows }) => {
        setUsers(rows._array);
      });
    });
  });
  return promise;
};

export const searchUser = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users WHERE name LIKE ? OR email LIKE ?',
        [`%${search}%`, `%${search}%`],
        (_, { rows }) => {
          setUsers(rows._array);
        }
      );
    });
  });
  return promise;
};


// Tương tự, bạn có thể tạo các hàm updateUser, deleteUser và findUser
