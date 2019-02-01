import * as React from 'react';
import '../styles/ExerciseEvaluation.css';
import CriteriasEvaluation from './CriteriasEvaluation';
import { IExerciseEvaluationProps } from '../../actions/ExerciseEvaluation.Actions';
import * as ExerciseEvaluationActionCreators from '../../actions/ExerciseEvaluation.Actions';
import {bindActionCreators, Dispatch} from 'redux';
import * as _ from 'lodash';
import { connect } from 'react-redux';

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
				<CriteriasEvaluation rankExercise={rankExercise} /*setSave={save => this.saveCriterias = save}*//> 
			</div>
		);
	}
}

const mapStateToProps = (state: any) => ({
	exercise: state.groupEvaluation.selectedExercise,
	performer: state.groupEvaluation.selectedPerformer,
	rankExercises: state.groupEvaluation.rankExercises,
});

const mapDispatchtoProps = (dispatch: Dispatch) =>
	bindActionCreators(_.assign({}, ExerciseEvaluationActionCreators), dispatch);

export default connect(mapStateToProps, mapDispatchtoProps)(ExerciseEvaluation);
