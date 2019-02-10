import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import * as _ from 'lodash';
import { connect } from 'react-redux';

import { IEvaluateFightProps } from '../../../../actions/evaluate/EvaluateFight.Actions';
import * as EvaluateFightActionCreators from '../../../../actions/evaluate/EvaluateFight.Actions';

import { Button } from 'antd';

import './EvaluateFight.css';

import EvaluateCriterias from '../EvaluateCriterias';
import Timer from './Timer';

interface EvaluateFightState {
	currentRoundIndex: number;
}

class EvaluateFight extends React.Component<IEvaluateFightProps, EvaluateFightState>{
	private evaluateCriteriasRef = React.createRef<EvaluateCriterias>();
	
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
        this.evaluateCriteriasRef.current!.getScores();
        console.log("saving fight result");
    }

    componentWillUnmount() {
        this.saveResult();
    }

    componentWillUpdate() {
        this.saveResult();
        this.evaluateCriteriasRef.current!.resetScores();
    }

	render() {
		const { rankExercise } = this.props;
		const { currentRoundIndex } = this.state;
		const rankCriterias= this.filterRankCriterias(rankExercise);
		return (
			<div className="EvaluateFight">
				<h1>Reprise {currentRoundIndex + 1}</h1>
				<Timer />
				<EvaluateCriterias rankCriterias={rankCriterias}/>
				<div className="Buttons">
					{currentRoundIndex > 0 ? <Button onClick={() => this.previousRound()}>Reprise Précédente</Button> : ''}
					{currentRoundIndex < rankExercise.rounds.length ? <Button onClick={() => this.nextRound()}>Reprise suivante</Button> : ''}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: any) => ({
	exercise: state.evaluateGroup.selectedExercise,
	performer: state.evaluateGroup.selectedPerformer,
	rankCriterias: state.evaluateGroup.rankCriterias,
});

const mapDispatchtoProps = (dispatch: Dispatch) =>
	bindActionCreators(_.assign({}, EvaluateFightActionCreators), dispatch);

export default connect(mapStateToProps, mapDispatchtoProps)(EvaluateFight);