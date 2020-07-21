import React from 'react';
import { View, Text, Button } from 'react-native';

export default function ButtonTrueFalse(props) {

    function checkResponse(question, response) {
        let view = <View><Text>Test</Text></View>;
        /* if (question.response == response) {
          view = <Text color={props.greenColor}>True ! {question.complementary}</Text>
        } else {
          view = <Text color={props.redColor}>False ! {question.complementary}</Text>
        } */
        return (props.setDisplayView = view);
    }

    return (
    <View>
        <Button
            title="True"
            color="#32de44"
            onPress={() => checkResponse(props.question, true)} />
        <Button
            title="False"
            color="#de3232"
            onPress={() => checkResponse(props.question, false)} />
    </View>)
}