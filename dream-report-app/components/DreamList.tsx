import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Searchbar } from "react-native-paper";


interface Dream {
  dreamTitle: string;
  dreamText: string;
  isLucidDream: boolean;
  date: string;
}

const DreamList: React.FC = () => {
  const [dreams, setDreams] = useState<Dream[]>([]);

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AsyncStorage.getItem("dreamFormDataArray");
        const dreamFormDataArray: Dream[] = data ? JSON.parse(data) : [];
        setDreams(dreamFormDataArray);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };
    AsyncStorage.clear();
    fetchData();
  }, []);

  useEffect(() => {
    const updateComponent = async () => {
      try {
        const data = await AsyncStorage.getItem("dreamFormDataArray");
        const dreamFormDataArray: Dream[] = data ? JSON.parse(data) : [];
        setDreams(dreamFormDataArray);
      } catch (error) {
        console.error("Erreur lors de la mise à jour des données:", error);
      }
    };
    updateComponent();
  }, [dreams]);

  async function deletedreamFormData(index: number) {
    const data = await AsyncStorage.getItem("dreamFormDataArray");
    const dreamFormDataArray: Dream[] = data ? JSON.parse(data) : [];
    dreamFormDataArray.splice(index, 1);
    await AsyncStorage.setItem(
      "dreamFormDataArray",
      JSON.stringify(dreamFormDataArray)
    );
    console.log(dreamFormDataArray);
  }
  const getDreamContainerStyle = (isLucidDream: boolean) => {
    if (isLucidDream) {
      return styles.lucidDreamContainer;
    } else {
      return styles.nightmareContainer;
    }
  };

  const getDreamContainerTextStyle = (isLucidDream: boolean) => {
    if (isLucidDream) {
      return styles.lucidDreamText;
    } else {
      return styles.nightmareText;
    }
  };

  const filteredDreams = dreams.filter(dream =>
    dream.dreamTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dream.dreamText.toLowerCase().includes(searchQuery.toLowerCase())
);

  return (
    <View style={styles.container}>
      {dreams.map((dream, index) => (
        <View
          key={index}
          style={[
            styles.dreamContainer,
            getDreamContainerStyle(dream.isLucidDream),
          ]}
        >
          <Text style={styles.dreamTitle}>{dream.dreamTitle}</Text>
          <Text
            style={[
              styles.dreamText,
              getDreamContainerTextStyle(dream.isLucidDream),
            ]}
          >
            {dream.dreamText}
          </Text>
          <Text style={styles.dreamType}>
            {dream.isLucidDream ? "Lucide" : "Non Lucide"}
          </Text>
          <Button
            title="Supprimer"
            onPress={() => deletedreamFormData(index)}
          ></Button>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginLeft: 1,
    marginRight: 1,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  dreamContainer: {
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "lightgray",
    padding: 8,
    borderRadius: 8,
  },
  lucidDreamContainer: {
    backgroundColor: "#add8e6",
  },
  nightmareContainer: {
    backgroundColor: "#ffcccc",
  },
  dreamTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  dreamText: {
    fontSize: 16,
    marginBottom: 4,
  },
  lucidDreamText: {
    color: "blue",
  },
  nightmareText: {
    color: "red",
  },
  dreamType: {
    fontSize: 14,
    color: "gray",
  },
  searchBar: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "lightgray",
    paddingTop: 5,   
  },
});

export default DreamList;
