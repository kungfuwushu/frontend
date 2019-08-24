import React from 'react';

import './ExerciseDetails.css';

import { Loading } from '../custom';

const ExerciseDetails = ({ exerciseScale, exerciseResult }) => {
    const isResult = !!exerciseResult;

    if (!exerciseScale)
        return <Loading />;
    return (
        <div className={`ExerciseDetails ${isResult ? 'is-result' : ''}`}>
            {exerciseScale.exercise.name}
        </div>
    );
}

export default ExerciseDetails;