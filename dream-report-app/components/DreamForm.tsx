import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TextInput, Button, Checkbox } from 'react-native-paper';
const { width } = Dimensions.get('window');
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DreamForm() {
    const [dreamTitle, setDreamTitle] = useState('');
    const [dreamText, setDreamText] = useState('');
    const [isLucidDream, setIsLucidDream] = useState(false);
    const [isNightmare, setIsNightmare] = useState(false);

    const generateID = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    const handleDreamSubmission = async () => {
        const dreamID = generateID(); 

        console.log('Rêve soumis:', dreamID, dreamTitle, 'Lucide:', isLucidDream, 'Cauchemar:', isNightmare);

        try {
            setDreamTitle('');
            setDreamText('');
            setIsLucidDream(false);
            setIsNightmare(false);

            const existingData = await AsyncStorage.getItem('dreamFormDataArray');
            const formDataArray = existingData ? JSON.parse(existingData) : [];
            formDataArray.push({ id: dreamID, dreamTitle, dreamText, isLucidDream });
            await AsyncStorage.setItem('dreamFormDataArray', JSON.stringify(formDataArray));
            console.log(
                'AsyncStorage: ',
                AsyncStorage.getItem('dreamFormDataArray')
            );
        } catch (error) {
            console.error('Erreur lors de la sauvegarde des données:', error);
        }
        setDreamText('');
        setIsLucidDream(false);
    };

    return (
        <View style={styles.container}>
            <TextInput
                label="Titre de votre rêve"
                value={dreamTitle}
                onChangeText={(text) => setDreamTitle(text)}
                mode="outlined"
                multiline
                numberOfLines={1}
                style={[styles.input, { width: width * 0.8, alignSelf: 'center' }]}
            />
            <TextInput
                label="Rêve"
                value={dreamText}
                onChangeText={(text) => setDreamText(text)}
                mode="outlined"
                multiline
                numberOfLines={6}
                style={[styles.input, { width: width * 0.8, alignSelf: 'center' }]}
            />
            <View style={styles.checkboxContainer}>
                <Checkbox.Item
                    label="Lucide"
                    status={isLucidDream ? 'checked' : 'unchecked'}
                    onPress={() => setIsLucidDream(!isLucidDream)}
                />
                <Checkbox.Item
                    label="Cauchemar"
                    status={isNightmare ? 'checked' : 'unchecked'}
                    onPress={() => setIsNightmare(!isNightmare)}
                />
            </View>
            <Button mode="contained" onPress={handleDreamSubmission} style={styles.button}>
                Soumettre
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    input: {
        marginBottom: 16,
    },
    checkboxContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 16,
        backgroundColor: 'white',
        borderRadius: 4,
    },
    button: {
        marginTop: 8,
    },
});
