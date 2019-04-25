import React from 'react';

import './ExerciseItem.css';

const ExerciseItem = ({ rankExercise, exerciseResult }) => {
    const isResult = !!exerciseResult;
    
    const { exercise } = rankExercise;
    return (
        <div className={`ExerciseItem ${isResult ? 'is-result' : ''}`}>
            <span className="name">{exercise.name}</span>
            <span className="type">{exercise.type}</span>
        </div>
    );
}

export default ExerciseItem;