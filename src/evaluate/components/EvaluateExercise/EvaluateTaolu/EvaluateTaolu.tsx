import * as React from 'react'
import { bindActionCreators, Dispatch } from 'redux';
import * as _ from 'lodash';
import { connect } from 'react-redux';

import { IEvaluateTaoluProps } from '../../../../actions/evaluate/EvaluateTaolu.Actions';
import * as EvaluateTaoluActionCreators from '../../../../actions/evaluate/EvaluateTaolu.Actions';

import EvaluateCriterion from '../EvaluateCriterion';

class TaoluEvaluation extends React.Component<IEvaluateTaoluProps>{
    private evaluateCriterionRef = React.createRef<EvaluateCriterion>();

    private saveResult() {
        this.evaluateCriterionRef.current!.getScores();
        console.log("saving taolu result");
    }

    componentWillUnmount() {
        this.saveResult();
    }

    componentWillUpdate() {
        this.saveResult();
        this.evaluateCriterionRef.current!.resetScores();
    }

    render(){
        const { rankExercise } = this.props;
        return (
            <EvaluateCriterion
                rankCriterion={rankExercise.rankCriterion}
                ref={this.evaluateCriterionRef}
            />
        );
    }
}

const mapStateToProps = (state: any) => ({
	exercise: state.evaluateGroup.selectedExercise,
	performer: state.evaluateGroup.selectedPerformer,
	rankCriterion: state.evaluateGroup.rankCriterion,
});

const mapDispatchtoProps = (dispatch: Dispatch) =>
	bindActionCreators(_.assign({}, EvaluateTaoluActionCreators), dispatch);

export default connect(mapStateToProps, mapDispatchtoProps)(TaoluEvaluation);