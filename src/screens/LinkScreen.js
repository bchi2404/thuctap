import React from "react";
import { StyleSheet, Platform, Image, Text, View, Button } from "react-native";
export default class Main extends React.Component {
  state = { currentUser: null };
  render() {
    const { currentUser } = this.state;
    return (
      <View style={styles.container}>
        <Text>
          tất cả các linh chuyển trang {currentUser && currentUser.email}!
        </Text>
        <Button
          title="Register"
          onPress={() => navigation.navigate("Register")}
        />
        <Button title="Login" onPress={() => navigation.navigate("Login")} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
