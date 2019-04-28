import React, { useState } from 'react';

import * as api from '../../api';

import EvaluationForm from './EvaluationForm';

const NewEvaluation = ({ history }) => {
	const [ evaluation, setEvaluation ] = useState({
		name: undefined,
		type: "RANK",
		date: undefined,
		address: undefined,
		city: undefined,
		postalCode: undefined,
		groups: [],
	});

	const handleSave = () => {
		console.log("creating evaluation", evaluation);
		api.Evaluations.create(evaluation)
			.then(data => 
				history.goBack()
			);
	}

	return (
		<EvaluationForm
			title="Nouvelle évaluation"
			evaluation={evaluation}
			onChange={setEvaluation}
			onSave={handleSave}
		/>
	);
}

export default NewEvaluation;
