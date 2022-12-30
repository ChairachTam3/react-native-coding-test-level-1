import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Card, ListItem, Button, Icon, Input } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

function PokemonScreen() {
  const [pokemon, setPokemon] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pokemonNumber, setPokemonNumber] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    fetchPokemon();
  }, [page]);

  async function fetchPokemon() {
    setLoading(true);
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 10}&limit=10`
    );
    setPokemonNumber(response.data.count);
    setPokemon(response.data.results);
    setLoading(false);
  }

  const handlePageChange = (pageNumber) => {
    if (pageNumber.match(/^[0-9]+$/) || pageNumber.length == 0) {
      setPage(pageNumber);
    }
  };

  return (
    <View>
      <View
        style={{
          alignItems: "flex-end",
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingRight: 5,
        }}
      >
        <Icon
          name="arrow-back-outline"
          type="ionicon"
          onPress={() => {
            page > 1 ? setPage(Number(page) - 1) : setPage(Number(page));
          }}
        />
        <Input
          value={page.toString()}
          maxLength={3}
          onChangeText={handlePageChange}
          containerStyle={{ width: 50, height: 40 }}
        />
        <Icon
          name="arrow-forward-outline"
          type="ionicon"
          onPress={() => {
            console.log("pokemon.length", Math.ceil(pokemonNumber / 10));
            page < Math.ceil(pokemonNumber / 10)
              ? setPage(Number(page) + 1)
              : setPage(Number(page));
          }}
        />
      </View>
      <FlatList
        numColumns={2}
        data={pokemon}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <Card containerStyle={{ width: "42%" }}>
            <Card.Title>{item.name}</Card.Title>
            <Button
              title="View"
              type="outline"
              onPress={() =>
                navigation.navigate("PokemonDetailScreen", {
                  pokemonUrl: item.url,
                })
              }
            />
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 16,
  },
});

export default PokemonScreen;
