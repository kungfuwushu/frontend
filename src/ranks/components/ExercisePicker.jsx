import React, { useState, useEffect } from 'react';

import { Modal, Checkbox, Button } from 'antd';

import * as api from '../../api';

const ExercisePickerContainer = ({onPicked}) => {
    const [ isVisible, setVisibility] = useState(false);
    const toggle = () => setVisibility(!isVisible);
    const handlePicked = (rankExercises) => {
        toggle();
        onPicked(rankExercises);
    }
    return (
        <React.Fragment>
            <Button type="primary" onClick={toggle}>Ajouter des exercices</Button>
            <ExercisePicker
                visible={isVisible}
                onClose={toggle}
                onPicked={handlePicked}
            />
        </React.Fragment>
    );
}

const ExercisePicker = ({ visible, onClose, onPicked }) => {
    const [ checkedExercises, setCheckedExercises ] = useState([]);
    const [ exercises, setExercises ] = useState([]);
    
    useEffect(() => {
        api.Exercises.all()
            .then(exercises =>
                setExercises(exercises)
            );
    }, []);

    const handlePicked = () => {
        const rankExercises = checkedExercises.map(exercise => {
            var rankExercise = {
                exercise,
                type: exercise.type
            }
            switch (exercise.type) {
                case 'TAOLU':
                    rankExercise.rankCriterion = exercise.criterion.map(criteria => ({
                        criteria,
                        maximumScore: undefined,
                    }));
                    break;
                case 'FIGHT':
                    const round = exercise.rounds[0];
                    rankExercise.rankRounds = [{
                        round,
                        rankCriterion: round.criterion.map(criteria => ({
                            criteria,
                            maximumScore: undefined,
                        }))
                    }];
                    break;
                default:
                    break;
            }
            return rankExercise;
        });
        onPicked(rankExercises);
        setCheckedExercises([]);
    }

    const renderExercise = (exercise) => {
        const handleChange = ({ target : { checked }}) => {
            setCheckedExercises(checked ? 
                checkedExercises.concat([exercise]) :
                checkedExercises.filter(exo => exo !== exercise)
            );
        }

        return(
            <div className="exercise" key={exercise.id}>
                <Checkbox
                    checked={checkedExercises.includes(exercise)}
                    onChange={handleChange}
                />
				<div className="exercise-header">
					<div className="title-type">
						<span className="title">{exercise.name}</span>
						<span className="type">{exercise.type}</span>
					</div>
				</div>
				<div className="body">
                    <div className="actions">
                    </div>
				</div>
			</div>
        )
    }

    return (
        <div>
            <Modal
                visible={visible}
                onOk={handlePicked}
                onCancel={onClose}
            >
                {exercises.map((exercise) =>
                    renderExercise(exercise)  
                )}
            </Modal>   
        </div>
    )
}

export default ExercisePickerContainer;
