import React from 'react';

import './EvaluateCriterion.css';

import { InputNumber } from '../../custom';
import { Tooltip } from 'antd';

const EvaluateCriterion = ({ criteriaResults, onChange }) => {
	const handleChange = (index) => (criteriaResult) => {
		const data = criteriaResults.slice();
		data[index] = criteriaResult;
		onChange(data);
	}

	return (
		<div className="EvaluateCriterion" >
			{criteriaResults.map((criteriaResult, index) => 
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
				max={criteriaScale.scale}
				onChange={handleChange}
				addonAfter={
					<Tooltip title="Barème">
						<span>{criteriaScale.scale}</span>
					</Tooltip>
				}
			/>
			<span className="name">{criteriaScale.criteria.name}</span>
		</div>
	);
}

export default EvaluateCriterion;
