import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';

import * as api from '../../api';

import RankForm from './RankForm';

const EditRank = ({ match, history }) => {
	const [ rank, setRank ] = useState(undefined);

    useEffect(() => {
        api.Ranks.byId(match.params.id)
            .then(rank => 
                setRank(rank)
            );
    }, []);

	const handleSave = () => {
        api.Ranks.update(rank)
            .then(_ => 
                history.goBack()
            );
    }
    
    if (!rank)
        return(<div>Loading...</div>);
	return (
		<RankForm
			title="Edition d'un grade"
			rank={rank}
			onChange={setRank}
			onSave={handleSave}
		/>
	);
}

export default withRouter(EditRank);
