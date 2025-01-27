import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "./src/screens/MainScreen";
import FormScreen from "./src/screens/FormScreen";
import PokemonScreen from "./src/screens/PokemonScreen";
import PokemonDetailScreen from "./src/screens/PokemonDetailScreen";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="FormScreen" component={FormScreen} />
        <Stack.Screen name="PokemonScreen" component={PokemonScreen} />
        <Stack.Screen
          name="PokemonDetailScreen"
          component={PokemonDetailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
