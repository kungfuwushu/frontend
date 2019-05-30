import React from 'react';

import './ExerciseDetails.css';

const ExerciseDetails = ({ exerciseScale, exerciseResult }) => {
    const isResult = !!exerciseResult;

    if (!exerciseScale)
        return(<div>Loading...</div>);
    return (
        <div className={`ExerciseDetails ${isResult ? 'is-result' : ''}`}>
            {exerciseScale.exercise.name}
        </div>
    );
}

export default ExerciseDetails;