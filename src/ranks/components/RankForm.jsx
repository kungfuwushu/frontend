import React from 'react';
import { withRouter } from 'react-router';

import './RankForm.css';
import { Input, Button } from 'antd';

import { ImagePicker, Card } from '../../custom';
import ExercisePicker from './ExercisePicker';
import ExercisesScales from './ExercisesScales';

const { TextArea } = Input;

const RankForm = ({ title, rank, onChange, onSave, history }) => {
    const handleInputChange = (inputName) => ({target : {value}}) => {
        const modifiedRank = {...rank};
        modifiedRank[inputName] = value;
        onChange(modifiedRank);
    };

    const handleExercisesScalesChange = (exercisesScales) => onChange({
        ...rank,
        exercisesScales: exercisesScales.map((exerciseScale, index) => ({
            ...exerciseScale,
            position: index
        }))
    })

    const handleExercisesPicked = (exercisesScales) => handleExercisesScalesChange(
        rank.exercisesScales.concat(exercisesScales)
    );

    const handleImageChange = (image) => onChange({
        ...rank,
        image
    });

    const { name, description, image, exercisesScales } = rank;
    return (
        <div className="RankForm">
            <Card className="card">
                <h1>{title}</h1>
                <h2 className="infos-title">Informations</h2>
                <Input
                    className="name"
                    placeholder="Nom du grade"
                    onChange={handleInputChange('name')}
                    value={name}
                />
                <TextArea
                    autosize={{ minRows: 2, maxRows: 10 }}
                    placeholder="Description"
                    onChange={handleInputChange('description')}
                    value={description}
                />
                <h2>Télécharger une image</h2>
                <ImagePicker
                    imageUrl={image}
                    onChange={handleImageChange}
                />
                <div className="exercises-header">
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
                <div className="actions">
                    <Button onClick={() => history.goBack()}>Annuler</Button>
                    <Button type="primary" onClick={onSave} className="save">Sauvegarder</Button>
                </div>
            </Card>
        </div>
    );
}

export default withRouter(RankForm);