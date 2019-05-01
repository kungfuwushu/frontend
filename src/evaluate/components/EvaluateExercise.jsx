import React, { useState, useEffect } from 'react';

import './EvaluateExercise.css';

import EvaluatePhysical from './EvaluatePhysical';
import EvaluateFight from './EvaluateFight';
import EvaluateTaolu from './EvaluateTaolu';

const EvaluateExercise = ({ test, performer, exerciseScale }) => {
	const [ exerciseResult, setExerciseResult ] = useState(undefined);

	useEffect(() => {
		// fetch exercise result (if doesn't automatically create one from back-end)
		if (!exerciseScale)
			return;

		var exerciseResult = {
			exerciseScale,
			type: exerciseScale.exercise.type,
		}
		switch (exerciseResult.type) {
			case 'TAOLU':
				exerciseResult.criteriaResults = exerciseScale.criterionScales.map(criteriaScale => ({
					criteriaScale,
					score: undefined,
				}));
				break;
			case 'FIGHT':
				exerciseResult.roundsResult = exerciseScale.roundsScales.map(roundScale => ({
					roundScale,
					criteriaResults: roundScale.criterionScales.map(criteriaScale => ({
						criteriaScale,
						score: undefined,
					})),
				}));
				break;
			case 'PHYSICAL':
				exerciseResult.score = undefined;
				break;
			default:
				break;
		}
		setExerciseResult(exerciseResult);
	}, [exerciseScale, performer]);
	
	if (!exerciseResult)
		return (<div>Exercise not available.</div>);
	
	const { exercise } = exerciseResult.exerciseScale;

	const renderContent = () => {
		const { type } = exercise;
		switch(type) {
			case 'TAOLU':
				return <EvaluateTaolu exerciseResult={exerciseResult} onChange={setExerciseResult} />
			case 'PHYSICAL':
				return <EvaluatePhysical exerciseResult={exerciseResult} onChange={setExerciseResult} />
			case 'FIGHT':
				return <EvaluateFight exerciseResult={exerciseResult} onChange={setExerciseResult} />
			default:
				return type + 'is not a supported type of exercise.';
		}
	}

	return (
		<div className="EvaluateExercise">
			<div className="header">
				<span className="name">{exercise.name}</span>
				<span className="type">{exercise.type}</span>
			</div>
			<div className="body">
				{exercise.description &&
					<p className="description">{exercise.description}</p>
				}
				{exercise.image &&
					<img className="image" src={exercise.image} alt={exercise.name}/>
				}
				{renderContent()}
			</div>
		</div>
	);
}

export default EvaluateExercise;
