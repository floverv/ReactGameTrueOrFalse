import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {

  let [points, setPoints] = useState(0)
  let [hp, setHp] = useState(3)
  let [jokers, setJokers] = useState(2)
  const questions = require("./questions.json")
  let [round, setRound] = useState(0)
  let [hideButtonNext, setHideButtonNext] = useState(true)
  let [complementary, setComplementary] = useState("")
  let [msgRound, setMsgRound] = useState("")

  const blueColor = "#32a9de"
  const greenColor = "#32de44"
  const redColor = "#de3232"

  const checkResponse = (question, response) => {
    if (question.response === response) {
      setPoints(++points)
      setMsgRound("Gagné !")
      setHideButtonNext(false);
    } else {
      setHp(--hp)
      if (hp > 0) {
        setHideButtonNext(false);
      }
      setMsgRound("Perdu !")
      setComplementary(questions[round].complementary)
    }
  }

  const next = () => {
    setComplementary("")
    setRound(++round)
    setHideButtonNext(true)
    setMsgRound("")
  }

  function Quizz(props) {
    if (hp <= 0) {
      return (<View><Text>Tu as perdu bg</Text></View>)
    }

    if (round > (questions.length-1)) {
      return (<View><Text>Tu as gagné bg</Text></View>)
    }

    return (<View style={styles.container}>
      <Text>Points : {points}</Text>
      <Text>Vie(s) : {hp}</Text>
      <Text style={styles.textRound}>{msgRound}</Text>
      <Text style={styles.questions}>{questions[round].question}</Text>
      <Text>{complementary}</Text>
      <View>
        <Button
          title="True"
          color={greenColor}
          onPress={() => checkResponse(questions[round], true)} />
        <Button
          title="False"
          color={redColor}
          onPress={() => checkResponse(questions[round], false)} />
      </View>
      
    </View>)
  }

  function NextButton(props) {
    if (hideButtonNext == false) {
      return (<View style = {styles.nextButton}>
        <Button 
          title="Next" 
          color={blueColor}
          onPress={() => next()}
          />
        </View>)
    } else {
      return (<View></View>)
    }
  }

  return (
  <View>
    <Quizz style={styles.container}/>
    <NextButton/>
  </View>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50
  },
  textRound: {
    fontWeight: "Bold",
    fontSize: 40,
    marginTop: 15,
    marginBottom: 15
  },
  questions: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20
  },
  nextButton: {
    marginTop: 30,
    marginRight: 15,
    marginLeft: 15
  }
});