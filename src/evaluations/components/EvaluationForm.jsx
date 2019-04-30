import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';

import * as api from '../../api';

import moment from 'moment';
import 'moment/locale/fr';

import { Card } from '../../custom';

import './EvaluationForm.css';
import { Button, Select, DatePicker, Input, Col, Radio } from 'antd';
const InputGroup = Input.Group;
const Option = Select.Option;
const RadioGroup = Radio.Group;

const EvaluationForm = ({ title, evaluation, onChange, onSave, history }) => {
	const [ allGroups, setAllGroups ] = useState([]);

	useEffect(() => {
		api.Groups.all()
			.then(groups => 
				setAllGroups(groups)
			);
	}, []);

	const handleInputChange = (fieldName) => ({target: {value}}) => {
		const data = {...evaluation};
		data[fieldName] = value;
		onChange(data);
	}

	const handleDateChange = (date) => onChange({
		...evaluation,
		date: date.format()
	});

	const handleGroupSelect = (stringId) => onChange({
		...evaluation,
		groups: evaluation.groups.concat([allGroups.find(group => parseInt(stringId) === group.id)])
	});

	const handleGroupDeselect = (name) => onChange({
		...evaluation,
		groups: evaluation.groups.filter(group => name !== group.name)
	});

	const { name, type, date, address, city, postalCode, groups } = evaluation;
	const filteredGroups = allGroups.filter(group =>
		!evaluation.groups.map(group => group.id).includes(group.id)
	);
	return (
		<div className="EvaluationForm">
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
				<RadioGroup onChange={handleInputChange('type')} value={type}>
					<Radio value={"RANK"}>Passage de grade</Radio>
					<Radio value={"OTHER"}>Autre</Radio>
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
				<div className="actions">
					<Button onClick={() => history.goBack()}>Annuler</Button>
					<Button type="primary" onClick={onSave} className="save">Sauvegarder</Button>
				</div>
			</Card>
		</div>
	);
}

export default withRouter(EvaluationForm);
