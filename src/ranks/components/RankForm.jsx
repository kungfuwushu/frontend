import React from 'react';
import { withRouter } from 'react-router';

import './RankForm.css';
import { Input, Button } from 'antd';

import { ImagePicker } from '../../custom';
import ExercisePicker from './ExercisePicker';
import RankExercises from './RankExercises';

const { TextArea } = Input;

const RankForm = ({ title, rank, onChange, onSave, history }) => {
    const handleInputChange = (inputName) => ({target : {value}}) => {
        const modifiedRank = {...rank};
        modifiedRank[inputName] = value;
        onChange(modifiedRank);
    };

    const handleExercisesPicked = (rankExercises) => onChange({
        ...rank,
        rankExercises: rank.rankExercises.concat(rankExercises)
    });

    const handleRankExercisesChange = (rankExercises) => onChange({
        ...rank,
        rankExercises
    });

    const handleImageChange = (image) => onChange({
        ...rank,
        image
    });

    const { name, description, image, rankExercises } = rank;
    return (
        <div className="NewRank">
            <h1>{title}</h1>
            <h2 className="infos-title">Informations</h2>
            <Input
                className="name"
                placeholder="Nom du grade"
                onChange={handleInputChange}
                value={name}
            />
            <TextArea
                autosize={{ minRows: 2, maxRows: 10 }}
                placeholder="Description"
                onChange={handleInputChange}
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
            {rankExercises.length === 0? 
                "Aucuns exercices sélectionnés." :
                <RankExercises
                    rankExercises={rankExercises}
                    onChange={handleRankExercisesChange}
                />
            }
            <div className="actions">
                <Button onClick={() => history.goBack()}>Retour</Button>
                <Button type="primary" onClick={onSave} className="save">Sauvegarder</Button>
            </div>
        </div>
    );
}

export default withRouter(RankForm);