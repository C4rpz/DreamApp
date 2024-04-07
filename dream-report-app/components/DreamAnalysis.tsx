import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { Searchbar } from "react-native-paper";

export default function DreamAnalysis() {
  const [apiResponse, setApiResponse] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleApiRequest = async () => {
    try {
      const apiUrl = "https://api.meaningcloud.com/topics-2.0";
      const language = "fr";
      const apiKey = "766582bac614e94fa04bf7800e9c779d";

      const formdata = new FormData();
      formdata.append("key", apiKey);
      formdata.append("txt", searchQuery);
      formdata.append("lang", language);

      const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      const response = await fetch(apiUrl, requestOptions);
      const responseData = await response.json();
      setApiResponse(responseData);
    } catch (error) {
      console.error("Erreur lors de la requête à l'API MeaningCloud :", error);
    }
  };

  const renderTable = () => {
    if (!apiResponse) {
      return null;
    }

    const conceptsList = apiResponse.concept_list;
    const entitiesList = apiResponse.entity_list;

    return (
      <View>
        <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
          Tableau des données :
        </Text>
        <View style={{ flexDirection: "row", marginBottom: 5 }}>
          <Text style={styles.tableHeader}>Type d'Entrée</Text>
          <Text style={styles.tableHeader}>Pertinence</Text>
          <Text style={styles.tableHeader}>Terme</Text>
          <Text style={styles.tableHeader}>Type Sémantique</Text>
        </View>
        {conceptsList.map((entry, index) => (
          <View key={index} style={{ flexDirection: "row", marginBottom: 5 }}>
            <Text style={styles.tableCell}>Concept</Text>
            <Text style={styles.tableCell}>{entry.relevance}</Text>
            <Text style={styles.tableCell}>{entry.form}</Text>
            <Text style={styles.tableCell}>{entry.sementity.type}</Text>
          </View>
        ))}
        {entitiesList.map((entry, index) => (
          <View key={index} style={{ flexDirection: "row", marginBottom: 5 }}>
            <Text style={styles.tableCell}>Entity</Text>
            <Text style={styles.tableCell}>{entry.relevance}</Text>
            <Text style={styles.tableCell}>{entry.form}</Text>
            <Text style={styles.tableCell}>{entry.sementity.type}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View>
      
      <Searchbar
        style={styles.search}
        placeholder="Rechercher des éléments"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />

      <Button title="Analyser vos rêves" onPress={handleApiRequest} />
      {apiResponse && (
        <View>
          <Text>Résultats de l'analyse :</Text>
          {renderTable()}
        </View>
      )}
    </View>
  );
}

const styles = {
  tableHeader: {
    flex: 1,
    fontWeight: "bold",
    marginRight: 5,
  },
  tableCell: {
    flex: 1,
    marginRight: 5,
  },
  search: {
    marginBottom: 4,
  }
};
