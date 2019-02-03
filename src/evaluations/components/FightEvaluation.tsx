import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import * as _ from 'lodash';
import { connect } from 'react-redux';

import { IFightEvaluationProps } from '../../actions/FightEvaluation.Actions';
import * as FightEvaluationActionCreators from '../../actions/FightEvaluation.Actions';

import { Button } from 'antd';

import '../styles/FightEvaluation.css';

import CriteriasEvaluation from './CriteriasEvaluation';
import Timer from './Timer';

interface FightEvaluationState {
	currentRoundIndex: number;
}

class FightEvaluation extends React.Component<IFightEvaluationProps, FightEvaluationState>{
	private criteriasEvaluationRef = React.createRef<CriteriasEvaluation>();
	
	constructor(props: any) {
		super(props);
		this.state = {
			currentRoundIndex: 0
		}
	}

    private filterRankCriterias(rankExercise: any) {
		const { rankCriterias } = this.props;
        if (!rankExercise)
            return [];
        return rankCriterias.filter((rankCriteria: any) =>
            rankCriteria.rankExerciseId == rankExercise.id
        );
	}
	
	private previousRound() {
		this.setState({
			currentRoundIndex: this.state.currentRoundIndex - 1
		});
	}

	private nextRound() {
		this.setState({
			currentRoundIndex: this.state.currentRoundIndex + 1
		});
	}

    private saveResult() {
        this.criteriasEvaluationRef.current!.getScores();
        console.log("saving fight result");
    }

    componentWillUnmount() {
        this.saveResult();
    }

    componentWillUpdate() {
        this.saveResult();
        this.criteriasEvaluationRef.current!.resetScores();
    }

	render() {
		const { rankExercise } = this.props;
		const { currentRoundIndex } = this.state;
		const rankCriterias= this.filterRankCriterias(rankExercise);
		return (
			<div className="FightEvaluation">
				<h1>Reprise {currentRoundIndex + 1}</h1>
				<Timer />
				<CriteriasEvaluation rankCriterias={rankCriterias}/>
				<div className="Buttons">
					{currentRoundIndex > 0 ? <Button onClick={() => this.previousRound()}>Reprise Précédente</Button> : ''}
					{currentRoundIndex < rankExercise.rounds.length ? <Button onClick={() => this.nextRound()}>Reprise suivante</Button> : ''}
				</div>
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
	bindActionCreators(_.assign({}, FightEvaluationActionCreators), dispatch);

export default connect(mapStateToProps, mapDispatchtoProps)(FightEvaluation);