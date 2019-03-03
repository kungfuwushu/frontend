import * as React from 'react';
import * as _ from 'lodash';

import { Input, Checkbox } from 'antd';

import { IExercise } from '../../../../state/Exercise';

interface StateExercise {
    exercise : IExercise;
}

export default class RankExercise extends React.Component<{},StateExercise> {
    constructor(props: any) {
        super(props);
        this.state = {
            exercise : {criteria:[]},
        }
    }

    componentWillMount () {
        this.setState({
            exercise : {criteria :["tendre jambe"]},//prendre dans l'API      
        });
    }

    render() {
        return (
            <div>
                {this.state.exercise.criteria.map(criteron => <p> <Checkbox>{criteron.value}</Checkbox>;
                barème : <Input placeholder="Barème" /></p>)}          
            </div>
        )
    };
}
