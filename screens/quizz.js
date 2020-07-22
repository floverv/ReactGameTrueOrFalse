import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';


// Composant fonctionnel Welcome
export default function Quizz(props) {
    const questionsData = require("../questions.json")

    let [points, setPoints] = useState(0)
    let [hp, setHp] = useState(3)
    let [jokers, setJokers] = useState(2)
    let [questions, setQuestions] = useState(questionsData)
    let [round, setRound] = useState(0)
    let [hideButtonNext, setHideButtonNext] = useState(true)
    let [complementary, setComplementary] = useState("")
    let [msgRound, setMsgRound] = useState("")
    let [options, setOptions] = useState(false)

    const blueColor = "#32a9de"
    const greenColor = "#32de44"
    const redColor = "#de3232"

    const _fetchOptions = async () => {
        try {
            
            const theme = await AsyncStorage.getItem('theme');
            const difficulty = await AsyncStorage.getItem('difficulty');

            console.log(theme, difficulty);

            if (theme > 0 ) {
                let newQuestions = questions.filter(q => q.theme == theme);
                await setQuestions(newQuestions);
            }
            if (difficulty > 0) {
                let newQuestions2 = questions.filter(q => q.difficulty == difficulty)
                await setQuestions(newQuestions2)
            }
            setOptions(true)

            console.log(questions);
        } catch (error) {
            // Error retrieving data
            console.log(error);
        }
    };

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

    const NextButton = (props) => {
        if (hideButtonNext == false) {
            return (<View style={styles.nextButton}>
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

    const Quizz = (props) => {
        if (!options) _fetchOptions();
        
        if (hp <= 0) {
            return (<View><Text>Tu as perdu bg</Text></View>)
        }

        if (round > (questions.length - 1)) {
            return (<View><Text>Tu as gagné bg</Text></View>)
        }

        return (<View style={styles.container}>
            <Text>Points : {points}</Text>
            <Text>Vie(s) : {hp}</Text>
            <Text style={styles.textRound}>{msgRound}</Text>
            <Text style={styles.questions}>{questions[round].question}</Text>
            <Text>{complementary}</Text>
            <View style={styles.btn}>
                <Button
                    title="True"
                    color={greenColor}
                    onPress={() => checkResponse(questions[round], true)} />
            </View>
            <View style={styles.btn}>
                <Button
                    title="False"
                    color={redColor}
                    onPress={() => checkResponse(questions[round], false)} />
            </View>

        </View>)
    }

    return (
        <View>
            <Quizz style={styles.container} />
            <NextButton />
        </View>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#fff',
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
    },
    btn: {
        width: 100,
        marginTop: 20
    }
});