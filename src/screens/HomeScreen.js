import React from "react";
import { View, Button } from "react-native";

function HomeScreen({ navigation }) {
  return (
    <View>
      <Button title="Link" onPress={() => navigation.navigate("Link")} />
      <Button
        title="Register"
        onPress={() => navigation.navigate("Register")}
      />
      <Button title="Login" onPress={() => navigation.navigate("Login")} />
      <Button title="Profile" onPress={() => navigation.navigate("Profile")} />
    </View>
  );
}

export default HomeScreen;
