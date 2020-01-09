import React, { useState, useEffect } from 'react';

import './TestsList.css';
import { Select, Button } from 'antd';

import { SearchInput, Card } from '../custom';
import TestItem from './TestItem';

import * as api from '../../api';

const Option = Select.Option;

const TestsList = ({history}) => {
	const [ tests, setTests ] = useState([]);
	const [ filteredTests, setFilteredTests ] = useState([]);
	const [ filter, setFilter ] = useState({
		type: undefined,
		search: undefined,
	});

	useEffect(() => {
		api.Tests.all()
			.then(tests => {
				setTests(tests);
				setFilteredTests(tests);
			});
	}, []);

	useEffect(() => {
		setFilteredTests(tests.filter(test => {
			if (filter.type && filter.type !== test.type)
				return false;
			if (filter.search &&
				!test.name.toLowerCase().includes(filter.search.toLowerCase()) &&
				!test.address.toLowerCase().includes(filter.search.toLowerCase()) &&
				!test.city.toLowerCase().includes(filter.search.toLowerCase()) &&
				!test.postalCode.toLowerCase().includes(filter.search.toLowerCase()) /*&&
				!test.groups.some(group => group.name.toLowerCase().includes(filter.search.toLowerCase()))*/
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

    const testTypes = [
        {
            name: 'Tous les types',
            value: undefined
        },
        {
            name: 'Passage de grade',
            value: 'RANK'
        },
        {
            name: 'Programme',
            value: 'PROGRAM'
        }
    ];

	return (
		<Card className="TestsList">
			<div className="header">
				<div className="top">
					<h2>Evaluations</h2>
					<Button
						onClick={() => history.push('/new-test')}
						type="primary"
					>
						Planifier un nouveau test
					</Button>
				</div>
				<div className="filters">
					<Select
						defaultValue="Type d'évaluation"
						className="select"
						onChange={handleFilterChange('type')}
					>
						{testTypes.map((type, index) =>
							<Option value={type.value} key={index}>{type.name}</Option>
						)}
					</Select>
					<SearchInput
						onSearch={handleFilterChange('search')}
						placeholder="Rechercher par nom, groupe, adresse"
					/>
				</div>
			</div>
			<div className="tests">
				{filteredTests.map((test, index) =>
					<TestItem test={test} key={index}/>
				)}
			</div>
		</Card>
	);
}

export default TestsList;
