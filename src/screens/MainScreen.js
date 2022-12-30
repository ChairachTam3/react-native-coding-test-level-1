import React from "react";
import { Text, StyleSheet, Button, View } from "react-native";

const MainScreen = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        onPress={() => navigation.navigate("FormScreen")}
        title="Contact Us"
      />
      <Button
        onPress={() => navigation.navigate("PokemonScreen")}
        title="View Catalog"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});

export default MainScreen;
