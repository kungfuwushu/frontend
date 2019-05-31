import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';

import * as api from '../../api';

import { ProgramForm } from '../programs';

import { Loading } from '../custom';

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
        return <Loading />;
	return (
		<ProgramForm
			title="Edition d'un grade"
			program={rank}
			onChange={setRank}
			onSave={handleSave}
		/>
	);
}

export default withRouter(EditRank);
