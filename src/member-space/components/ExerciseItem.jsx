import React from 'react';
import { Link } from 'react-router-dom';
import './ExerciseItem.css';

const ExerciseItem = ({ rankExercise, exerciseResult }) => {
    const isResult = !!exerciseResult;
    
    const { exercise } = rankExercise;
    return (
        <Link
            to={isResult ?
                `/exercise-results/${exerciseResult.id}` :
                `/rank-exercises/${rankExercise.id}`
            }
        >
            <div className={`ExerciseItem ${isResult ? 'is-result' : ''}`}>
                <img src="http://img2.imgtn.bdimg.com/it/u=2170285068,3729508098&fm=26&gp=0.jpg" alt="apple" />
                <div className="details">
                    <span className="name">{exercise.name}</span>
                    <span className="type">{exercise.type}</span>
                </div>
            </div>
        </Link>
    );
}

export default ExerciseItem;