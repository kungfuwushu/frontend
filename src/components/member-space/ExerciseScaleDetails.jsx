import React, { useState, useEffect } from 'react';
import ExerciseDetails from './ExerciseDetails';

import { withRouter } from 'react-router';

import { Loading } from '../custom';

// import * as api from './fake-api';

const ExerciseScaleDetails = ({ match }) => {
    const [ exerciseScale, setExerciseScale ] = useState(undefined);

    useEffect(() => {
		setExerciseScale(undefined);
		// api.ExercisesScales.byId(match.params.id)
		// 	.then(exerciseScale =>
		// 			setExerciseScale(exerciseScale)
		// 	);
    }, []);

    if (!exerciseScale)
        return <Loading />;
    return (
        <ExerciseDetails 
			exerciseScale={exerciseScale}
		/>
    );
}

export default withRouter(ExerciseScaleDetails);