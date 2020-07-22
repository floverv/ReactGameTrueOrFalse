import React, { useState } from "react";
import { StyleSheet, Text, View, Picker, AsyncStorage, Button } from 'react-native';


// Composant fonctionnel Welcome
export default function Options(props) {

    const [selectedTheme, setSelectedTheme] = useState(0);
    const [selectedDifficulty, setSelectedDifficulty] = useState(0);
    const [msg, setMsg] = useState("");

    const savechanges = async () => {
        try {
            await AsyncStorage.setItem(
                'theme',
                selectedTheme
            );
            await AsyncStorage.setItem(
                'difficulty',
                selectedDifficulty
            );
            setMsg("Save successfuly")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <Text>Choose the theme :</Text>
            <Picker
                selectedValue={selectedTheme}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedTheme(itemValue)}>
                <Picker.Item label="All themes" value="0" />
                <Picker.Item label="food" value="1" />
                <Picker.Item label="politic" value="2" />
                <Picker.Item label="animal" value="3" />
                <Picker.Item label="capital" value="4" />
            </Picker>
            <Text>Choose the difficulty : </Text>
            <Picker
                selectedValue={selectedDifficulty}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedDifficulty(itemValue)}>
                <Picker.Item label="All difficulties" value="0" />
                <Picker.Item label="Easy" value="1" />
                <Picker.Item label="Normal" value="2" />
                <Picker.Item label="Hardcore" value="3" />
            </Picker>
            <Text style={styles.msg}>{msg}</Text>
            <Button
                title="Save changes"
                onPress={savechanges}
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
    },
    picker: {
        height: 50,
        width: 150,
        marginBottom: 20
    },
    msg: {
        fontSize: 20,
        color: 'green',
        fontWeight: 'bold',
        marginBottom: 20
    }
})