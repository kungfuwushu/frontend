import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';

import * as api from '../../api';

import ProgramForm from './ProgramForm';

import { Loading } from '../custom';

const EditProgram = ({ match, history }) => {
	const [ program, setProgram ] = useState(undefined);

    useEffect(() => {
        api.Programs.byId(match.params.id)
            .then(program => 
                setProgram(program)
            );
    }, []);

	const handleSave = () => {
        api.Programs.update(program)
            .then(_ => 
                history.goBack()
            );
    }
    
    if (!program)
        return <Loading />;
	return (
		<ProgramForm
			title="Edition d'un programme"
			program={program}
			onChange={setProgram}
			onSave={handleSave}
		/>
	);
}

export default withRouter(EditProgram);
