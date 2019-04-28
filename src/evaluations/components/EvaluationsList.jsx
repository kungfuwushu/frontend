import React, { useState, useEffect } from 'react';

import './EvaluationsList.css';
import { Select, Button } from 'antd';

import { SearchInput } from '../../custom';
import EvaluationItem from './EvaluationItem';

import * as api from '../../api';

const Option = Select.Option;

const EvaluationsList = ({history}) => {
	const [ evaluations, setEvaluations ] = useState([]);
	const [ filteredEvaluations, setFilteredEvaluations ] = useState([]);
	const [ filter, setFilter ] = useState({
		type: undefined,
		search: undefined,
	});

	useEffect(() => {
		api.Evaluations.all()
			.then(evaluations => {
				setEvaluations(evaluations);
				setFilteredEvaluations(evaluations);
			});
	}, []);

	useEffect(() => {
		setFilteredEvaluations(evaluations.filter(evaluation => {
			if (filter.type && filter.type !== evaluation.type)
				return false;
			if (filter.search && 
				!evaluation.name.toLowerCase().includes(filter.search.toLowerCase()) &&
				!evaluation.address.toLowerCase().includes(filter.search.toLowerCase()) &&
				!evaluation.city.toLowerCase().includes(filter.search.toLowerCase()) &&
				!evaluation.postalCode.toLowerCase().includes(filter.search.toLowerCase()) /*&&
				!evaluation.groups.some(group => group.name.toLowerCase().includes(filter.search.toLowerCase()))*/
			)
				return false;
			return true;
		}));
	}, [filter]);

	const handleFilterChange = (filterName) => (value) => {
		const data = {...filter};
		data[filterName] = value;
		setFilter(data);
	}

    const evaluationTypes = [
        {
            name: 'Tous les types',
            value: undefined
        },
        {
            name: 'Passage de grade',
            value: 'RANK'
        },
        {
            name: 'Autre',
            value: 'OTHER'
        }
    ];

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
						defaultValue="Type d'évaluation"
						className="select"
						onChange={handleFilterChange('type')}
					>
						{evaluationTypes.map((type, index) =>
                        	<Option value={type.value} key={index}>{type.name}</Option>
						)}
					</Select>
					<SearchInput
						onSearch={handleFilterChange('search')}
						placeholder="Rechercher par nom, groupe, adresse"
					/>
				</div>
			</div>
			<div className="evaluations">
				{filteredEvaluations.map((evaluation, index) =>
					<EvaluationItem evaluation={evaluation} key={index}/>
				)}
			</div>
		</div>
	);
}

export default EvaluationsList;