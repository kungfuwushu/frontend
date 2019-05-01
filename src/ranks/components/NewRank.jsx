import React, { useState } from 'react';
import { withRouter } from 'react-router';

import * as api from '../../api';

import RankForm from './RankForm';

const NewRank = ({ history }) => {
    const [ rank, setRank ] = useState({
        name: undefined,
        description: undefined,
        exercisesScales: [],
        image: undefined
    });

	const handleSave = () => {
		const newRank = {
			...rank,
			exercisesScales: rank.exercisesScales.map(exerciseScale => ({
				...exerciseScale,
				id: undefined
			}))
		};
		api.Ranks.create(newRank)
			.then(_ => 
				history.goBack()
			);
    }
    
    if (!rank)
        return(<div>Loading...</div>);
	return (
		<RankForm
			title="Nouveau grade"
			rank={rank}
			onChange={setRank}
			onSave={handleSave}
		/>
	);
}

export default withRouter(NewRank);
