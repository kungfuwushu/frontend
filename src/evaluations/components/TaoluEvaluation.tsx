import * as React from 'react'
import { bindActionCreators, Dispatch } from 'redux';
import * as _ from 'lodash';
import { connect } from 'react-redux';

import { ITaoluEvaluationProps } from '../../actions/TaoluEvaluation.Actions';
import * as TaoluEvaluationActionCreators from '../../actions/TaoluEvaluation.Actions';

import CriteriasEvaluation from './CriteriasEvaluation';

class TaoluEvaluation extends React.Component<ITaoluEvaluationProps>{
    private criteriasEvaluationRef = React.createRef<CriteriasEvaluation>();

    private filterRankCriterias(rankExercise:any) {
		const { rankCriterias } = this.props;
        if (!rankExercise || rankExercise.exercise.type != 'TAOLU')
            return [];
        return rankCriterias.filter((rankCriteria: any) =>
            rankCriteria.rankExerciseId == rankExercise.id
        );
    }

    private saveResult() {
        this.criteriasEvaluationRef.current!.getScores();
        console.log("saving taolu result");
    }

    componentWillUnmount() {
        this.saveResult();
    }

    componentWillUpdate() {
        this.saveResult();
        this.criteriasEvaluationRef.current!.resetScores();
    }

    render(){
        const { rankExercise } = this.props;
        return (
            <CriteriasEvaluation
                rankCriterias={this.filterRankCriterias(rankExercise)}
                ref={this.criteriasEvaluationRef}
            />
        );
    }
}

const mapStateToProps = (state: any) => ({
	exercise: state.groupEvaluation.selectedExercise,
	performer: state.groupEvaluation.selectedPerformer,
	rankCriterias: state.groupEvaluation.rankCriterias,
});

const mapDispatchtoProps = (dispatch: Dispatch) =>
	bindActionCreators(_.assign({}, TaoluEvaluationActionCreators), dispatch);

export default connect(mapStateToProps, mapDispatchtoProps)(TaoluEvaluation);