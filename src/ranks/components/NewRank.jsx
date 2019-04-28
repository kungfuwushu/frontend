import React, { useState } from 'react';
import { withRouter } from 'react-router';

import * as api from '../../api';

import RankForm from './RankForm';

const NewRank = ({ history }) => {
    const [ rank, setRank ] = useState({
        name: undefined,
        description: undefined,
        rankExercises: [],
        image: undefined
    });

	const handleSave = () => {
        console.log("creating rank", rank);
		api.Ranks.create(rank)
			.then(data => 
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
