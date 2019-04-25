import React, { useState, useEffect } from 'react';

import './EvaluationsList.css';
import { Select, Button } from 'antd';

import { SearchInput } from '../../custom';
import EvaluationItem from './EvaluationItem';

import * as api from '../../api';

const Option = Select.Option;

const EvaluationsList = ({history}) => {
	const [ evaluations, setEvaluations ] = useState([]);
	const [ filter, setFilter ] = useState({
		type: undefined,
		containing: undefined,
	});

	useEffect(() => {
		api.Evaluations.all()
			.then(evaluations => 
				setEvaluations(evaluations)	
			);
	}, []);

	const handleFilterChange = (filterName) => (value) => {
		const data = {...filter};
		data[filterName] = value;
		setFilter(data);
	}

	const evaluationsTypes = ['Passage de grade', 'Autre']
	return (
		<div className="EvaluationsList">
			<div className="header">
				<div className="top">
					<h2>Evaluations et statistiques</h2>
					<Button
						onClick={() => history.push('/new-evaluation')}
						type="primary"
					>
						Planifier une nouvelle evaluation
					</Button>
				</div>
				<div className="filters">
					<Select
						defaultValue="Type"
						className="select"
						onChange={handleFilterChange('type')}
					>
						{evaluationsTypes.map(type =>
							<Option value={type} key={type}>{type}</Option>
						)}
					</Select>
					<SearchInput
						onSearch={handleFilterChange('containing')}
						placeholder="Rechercher par nom, groupe, date ou ville"
					/>
				</div>
			</div>
			<div className="evaluations">
				{evaluations.map((evaluation, index) =>
					<EvaluationItem evaluation={evaluation} key={index}/>
				)}
			</div>
		</div>
	);
}

export default EvaluationsList;