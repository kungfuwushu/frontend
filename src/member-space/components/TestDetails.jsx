import React, { useState, useEffect } from 'react';

import './TestDetails.css';

import ExerciseItem from './ExerciseItem';
import { withRouter } from 'react-router';
import * as api from '../fake-api';

const TestDetails = ({ match }) => {
    const [ test, setTest ] = useState(undefined);
    const [ exercisesResult, setExercisesResult ] = useState([]);

    useEffect(() => {
		const testId = match.params.id;
        Promise.all([
            api.Tests.byId(testId),
            api.ExerciseResults.byTestIdAndPerformerId(testId, 1),
        ]).then(([ test, exercisesResult ]) => {
            setTest(test);
            setExercisesResult(exercisesResult);
        });
    }, []);

    if (!test)
        return(<div>Loading...</div>);
    return (
        <div className="TestDetails">
            <h1>{test.name}</h1>
			<div className="exercises">
                {exercisesResult.map((exerciseResult, index) => 
					<ExerciseItem
						exerciseScale={exerciseResult.exerciseScale}
						exerciseResult={exerciseResult}
						key={index}
					/>
				)}
			</div>
        </div>
    );
}

export default withRouter(TestDetails);