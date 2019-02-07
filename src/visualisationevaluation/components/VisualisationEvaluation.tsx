import * as React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import * as _ from 'lodash';

import moment from 'moment';

import { IVisualisationEvaluationProps } from '../../actions/VisualisationEvaluation.Actions';
import * as VisualisationEvaluationActionCreators from '../../actions/VisualisationEvaluation.Actions';

import * as api from '../../api';

import '../styles/VisualisationEvaluation.css';
import { Select, Button } from 'antd';
const Option = Select.Option;

import Search from './search';

class VisualisationEvaluation extends React.Component<IVisualisationEvaluationProps> {
	public componentWillMount(){
		api.Evaluations.all()
		.then(data =>
			this.props.onLoad(data)
		);
	}

	private changeRoute(e: any, route: string) {
		this.props.history.push(route)
		e.stopPropagation();
	}

	private renderEvaluation(evaluation: any){
		const { groups, address, city, postalCode, date } = evaluation;
        return(
			<div className="evaluation" key={evaluation.id} onClick={() => this.props.history.push('/trainings')}>
				<div className="evaluation-header">
					<div className="title-type">
						<span className="title">Nom de l'evaluation</span>
						<span className="type">PASSAGE DE GRADE</span>
					</div>
					<span className="date">{moment(date).format('MMMM Do YYYY')}</span>
				</div>
				<div className="body">
					<div className="descriptions">
						<span>{`${address}, ${city} ${postalCode}`}</span>
						{groups.map((group: any) =>
							<span key={group.id}>{group.name}</span>
						)}
					</div>
					<div className="actions">
						<Button onClick={(e: any) => this.changeRoute(e, `/profile`)} type="primary">Résultats</Button>
						<Button onClick={(e: any) => this.changeRoute(e, `/evaluations/${evaluation.id}`)} type="primary">Evaluer</Button>
					</div>
				</div>
			</div>
		)
	}

	private filterEvaluations() {
		const { evaluations } = this.props;
		return evaluations
	}

	public render() {
		const filteredEvaluations = this.filterEvaluations();
		const evaluationsTypes = ['Passage de grade', 'Autre']
		return (
			<div className="VisualisationEvaluation">
				<div className="header">
					<div className="top">
						<h2> Evaluations et statistiques</h2>
						<Button onClick={() => this.props.history.push('/trainings')} type="primary">Planifier une nouvelle evaluation</Button>
					</div>
					<div className="filters">
						<Select defaultValue="Type" className="select" onChange={val => this.props.setTypeFilter(val)}>
							{evaluationsTypes.map((type: any) =>
								<Option value={type} key={type}>{type}</Option>
							)}
						</Select>
						<Search
							onSearch={val => this.props.setContainingFilter(val)}
							placeholder="Rechercher par nom, groupe, date ou ville"
						/>
					</div>
				</div>
				<div className="evaluations">
					{filteredEvaluations.map((evaluation: any) =>
						this.renderEvaluation(evaluation)
					)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: any) => ({
    evaluations: state.visualisationEvaluation.evaluations,
    containingFilter: state.visualisationEvaluation.containingFilter,
    typeFilter: state.visualisationEvaluation.typeFilter,
});

const mapDispatchtoProps = (dispatch: Dispatch) =>
    bindActionCreators(_.assign({}, VisualisationEvaluationActionCreators), dispatch);

export default connect(mapStateToProps, mapDispatchtoProps)(VisualisationEvaluation);