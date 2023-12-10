import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

function ProfileScreen() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Lấy thông tin user từ database ở đây
    const fetchUser = async () => {
      try {
        const response = await fetch("YOUR_API_ENDPOINT");
        const user = await response.json();
        setUser(user);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Name: {user.name}</Text>
      <Text>Email: {user.email}</Text>
    </View>
  );
}

export default ProfileScreen;
