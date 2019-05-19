import * as React from 'react';

import './ExercisesScalesFormSection.css';

import ExercisePicker from './ExercisePicker';
import ExercisesScales from './ExercisesScales';

const ExercisesScalesFormSection = ({ exercisesScales, onChange }) => {
    const handleExercisesScalesChange = (exercisesScales) => onChange(
        exercisesScales.map((exerciseScale, index) => ({
            ...exerciseScale,
            position: index
        }))
    );

    const handleExercisesPicked = (pickedExercisesScales) => handleExercisesScalesChange(
        exercisesScales.concat(pickedExercisesScales)
    );

	return (
        <div className="ExercisesScalesFormSection">
            <div className="header">
                <h2>Exercices</h2>
                <ExercisePicker onPicked={handleExercisesPicked} />
            </div>
            {exercisesScales.length === 0? 
                "Aucuns exercices sélectionnés." :
                <ExercisesScales
                    exercisesScales={exercisesScales}
                    onChange={handleExercisesScalesChange}
                />
            }
        </div>
	);
}

export default ExercisesScalesFormSection;