import React, { useState } from 'react';

import './NewRank.css';
import { Input, Button } from 'antd';

import ImagePicker from './ImagePicker';
import ExercisePicker from './ExercisePicker';
import RankExercises from './RankExercises';

const { TextArea } = Input;

const NewRank = ({ history }) => {
    const [ rank, setRank ] = useState({
        name: undefined,
        description: undefined,
        rankExercises: [],
        imageUrl: undefined
    });
    
    const handleInputChange = (inputName) => ({target : {value}}) => {
        const modifiedRank = {...rank};
        modifiedRank[inputName] = value;
        setRank(modifiedRank);
    };

    const handleExercisesPicked = (rankExercises) => setRank({
        ...rank,
        rankExercises: rank.rankExercises.concat(rankExercises)
    });

    const handleRankExercisesChange = (rankExercises) => setRank({
        ...rank,
        rankExercises
    });

    const handleImagePicked = (imageUrl) => setRank({
        ...rank,
        imageUrl
    });

	const handleSave = () => {
        console.log('the new rank', rank);
    }

    return (
        <div className="NewRank">
            <h1>Création d'un grade</h1>
            <h2 className="infos-title">Informations</h2>
            <Input className="name" placeholder="Nom du grade" onChange={handleInputChange} />
            <TextArea autosize={{ minRows: 2, maxRows: 10 }} placeholder="Description" onChange={handleInputChange} />
            <h2>Télécharger une image</h2>
            <ImagePicker onPicked={handleImagePicked} />
            <div className="exercises-header">
                <h2>Exercices</h2>
                <ExercisePicker onPicked={handleExercisesPicked} />
            </div>
            {rank.rankExercises.length === 0? 
                "Aucuns exercices sélectionnés." :
                <RankExercises
                    rankExercises={rank.rankExercises}
                    onChange={handleRankExercisesChange}
                />
            }
            <div className="actions">
                <Button onClick={() => history.goBack()}>Retour</Button>
                <Button type="primary" onClick={handleSave} className="save">Enregistrer</Button>
            </div>
        </div>
    );
}

export default NewRank;