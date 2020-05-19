import React, { useState } from 'react';
import { withRouter } from 'react-router';

import * as api from '../../api';

import { ExerciseForm } from './ExerciseForm';

import { Loading } from '../custom';

const NewExercise = ({ history }) => {
    const [ exercise, setExercise ] = useState({
        id: undefined,
        name: undefined,
        description: undefined,
        image: undefined,
        type: undefined,
        rounds: [],
        objective: undefined,
        measurementUnit: undefined,
        criterion: []
    });

	const handleSave = () => {
		api.Exercises.create(exercise)
			.then(_ =>
				history.goBack()
			);
    }

    if (!exercise)
        return <Loading />;
	return (
		<ExerciseForm
			title="Nouvel exercice"
			exercise={exercise}
			onChange={setExercise}
			onSave={handleSave}
		/>
	);
}

export default withRouter(NewExercise);
