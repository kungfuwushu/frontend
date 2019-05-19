import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';

import * as api from '../../api';

import TestForm from './TestForm';

const EditTest = ({ match, history }) => {
	const [ test, setTest ] = useState(undefined);

    useEffect(() => {
        api.Tests.byId(match.params.id)
            .then(test =>
                setTest(test)
            );
    }, []);

	const handleSave = () => {
        api.Tests.update(test)
            .then(_ =>
                history.goBack()
            );
    }
    
    if (!test)
        return(<div>Loading...</div>);
	return (
		<TestForm
			title="Edition d'une évaluation"
			test={test}
			onChange={setTest}
			onSave={handleSave}
		/>
	);
}

export default withRouter(EditTest);
