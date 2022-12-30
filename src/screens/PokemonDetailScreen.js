import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image, Button } from "@rneui/themed";
import axios from "axios";

function PokemonDetailScreen({ route, navigation }) {
  const { pokemonUrl } = route.params;
  const [details, setDetails] = useState(null);

  useEffect(() => {
    async function fetchDetails() {
      const response = await axios.get(pokemonUrl);
      setDetails(response.data);
    }

    fetchDetails();
  }, []);

  if (!details) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{details.name}</Text>
      <Image
        style={styles.sprite}
        source={{ uri: details.sprites.front_default }}
      />
      <View style={styles.stats}>
        {details.stats.map((stat) => (
          <View key={stat.stat.name} style={styles.stat}>
            <Text>
              {stat.stat.name}: {stat.base_stat}
            </Text>
          </View>
        ))}
      </View>
      <Button title="Back" type="outline" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  sprite: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  stats: {
    flexDirection: "colum",
    flexWrap: "wrap",
    paddingBottom: 20,
  },
  stat: {
    marginRight: 16,
  },
});

export default PokemonDetailScreen;
