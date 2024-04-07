import {ImageBackground, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import DreamForm from '@/components/DreamForm';

const image = {uri: 'https://st3.depositphotos.com/4164031/15614/i/450/depositphotos_156147646-stock-photo-star-field-in-deep-space.jpg'};

export default function TabOneScreen() {
    return (
        <View style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <Text style={styles.title}>Quel est votre rêve 🌙</Text>
                <View style={styles.separator} lightColor="#1aaac0" darkColor="rgba(255,255,255,0.1)" />
                <DreamForm/>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color : 'white',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        margin: 0,
    },
});
