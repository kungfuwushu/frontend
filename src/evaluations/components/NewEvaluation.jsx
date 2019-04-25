import React, { useState, useEffect } from 'react';

import * as api from '../../api';

import './NewEvaluation.css';
import { Button, Select, DatePicker, Input, Col, Radio } from 'antd';
const InputGroup = Input.Group;
const Option = Select.Option;
const RadioGroup = Radio.Group;

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
	const [ allGroups, setAllGroups ] = useState([]);

	useEffect(() => {
		api.Groups.all()
			.then(groups =>
				setAllGroups(groups)
			);
	}, []);

	const handleSave = () => {
		console.log("saving evaluation", evaluation);
		api.Evaluations.create(evaluation)
			.then(data => 
				history.goBack()
			);
	}

	const handleFieldChange = (fieldName, value) => {
		const data = {...evaluation};
		data[fieldName] = value;
		setEvaluation(data);
	}

	const handleInputChange = (inputName) => ({target: {value}}) =>
		handleFieldChange(inputName, value);

	const handleDateChange = (date) => 
		handleFieldChange('date', date.format());

	const handleGroupsChange = (value) => 
		handleFieldChange('groups', value.map(Number));

	const { name, type, address, city, postalCode } = evaluation;
	return (
		<div className="NewEvaluation">
			<h1>Nouvelle évaluation</h1>
			<h2 className="name-title">Nom</h2>
			<Input
				className="name"
				placeholder="Nom de l'évaluation"
				onChange={handleInputChange('name')}
				value={name}
			/>
			<h2>Type d'évaluation</h2>
			<RadioGroup onChange={handleInputChange('type')} value={type}>
				<Radio value={"RANK"}>Passage de grade</Radio>
				<Radio value={"OTHER"}>Autre</Radio>
			</RadioGroup>
			<h2>Heure et date de rendez-vous</h2>
			<DatePicker
				showTime
				format="YYYY-MM-DD HH:mm:ss"
				placeholder="Sélectionnez l'heure et la date"
				onChange={handleDateChange}
				className="date-picker"
				style={{ width: "100%" }}
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
				onChange={handleGroupsChange}
			>
				{allGroups.map(group =>
					<Option key={group.id}>{group.name}</Option>
				)}
			</Select>
			<div className="actions">
				<Button onClick={() => history.goBack()}>Retour</Button>
				<Button type="primary" onClick={handleSave} className="save">Enregistrer</Button>
			</div>
		</div>
	);
}

export default NewEvaluation;
