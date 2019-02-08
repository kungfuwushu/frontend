import * as React from 'react'
import { bindActionCreators, Dispatch } from 'redux';
import * as _ from 'lodash';
import { connect } from 'react-redux';

import { IEvaluateTaoluProps } from '../../../../actions/evaluate/EvaluateTaolu.Actions';
import * as EvaluateTaoluActionCreators from '../../../../actions/evaluate/EvaluateTaolu.Actions';

import EvaluateCriterias from '../EvaluateCriterias';

class TaoluEvaluation extends React.Component<IEvaluateTaoluProps>{
    private evaluateCriteriasRef = React.createRef<EvaluateCriterias>();

    private filterRankCriterias(rankExercise:any) {
		const { rankCriterias } = this.props;
        if (!rankExercise || rankExercise.exercise.type != 'TAOLU')
            return [];
        return rankCriterias.filter((rankCriteria: any) =>
            rankCriteria.rankExerciseId == rankExercise.id
        );
    }

    private saveResult() {
        this.evaluateCriteriasRef.current!.getScores();
        console.log("saving taolu result");
    }

    componentWillUnmount() {
        this.saveResult();
    }

    componentWillUpdate() {
        this.saveResult();
        this.evaluateCriteriasRef.current!.resetScores();
    }

    render(){
        const { rankExercise } = this.props;
        return (
            <EvaluateCriterias
                rankCriterias={this.filterRankCriterias(rankExercise)}
                ref={this.evaluateCriteriasRef}
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
	bindActionCreators(_.assign({}, EvaluateTaoluActionCreators), dispatch);

export default connect(mapStateToProps, mapDispatchtoProps)(TaoluEvaluation);