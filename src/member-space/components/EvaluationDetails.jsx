import React, { useState, useEffect } from 'react';

import './EvaluationDetails.css';

import ExerciseItem from './ExerciseItem';
import { withRouter } from 'react-router';
import * as api from '../fake-api';

const EvaluationDetails = ({ match }) => {
    const [ evaluation, setEvaluation ] = useState(undefined);
    const [ exercisesResult, setExercisesResult ] = useState([]);

    useEffect(() => {
		const evaluationId = match.params.id;
        Promise.all([
            api.Evaluations.byId(evaluationId),
            api.ExerciseResults.byEvaluationIdAndPerformerId(evaluationId, 1),
        ]).then(([ evaluation, exercisesResult ]) => {
            setEvaluation(evaluation);
            setExercisesResult(exercisesResult);
        });
    }, []);

    if (!evaluation)
        return(<div>Loading...</div>);
    return (
        <div className="EvaluationDetails">
            <h1>{evaluation.name}</h1>
			<div className="exercises">
                {exercisesResult.map((exerciseResult, index) => 
					<ExerciseItem
						rankExercise={exerciseResult.rankExercise}
						exerciseResult={exerciseResult}
						key={index}
					/>
				)}
			</div>
        </div>
    );
}

export default withRouter(EvaluationDetails);