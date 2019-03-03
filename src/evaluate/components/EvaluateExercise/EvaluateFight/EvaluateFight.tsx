import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import * as _ from 'lodash';
import { connect } from 'react-redux';

import { IEvaluateFightProps } from '../../../../actions/evaluate/EvaluateFight.Actions';
import * as EvaluateFightActionCreators from '../../../../actions/evaluate/EvaluateFight.Actions';

import { Button } from 'antd';

import './EvaluateFight.css';

import EvaluateCriterion from '../EvaluateCriterion';
import Timer from './Timer';

interface EvaluateFightState {
	currentRoundIndex: number;
}

class EvaluateFight extends React.Component<IEvaluateFightProps, EvaluateFightState>{
	private evaluateCriterionRef = React.createRef<EvaluateCriterion>();

    private saveResult() {
        this.evaluateCriterionRef.current!.getScores();
        console.log("saving fight result");
    }

    componentWillUnmount() {
        this.saveResult();
    }

    componentWillUpdate() {
        this.saveResult();
		this.evaluateCriterionRef.current!.resetScores();
    }

	render() {
		const { rankExercise, currentRoundIndex } = this.props;
		const rankCriterion= rankExercise.rankRounds[currentRoundIndex].rankCriterion;
		return (
			<div className="EvaluateFight">
				<h1>Reprise {currentRoundIndex + 1}</h1>
				<Timer />
				<EvaluateCriterion ref={this.evaluateCriterionRef} rankCriterion={rankCriterion}/>
				<div className="roundsNavigation">
					{currentRoundIndex > 0 ? <Button onClick={() => this.props.previousRound()} type="primary">Reprise Précédente</Button> : ''}
					{currentRoundIndex < rankExercise.rankRounds.length - 1 ? <Button onClick={() => this.props.nextRound()} type="primary" className="nextRound">Reprise suivante</Button> : ''}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: any) => ({
	exercise: state.evaluateGroup.selectedExercise,
	performer: state.evaluateGroup.selectedPerformer,
	rankCriterion: state.evaluateGroup.rankCriterion,
	currentRoundIndex: state.evaluateFight.currentRoundIndex,
});

const mapDispatchtoProps = (dispatch: Dispatch) =>
	bindActionCreators(_.assign({}, EvaluateFightActionCreators), dispatch);

export default connect(mapStateToProps, mapDispatchtoProps)(EvaluateFight);