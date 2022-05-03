
import React, { Component } from 'react';
import fs from 'flatstore';

import QuestionText from './QuestionText';
import QuestionChoice from './QuestionChoice';

fs.set('state-question', null);
fs.set('state-choices', null);
fs.set('state-category', null);

let choiceTable = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'
]

class Question extends Component {
    constructor(props) {
        super(props);

        this.prevQuestion = null;

        fs.subscribe('state-question', this.onQuestionChange.bind(this));
        let question = fs.get('state-question') || '';
        this.state = { question };
    }

    onQuestionChange() {
        let question = fs.get('state-question');
        if (!question || question.length == 0)
            return;

        fs.set('choice', null);

        if (this.prevQuestion != question) {
        }
        else {
            return;
        }

        let choices = fs.get('state-choices');
        this.choicesText = choices.map((choice, index) => {
            let alpha = + choiceTable[index] + ', ';
            alpha = '';
            return ((index == choices.length - 1) ? 'or ' : '') + alpha + choice;
        });

        this.prevQuestion = question;

        this.setState({ question });

    }

    render() {
        let state = fs.get('state');
        let rules = fs.get('rules');

        let choices = state.choices;
        let round = state.round;
        let maxRounds = rules.rounds;
        let question = state.question;

        if (!choices || round > maxRounds) {
            return (<React.Fragment></React.Fragment>)
        }


        return (
            <div className="question vstack-noh  hcenter">
                <QuestionText question={question}></QuestionText>
                <div className="choices vstack-zero vcenter hcenter">
                    {choices.map((choice, index) => (
                        <QuestionChoice key={'qc-' + index} id={index} choiceText={choice}></QuestionChoice>
                    ))}
                </div>
            </div>
        )
    }
}

export default fs.connect(['state-question'])(Question);