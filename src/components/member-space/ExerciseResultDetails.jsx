import React, { useState, useEffect } from 'react';
import ExerciseDetails from './ExerciseDetails';

import { withRouter } from 'react-router';

import * as api from './fake-api';

import { Loading } from '../custom';

const ExerciseResultDetails = ({ match }) => {
    const [ exerciseResult, setExerciseResult ] = useState(undefined);

    useEffect(() => {
		api.ExerciseResults.byId(match.params.id)
			.then(exerciseResult => 
				setExerciseResult(exerciseResult)
			); 
    }, []);

    if (!exerciseResult)
        return <Loading />;
    return (
        <ExerciseDetails 
			exerciseScale={exerciseResult.exerciseScale}
			exerciseResult={exerciseResult}
		/>
    );
}

export default withRouter(ExerciseResultDetails);