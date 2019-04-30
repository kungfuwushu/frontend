import React from 'react';

import './ExerciseDetails.css';

const ExerciseDetails = ({ rankExercise, exerciseResult }) => {
    const isResult = !!exerciseResult;

    if (!rankExercise)
        return(<div>Loading...</div>);
    return (
        <div className={`ExerciseDetails ${isResult ? 'is-result' : ''}`}>
            {rankExercise.exercise.name}
        </div>
    );
}

export default ExerciseDetails;