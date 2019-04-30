import React from 'react';

import './EvaluateCriterion.css';

import { InputNumber } from '../../custom';
import { Tooltip } from 'antd';

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
				value={criteriaResult.score || ''}
				min={0}
				max={rankCriteria.maximumScore}
				onChange={handleChange}
				addonAfter={
					<Tooltip title="Barème">
						<span>{rankCriteria.maximumScore}</span>
					</Tooltip>
				}
			/>
			<span className="name">{rankCriteria.criteria.name}</span>
		</div>
	);
}

export default EvaluateCriterion;
