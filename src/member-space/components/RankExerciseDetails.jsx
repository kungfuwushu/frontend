import React, { useState, useEffect } from 'react';
import ExerciseDetails from './ExerciseDetails';

import { withRouter } from 'react-router';

// import * as api from '../fake-api';

const RankExerciseDetails = ({ match }) => {
    const [ rankExercise, setRankExercise ] = useState(undefined);

    useEffect(() => {
		setRankExercise(undefined);
		// api.RankExercises.byId(match.params.id)
		// 	.then(rankExercise =>
		// 			setRankExercise(rankExercise)
		// 	);
    }, []);

    if (!rankExercise)
        return(<div>Loading...</div>);
    return (
        <ExerciseDetails 
			rankExercise={rankExercise}
		/>
    );
}

export default withRouter(RankExerciseDetails);