import * as React from 'react'
import { bindActionCreators, Dispatch } from 'redux';
import * as _ from 'lodash';
import { connect } from 'react-redux';

import { IPhysicalEvaluationProps } from '../../actions/PhysicalEvaluation.Actions';
import * as PhysicalEvaluationActionCreators from '../../actions/PhysicalEvaluation.Actions';

import { Input } from 'antd';

class PhysicalEvaluation extends React.Component<IPhysicalEvaluationProps>{
	private inputRef = React.createRef<Input>();

    private saveResult() {
        this.inputRef.current!.input.value;
        console.log("saving physical result");
    }

    componentWillUnmount() {
        this.saveResult();
    }

    componentWillUpdate() {
        this.saveResult();
        // reset score
    }

    render(){
        const { rankExercise } = this.props;
        return (
           	<div className="PhysicalEvaluation">
           		<Input type="number" name="score"/>/{rankExercise.measurementUnit}
          	</div>
        );
    }
}

const mapStateToProps = (state: any) => ({
	exercise: state.groupEvaluation.selectedExercise,
	performer: state.groupEvaluation.selectedPerformer,
	rankCriterias: state.groupEvaluation.rankCriterias,
});

const mapDispatchtoProps = (dispatch: Dispatch) =>
	bindActionCreators(_.assign({}, PhysicalEvaluationActionCreators), dispatch);

export default connect(mapStateToProps, mapDispatchtoProps)(PhysicalEvaluation);