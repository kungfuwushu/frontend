import * as React from 'react';
import '../styles/ExerciseEvaluation.css';
import { IExerciseEvaluationProps } from '../../actions/ExerciseEvaluation.Actions';
import * as ExerciseEvaluationActionCreators from '../../actions/ExerciseEvaluation.Actions';
import {bindActionCreators, Dispatch} from 'redux';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import PhysicalEvaluation from './PhysicalEvaluation';
import CriteriasEvaluation from './CriteriasEvaluation';
import FightEvaluation from './FightEvaluation';

interface ExerciseEvaluationProps extends IExerciseEvaluationProps {
	setSave: (save:()=>void) => void
}

class ExerciseEvaluation extends React.Component<ExerciseEvaluationProps> {
    //private saveCriterias: () => void;

	componentDidMount() {
		this.props.setSave(this.save);
	}

	public save() {
		//TODO save exercise
		//this.saveCriterias();
	}
	
    private findRankExercise() {
		const { performer, exercise, rankExercises } = this.props;
        if (!performer || !exercise)
            return undefined;
        return rankExercises.find((rankExercise:any) =>
            rankExercise.exercise.id == exercise.id && rankExercise.rankId == performer.rankId
        );
	}

    private filterRankCriterias(rankExercise:any) {
		const { rankCriterias } = this.props;
        if (!rankExercise || rankExercise.exercise.type != 'TAOLU')
            return [];
        return rankCriterias.filter((rankCriteria: any) =>
            rankCriteria.rankExerciseId == rankExercise.id
        );
    }
	
	private renderRankExercise(rankExercise:any) {
		const { exercise } = this.props;
		switch(exercise.type) {
			case 'TAOLU':
				return <CriteriasEvaluation rankCriterias={this.filterRankCriterias(rankExercise)}/>
			case 'PHYSICAL':
				return <PhysicalEvaluation rankExercise={rankExercise}/>
			case 'FIGHT':
				return <FightEvaluation rankExercise={rankExercise}/>
			default:
				return null;
		}
	}

	render() {
		const rankExercise = this.findRankExercise();
		if (!rankExercise)
			return (<div>Select an exercise and a person.</div>);

		const { exercise } = rankExercise;
		return (
			<div className="ExerciseEvaluation">
				<div className="title">
					<h3 className="exercisename">{exercise.name}</h3>
					<p className="exercisetype">{exercise.type}</p>
				</div>
				<p>{exercise.description}</p>
				<img className="image" src={exercise.image}/>
        		{this.renderRankExercise(rankExercise)}
			</div>
		);
	}
}

const mapStateToProps = (state: any) => ({
	exercise: state.groupEvaluation.selectedExercise,
	performer: state.groupEvaluation.selectedPerformer,
	rankExercises: state.groupEvaluation.rankExercises,
	rankCriterias: state.groupEvaluation.rankCriterias,
});

const mapDispatchtoProps = (dispatch: Dispatch) =>
	bindActionCreators(_.assign({}, ExerciseEvaluationActionCreators), dispatch);

export default connect(mapStateToProps, mapDispatchtoProps)(ExerciseEvaluation);
