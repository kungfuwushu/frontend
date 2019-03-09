import * as React from 'react';

import './EvaluateExercise.css';

import EvaluatePhysical from './EvaluatePhysical/EvaluatePhysical';
import EvaluateFight from './EvaluateFight';
import EvaluateTaolu from './EvaluateTaolu/EvaluateTaolu';

interface EvaluateExerciseProps{
    rankExercise: any;
}

const EvaluateExercise: React.StatelessComponent<EvaluateExerciseProps> = (props) => {
	const { rankExercise } = props;
	if (!rankExercise)
		return (<div>Exercise not available.</div>);

	const renderRankExercise = (rankExercise: any) => {
		const { type } = rankExercise.exercise;
		switch(type) {
			case 'TAOLU':
				return <EvaluateTaolu rankExercise={rankExercise}/>
			case 'PHYSICAL':
				return <EvaluatePhysical rankExercise={rankExercise}/>
			case 'FIGHT':
				return <EvaluateFight rankExercise={rankExercise}/>
		}
		return type + 'is not a supported type of exercise.';
	}
	
	const { exercise } = rankExercise;
	return (
		<div className="EvaluateExercise">
			<div className="header">
				<span className="name">{exercise.name}</span>
				<span className="type">{exercise.type}</span>
			</div>
			<div className="body">
				{exercise.description?
					<p className="description">{exercise.description}</p> : ''
				}
				{exercise.image?
					<img className="image" src={exercise.image}/> : ''
				}
				{renderRankExercise(rankExercise)}
			</div>
		</div>
	);
}

export default EvaluateExercise;
