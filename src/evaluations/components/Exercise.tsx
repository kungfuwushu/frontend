import { Checkbox } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import { Input } from 'antd';
import { IExercise } from 'src/state/Exercise';

interface StateExercise {
    exercise : IExercise;
  }

class Exercise extends React.Component<{},StateExercise> {
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

export default connect(null, null)(Exercise);



