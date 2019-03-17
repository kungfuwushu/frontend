import * as React from 'react'
import { bindActionCreators, Dispatch } from 'redux';
import * as _ from 'lodash';
import { connect } from 'react-redux';

import { IEvaluatePhysicalProps } from '../../../../actions/evaluate/EvaluatePhysical.Actions';
import * as EvaluatePhysicalActionCreators from '../../../../actions/evaluate/EvaluatePhysical.Actions';

import { InputNumber } from 'antd';

class EvaluatePhysical extends React.Component<IEvaluatePhysicalProps>{
    private score?: number;

    private renderMeasurementUnit() {
        const { exercise } = this.props.rankExercise;
        switch(exercise.measurementUnit) {
            case 'METER':
                return 'mètres';
            case 'SECOND':
                return 'secondes';
            default:
                return undefined;
        }
    }

    private saveResult() {
        this.score;
    }

    componentWillUnmount() {
        this.saveResult();
    }

    componentWillUpdate() {
        this.saveResult();
        this.score = undefined;
    }

    render(){
        return (
           	<div className="EvaluatePhysical">
           		<InputNumber value={this.score} onChange={score => this.score = score}/>
                {` (${this.renderMeasurementUnit()})`}
          	</div>
        );
    }
}

const mapStateToProps = (state: any) => ({
	exercise: state.evaluateGroup.selectedExercise,
	performer: state.evaluateGroup.selectedPerformer,
	rankCriterion: state.evaluateGroup.rankCriterion,
});

const mapDispatchtoProps = (dispatch: Dispatch) =>
	bindActionCreators(_.assign({}, EvaluatePhysicalActionCreators), dispatch);

export default connect(mapStateToProps, mapDispatchtoProps)(EvaluatePhysical);