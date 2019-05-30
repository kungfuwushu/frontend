import React from 'react';
import { withRouter } from 'react-router';

import './RankForm.css';
import { Input, Button } from 'antd';

import { ImagePicker, Card } from '../custom';
import { ExercisesScalesFormSection } from '../exercise-scale-setup';

const { TextArea } = Input;

const RankForm = ({ title, rank, onChange, onSave, history }) => {
    const handleInputChange = (inputName) => ({target : {value}}) => {
        const modifiedRank = {...rank};
        modifiedRank[inputName] = value;
        onChange(modifiedRank);
    };

    const handleImageChange = (image) => onChange({
        ...rank,
        image
    });

    const handleExercisesScalesChange = (exercisesScales) => onChange({
        ...rank,
        exercisesScales
    })

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
                <ExercisesScalesFormSection 
                    exercisesScales={exercisesScales}
                    onChange={handleExercisesScalesChange}
                />
                <div className="actions">
                    <Button onClick={() => history.goBack()}>Annuler</Button>
                    <Button type="primary" onClick={onSave} className="save">Sauvegarder</Button>
                </div>
            </Card>
        </div>
    );
}

export default withRouter(RankForm);