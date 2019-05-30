import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';

import * as api from '../../api';

import moment from 'moment';
import 'moment/locale/fr';

import { Card } from '../custom';
import { ExercisesScalesFormSection } from '../exercise-scale-setup';

import './TestForm.css';
import { Button, Select, DatePicker, Input, Col, Radio } from 'antd';
const InputGroup = Input.Group;
const Option = Select.Option;
const RadioGroup = Radio.Group;

const TestForm = ({ title, test, onChange, onSave, history }) => {
	const [ allGroups, setAllGroups ] = useState([]);

	useEffect(() => {
		api.Groups.all()
			.then(groups => 
				setAllGroups(groups)
			);
	}, []);

	const handleInputChange = (fieldName) => ({target: {value}}) => {
		const data = {...test};
		data[fieldName] = value;
		onChange(data);
	}

	const handleDateChange = (date) => onChange({
		...test,
		date: date.format()
	});

	const handleGroupSelect = (stringId) => onChange({
		...test,
		groups: test.groups.concat([allGroups.find(group => parseInt(stringId) === group.id)])
	});

	const handleGroupDeselect = (name) => onChange({
		...test,
		groups: test.groups.filter(group => name !== group.name)
	});

    const handleExercisesScalesChange = (exercisesScales) => onChange({
        ...test,
        exercisesScales
    });

	const { name, type, date, address, city, postalCode, groups, exercisesScales } = test;
	const filteredGroups = allGroups.filter(group =>
		!test.groups.map(group => group.id).includes(group.id)
	);
	return (
		<div className="TestForm">
			<Card className="card">
				<h1>{title}</h1>
				<h2 className="name-title">Nom</h2>
				<Input
					className="name"
					placeholder="Nom de l'évaluation"
					onChange={handleInputChange('name')}
					value={name}
				/>
				<h2>Type d'évaluation</h2>
				<RadioGroup
					onChange={handleInputChange('type')}
					value={type}
					disabled={!!test.id}
				>
					<Radio value={"RANK"}>Passage de grade</Radio>
					<Radio value={"PROGRAM"}>Programme</Radio>
				</RadioGroup>
				<h2>Heure et date de rendez-vous</h2>
				<DatePicker
					showTime
					format="LLLL"
					placeholder="Sélectionnez l'heure et la date"
					onChange={handleDateChange}
					className="date-picker"
					style={{ width: "100%" }}
					value={date ? moment(date) : null}
				/>
				<h2>Lieu</h2>
				<Input
					className="address"
					placeholder="Adresse"
					onChange={handleInputChange('address')}
					value={address}
				/>
				<InputGroup>
					<Col span={6}>
						<Input
							placeholder="Code postal"
							onChange={handleInputChange('postalCode')}
							value={postalCode}
						/>
					</Col>
					<Col span={18}>
						<Input
							placeholder="Ville"
							onChange={handleInputChange('city')}
							value={city}
						/>
					</Col>
				</InputGroup>
				<h2>Groupes à évaluer</h2>
				<Select
					mode="multiple"
					placeholder="Sélectionnez les groupes à évaluer"
					onSelect={handleGroupSelect}
					onDeselect={handleGroupDeselect}
					value={groups.map(group => group.name)}
					notFoundContent="Aucun résultat"
				>
					{filteredGroups.map(group =>
						<Option key={group.id}>{group.name}</Option>
					)}
				</Select>
				{type !== 'RANK' &&
					<ExercisesScalesFormSection 
						exercisesScales={exercisesScales}
						onChange={handleExercisesScalesChange}
					/>
				}
				<div className="actions">
					<Button onClick={() => history.goBack()}>Annuler</Button>
					<Button type="primary" onClick={onSave} className="save">Sauvegarder</Button>
				</div>
			</Card>
		</div>
	);
}

export default withRouter(TestForm);
