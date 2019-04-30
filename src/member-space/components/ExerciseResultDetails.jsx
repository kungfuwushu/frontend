import React, { useState, useEffect } from 'react';
import ExerciseDetails from './ExerciseDetails';

import { withRouter } from 'react-router';

import * as api from '../fake-api';

const ExerciseResultDetails = ({ match }) => {
    const [ exerciseResult, setExerciseResult ] = useState(undefined);

    useEffect(() => {
		api.ExerciseResults.byId(match.params.id)
			.then(exerciseResult => 
				setExerciseResult(exerciseResult)
			); 
    }, []);

    if (!exerciseResult)
        return(<div>Loading...</div>);
    return (
        <ExerciseDetails 
			rankExercise={exerciseResult.rankExercise}
			exerciseResult={exerciseResult}
		/>
    );
}

export default withRouter(ExerciseResultDetails);