import React from 'react';

import './EvaluateCriterion.css';

import { InputNumber } from '../custom';
import { Tooltip } from 'antd';

const EvaluateCriterion = ({ criterionResults, onChange }) => {
	const handleChange = (index) => (criteriaResult) => {
		const data = criterionResults.slice();
		data[index] = criteriaResult;
		onChange(data);
	}

	return (
		<div className="EvaluateCriterion" >
			{criterionResults.map((criteriaResult, index) => 
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

	const { criteriaScale } = criteriaResult;
	return (
		<div className="EvaluateCriteria">
			<InputNumber
				value={criteriaResult.score || ''}
				min={0}
				max={criteriaScale.scale || 0}
				onChange={handleChange}
				addonAfter={
					<Tooltip title="Barème">
						<span>{criteriaScale.scale || 0}</span>
					</Tooltip>
				}
			/>
			<span className="name">{criteriaScale.criteria.name}</span>
		</div>
	);
}

export default EvaluateCriterion;
