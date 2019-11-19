import React, { FC, useState, useEffect } from 'react';

import { Button } from 'antd';

import { Card } from '../custom';

import * as api from '../../api';

import { Exercise } from '../../types';

import './ExercisesList.css';

const ExercisesList: FC<{
    history: any
}> = ({ history }) => {
  // recup exercises
	const [ exercises, setExercises ] = useState<Array<Exercise>>([]);

	useEffect(() => {
		api.Exercises.all()
			.then((exercises: Exercise[]) =>
				setExercises(exercises)
			);
	}, []);

	/*const handleDelete = (programId: number) => () => {
		api.Programs.delete(programId);
		setPrograms(
			programs.filter(program => program.id !== programId)
		)
	}*/

	return (
		<Card className="ExercisesList">
			<div className="header">
				<h2>Exercices</h2>
				<Button
					onClick={() => history.push('/new-exercise')}
					type="primary"
				>
					Créer un nouvel exercice
				</Button>
			</div>
			<div className="table-header">
				<span className="name">Nom</span>
				<span>Description</span>
			</div>
		</Card>
	);
}

export default ExercisesList;
