import React from 'react';

import { InputNumber } from 'antd';

import './EvaluateCriterion.css';

const EvaluateCriterion = ({ criterionResult, onChange }) => {
	const handleChange = (index) => (criteriaResult) => {
		const data = criterionResult.slice();
		data[index] = criteriaResult;
		onChange(data);
	}

	return (
		<div className="EvaluateCriterion" >
			{criterionResult.map((criteriaResult, index) => 
				<EvaluateCriteria
					criteriaResult={criteriaResult}
					onChange={handleChange(index)}
					key={index}
				/>
			)}
		</div>
	);
}

const EvaluateCriteria = ({ criteriaResult, onChange }) => {
	const handleChange = (score) => onChange({
		...criteriaResult,
		score
	});

	const { rankCriteria } = criteriaResult;
	return (
		<div className="EvaluateCriteria">
			<InputNumber
				min={0}
				max={rankCriteria.maximumScore}
				value={criteriaResult.score}
				onChange={handleChange}
			/>
			<span className="name">{rankCriteria.criteria.name}</span>
		</div>
	);
}

export default EvaluateCriterion;
