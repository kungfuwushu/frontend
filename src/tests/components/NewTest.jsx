import React, { useState } from 'react';

import * as api from '../../api';

import TestForm from './TestForm';

const NewTest = ({ history }) => {
	const [ test, setTest ] = useState({
		name: undefined,
		type: "RANK",
		date: undefined,
		address: undefined,
		city: undefined,
		postalCode: undefined,
		groups: [],
		exercisesScales: [],
	});

	const handleSave = () => {
		api.Tests.create(test)
			.then(_ => 
				history.goBack()
			);
	}

	return (
		<TestForm
			title="Nouvelle évaluation"
			test={test}
			onChange={setTest}
			onSave={handleSave}
		/>
	);
}

export default NewTest;
