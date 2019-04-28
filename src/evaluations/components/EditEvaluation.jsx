import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';

import * as api from '../../api';

import EvaluationForm from './EvaluationForm';

const EditEvaluation = ({ match, history }) => {
	const [ evaluation, setEvaluation ] = useState(undefined);

    useEffect(() => {
        api.Evaluations.byId(match.params.id)
            .then(evaluation => 
                setEvaluation(evaluation)
            );
    }, []);

	const handleSave = () => {
        console.log("saving evaluation", evaluation);
        history.goBack();
    }
    
    if (!evaluation)
        return(<div>Loading...</div>);
	return (
		<EvaluationForm
			title="Edition d'une évaluation"
			evaluation={evaluation}
			onChange={setEvaluation}
			onSave={handleSave}
		/>
	);
}

export default withRouter(EditEvaluation);
