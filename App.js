import React, {useState}from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {

  let [points, setPoints] = useState(0)
  let [hp, setHp] = useState(3)
  let [jokers, setJokers] = useState(2)
  const questions = require("./questions.json");
  let [round, setRound] = useState(0);

  const blueColor = "#32a9de"
  const greenColor = "#32de44"
  const redColor = "#de3232"
  
  const checkResponse = (question, response) => {
    if (question.response === response) {
      setPoints(++points)
    } else {
      setHp(--hp)
    }
    setRound(++round)
  }

  return (<View style={styles.container}>
    <Text>Points : {points}</Text>
    <Text>Vie(s) : {hp}</Text>
    <Text>{questions[round].question}</Text>
      <Button
          title="True"
          color={greenColor}
          onPress={() => checkResponse(questions[round], true)} />
      <Button
          title="False"
          color={redColor}
          onPress={() => checkResponse(questions[round], false)} />
    <Text>{round}</Text>
  </View>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});