import React, { useState, useEffect } from 'react';

import './MyRank.css';

import { Progress } from 'antd';
import ExerciseItem from './ExerciseItem';

import * as api from '../../api';
import { isValidated } from '../../utils/ExerciseResult.utils';

const MyRank = () => {
    const [ rank, setRank ] = useState(undefined);
    const [ exercisesResults, setExercisesResults ] = useState([]);

    useEffect(() => {
        Promise.all([
            api.Ranks.byId(1),
            api.ExerciseResults.byMemberIdAndRankId(1, 1),
        ]).then(([ rank, exercisesResults ]) => {
            setRank(rank);
            setExercisesResults(exercisesResults);
            console.log(exercisesResults)
        });
    }, []);

    const findExerciseResult = (exerciseScale) => {
        return exercisesResults.find(exerciseResult => exerciseResult.exerciseScale.id === exerciseScale.id);
    }

    const percentageValidatedExercises = () => {
        return exercisesResults.reduce(
                (sum, exerciseResult) => sum + (isValidated(exerciseResult) ? 1 : 0)
            , 0) / rank.exercisesScales.length * 100;
    }

    if (!rank)
        return(<div>Loading...</div>);
    return (
        <div className="MyRank">
            <div className="content">
                <h1>Mon grade</h1>
                <div className="grid">
                    <div className="rank">
                        {rank.image && <img src={rank.image} alt={rank.name} />}
                        <span className="name">{rank.name}</span>
                        <span className="description">{rank.description}</span>
                        <Progress percent={percentageValidatedExercises().toFixed(0)} />
                    </div>
                    {rank.exercisesScales.map((exerciseScale, index) => 
                        <ExerciseItem
                            exerciseScale={exerciseScale}
                            exerciseResult={findExerciseResult(exerciseScale)}
                            key={index}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default MyRank;