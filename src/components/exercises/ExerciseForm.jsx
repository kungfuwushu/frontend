import React from 'react';
import { withRouter } from 'react-router';

import './ExerciseForm.css';
import { Input, Button } from 'antd';

import { ImagePicker, Card } from '../custom';

const { TextArea } = Input;

const ExerciseForm = ({ title, exercise, onChange, onSave, history }) => {
    const handleInputChange = (inputName) => ({target : {value}}) => {
        const modifiedExercise = {...exercise};
        modifiedExercise[inputName] = value;
        onChange(modifiedExercise);
    };

    const handleImageChange = (image) => onChange({
        ...exercise,
        image
    });

    const { name, description, image } = exercise;
    return (
        <div className="ExerciseForm">
            <Card className="card">
                <h1>{title}</h1>
                <h2 className="infos-title">Informations</h2>
                <Input
                    className="name"
                    placeholder="Nom de l'exercice"
                    onChange={handleInputChange('name')}
                    value={name}
                />
                <TextArea
                    autosize={{ minRows: 2, maxRows: 10 }}
                    placeholder="Description"
                    onChange={handleInputChange('description')}
                    value={description}
                />
                <div className="actions">
                    <Button onClick={() => history.goBack()}>Annuler</Button>
                    <Button type="primary" onClick={onSave} className="save">Sauvegarder</Button>
                </div>
            </Card>
        </div>
    );
}

export default withRouter(ExerciseForm);
