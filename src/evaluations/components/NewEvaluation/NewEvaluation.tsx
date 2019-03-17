import * as React from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import { bindActionCreators, Dispatch } from 'redux';
import { INewEvaluationsProps } from '../../../actions/evaluations/NewEvaluation.Actions';
import * as NewEvaluationActionCreators from '../../../actions/evaluations/NewEvaluation.Actions';

import './NewEvaluation.css';
import { Button, Select, DatePicker, Input, Col, Radio } from 'antd';
const InputGroup = Input.Group;
const Option = Select.Option;
const RadioGroup = Radio.Group;

import * as moment from 'moment';

interface StateNewEvaluation {
	name?: string;
	type?: string;
	date?: string;
	address?: string;
	city?: string;
	postalCode?: string;
	groups: any[];
	errorMessage?: string;
}

class NewEvaluation extends React.Component<INewEvaluationsProps, StateNewEvaluation> {
	constructor(props: any) {
		super(props);
		this.state = {
			name: undefined,
			type: "RANK",
			date: undefined,
			address: undefined,
			city: undefined,
			postalCode: undefined,
			groups: [],
			errorMessage: undefined,
		}
	}

	public componentWillMount() {
		this.props.onLoad();
	}

	private back() {
		this.props.history.goBack();
	}

	private save() {
		const { name, type, date, address, city, postalCode, groups } = this.state;
		if (!name || !type || !date || !address || !city || !postalCode || groups.length == 0) {
			this.setState({
				errorMessage: "Oups! Tout est bien rempli ?"
			});
			return;
		}
		this.props.save({
			name,
			type,
			date,
			address,
			city,
			postalCode,
			groups
		});
		this.back();
	}

	private onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ name: e.target.value });
	}

	private onTypeChange = (e: any) => {
		this.setState({ type: e.target.value });
	}

	private onDateChange = (date: moment.Moment, dateString: string) => {
		this.setState({ date: date.format() });
	}

	private onAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ address: e.target.value });
	}

	private onCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ city: e.target.value });
	}

	private onPostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ postalCode: e.target.value });
	}

	private onGroupsChange = (value: string[]) => {
		this.setState({ groups: value.map(Number) });
	}

	public render() {
		const { groups } = this.props;
		const { errorMessage } = this.state;
		return (
			<div className="NewEvaluation">
				<h1>Nouvelle évaluation</h1>
				{errorMessage? <span className="error">{errorMessage}</span> : ''}
				<h2 className="name-title">Nom</h2>
				<Input className="name" placeholder="Nom de l'évaluation" onChange={this.onNameChange} />
				<h2>Type d'évaluation</h2>
				<RadioGroup onChange={this.onTypeChange} value={this.state.type}>
					<Radio value={"RANK"}>Passage de grade</Radio>
					<Radio value={"OTHER"}>Autre</Radio>
				</RadioGroup>
				<h2>Heure et date de rendez-vous</h2>
				<DatePicker
					showTime
					format="YYYY-MM-DD HH:mm:ss"
					placeholder="Sélectionnez l'heure et la date"
					onChange={this.onDateChange}
					className="date-picker"
					style={{ width: "100%" }}
				/>
				<h2>Lieu</h2>
				<Input className="address" placeholder="Adresse" onChange={this.onAddressChange} />
				<InputGroup>
					<Col span={6}>
						<Input placeholder="Code postal" onChange={this.onPostalCodeChange} />
					</Col>
					<Col span={18}>
						<Input placeholder="Ville" onChange={this.onCityChange} />
					</Col>
				</InputGroup>
				<h2>Groupes à évaluer</h2>
				<Select
					mode="multiple"
					placeholder="Sélectionnez les groupes à évaluer"
					defaultValue={this.state.groups}
					onChange={this.onGroupsChange}
				>
					{groups.map((group: any) =>
						<Option key={group.id}>{group.name}</Option>
					)}
				</Select>
				<div className="actions">
					<Button onClick={() => this.back()}>Retour</Button>
					<Button type="primary" onClick={() => this.save()} className="save">Enregistrer</Button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: any) => ({
	groups: state.newEvaluation.groups,
	groupsContainingFilter: state.newEvaluation.groupsContainingFilter,
});

const mapDispatchtoProps = (dispatch: Dispatch) =>
	bindActionCreators(_.assign({}, NewEvaluationActionCreators), dispatch);

export default connect(mapStateToProps, mapDispatchtoProps)(NewEvaluation);
