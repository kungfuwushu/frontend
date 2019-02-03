import * as React from 'react';
import '../styles/FightEvaluation.css';
import { Button } from 'antd';
import Timer from './Timer';
import { IFightEvaluationProps } from 'src/actions/FightEvaluation.Actions';
import * as CriteriasEvaluationActionCreators from '../../actions/CriteriasEvaluation.Actions';
import { bindActionCreators, Dispatch } from 'redux';
import * as _ from 'lodash';
import { connect } from 'react-redux';

import CriteriasEvaluation from './CriteriasEvaluation';

interface FightEvaluationState {
	currentRoundIndex: number;
}

class FightEvaluation extends React.Component<IFightEvaluationProps, FightEvaluationState>{
	constructor(props: any) {
		super(props);
		this.state = {
			currentRoundIndex: 0
		}
	}

    private filterRankCriterias(rankRound: any) {
		const { rankCriterias } = this.props;
        if (!rankRound)
            return [];
        return rankCriterias.filter((rankCriteria: any) =>
            rankCriteria.rankExerciseId == rankRound.id
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

	render() {
		const { rankExercise } = this.props;
		const { currentRoundIndex } = this.state;
		const rankCriterias= this.filterRankCriterias(rankExercise.rounds[currentRoundIndex]);
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
	rankCriterias: state.groupEvaluation.rankCriterias
});

const mapDispatchtoProps = (dispatch: Dispatch) =>
	bindActionCreators(_.assign({}, CriteriasEvaluationActionCreators), dispatch);

export default connect(mapStateToProps, mapDispatchtoProps)(FightEvaluation);