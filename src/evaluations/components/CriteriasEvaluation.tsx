import * as React from 'react';
import { Select } from 'antd';
import '../styles/CriteriasEvaluation.css';
import { ICriteriasEvaluationProps } from '../../actions/CriteriasEvaluation.Actions';
import * as CriteriasEvaluationActionCreators from '../../actions/CriteriasEvaluation.Actions';
import { bindActionCreators, Dispatch } from 'redux';
import * as _ from 'lodash';
import { connect } from 'react-redux';

const Option = Select.Option;

interface CriteriasEvaluationProps extends ICriteriasEvaluationProps {
	setSave?: (save:()=>void) => void
}

class CriteriasEvaluation extends React.Component<CriteriasEvaluationProps> {
	private criteriasScores: any[] = Array();

	componentDidMount() {
		//this.props.setSave(this.save);
	}

	public save() {
		const { rankCriterias } = this.props;
		for (var i = 0; i < rankCriterias.length; i++) {
			/*this.props.saveCriteriaResult({
				id: rankCriterias[i].id,
				rankCriteriaId: rankCriterias[i].rankCriteriaId,
				score: this.criteriasScores[i].options[this.criteriasScores[i].selectedIndex].value,
			});*/
		}
	}

	private renderCriteria = (rankCriteria: any) => {
		const index = this.criteriasScores.length;
		const scores = Array.from(Array(rankCriteria.maximumScore).keys());
		this.criteriasScores.push(undefined)
		return (
			<div className="Criterias" key={rankCriteria.id}>
				<div className="criteria">
					<p>{rankCriteria.criteria.name}</p>
					<Select defaultValue={'Note'} onSelect={score => this.criteriasScores[index] = score}>
						{scores.map((score) =>
							<Option value={score} key={score+''}>{score}</Option>
						)}
					</Select>
				</div>
			</div>
		)
	};

	render() {
		const { rankCriterias } = this.props;
		return (
			<div className="CriteriasEvaluation" >
				{rankCriterias.map(criteria => 
					this.renderCriteria(criteria)
				)}
			</div>
		);
	}
}

const mapStateToProps = (state: any) => ({
});

const mapDispatchtoProps = (dispatch: Dispatch) =>
	bindActionCreators(_.assign({}, CriteriasEvaluationActionCreators), dispatch);

export default connect(mapStateToProps, mapDispatchtoProps)(CriteriasEvaluation);
