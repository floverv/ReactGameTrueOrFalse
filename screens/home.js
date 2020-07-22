import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


// Composant fonctionnel Welcome
export default function Home({ navigation }) {

    const navigate = (route) => {
        navigation.push(route);
    }

    return (
        <View style={styles.container}>
            <Button
                title='Go to the quizz'
                onPress={() => navigate('Quizz')}
            />
            <Button
                title = 'Options'
                color = 'grey'
                onPress={() => navigate('Options')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    }
})