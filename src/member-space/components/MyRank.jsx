import React, { useState, useEffect } from 'react';

import './MyRank.css';

import ExerciseItem from './ExerciseItem';

import * as api from '../fake-api';

const MyRank = () => {
    const [ rank, setRank ] = useState(undefined);
    const [ exercisesResult, setExercisesResult ] = useState([]);

    useEffect(() => {
        Promise.all([
            api.Ranks.byId(1),
            api.ExerciseResults.byRankIdAndPerformerId(1, 1),
        ]).then(([ rank, exercisesResult ]) => {
            setRank(rank);
            setExercisesResult(exercisesResult);
        });
    }, []);

    const findExerciseResult = (exerciseScale) => {
        return exercisesResult.find(exerciseResult => exerciseResult.exerciseScale.id = exerciseScale.id);
    }

    if (!rank)
        return(<div>Loading...</div>);
    return (
        <div className="MyRank">
            <h1>Mon grade</h1>
            <div className="rank">
                {rank.image && <img src={rank.image} alt={rank.name} />}
                <span className="name">{rank.name}</span>
                <span className="description">{rank.description}</span>
            </div>
            {rank.exercisesScales.map((exerciseScale, index) => 
                <ExerciseItem
                    exerciseScale={exerciseScale}
                    exerciseResult={findExerciseResult(exerciseScale)}
                    key={index}
                />
            )}
        </div>
    );
}

export default MyRank;