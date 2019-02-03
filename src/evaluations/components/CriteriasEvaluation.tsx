import * as React from 'react';
import { isMobile } from "react-device-detect";

import { Select, InputNumber } from 'antd';
const Option = Select.Option;

import '../styles/CriteriasEvaluation.css';

interface CriteriasEvaluationProps {
	rankCriterias: any[];
}

interface CriteriasEvaluationState {
	criteriaScores: any[];
}

class CriteriasEvaluation extends React.Component<CriteriasEvaluationProps, CriteriasEvaluationState> {
	constructor(props: any) {
		super(props);
		this.state = {
			criteriaScores: Array(this.props.rankCriterias.length)
		}
	}

	public getScores() {
		const { rankCriterias } = this.props;
		const criteriaResults = new Array();
		for (var i = 0; i < rankCriterias.length; i++) {
			const score = this.state.criteriaScores[i];
			if (score)
				criteriaResults.push({
					score,
					rankCriteriaId: rankCriterias[i].id,
				})
		}
	}

	public resetScores() {
		this.setState({
			criteriaScores : Array(this.props.rankCriterias.length)
		});
	}

	private renderCriteria(rankCriteria: any, criteriaIndex: number) {
		const onSelect = (score: any) => {
			const criteriaScores = [...this.state.criteriaScores];
			criteriaScores[criteriaIndex] = score;
			this.setState({
				criteriaScores
			});
		}

		const scores = Array.from(Array(rankCriteria.maximumScore).keys());
		const selectedScore = this.state.criteriaScores[criteriaIndex];
		return (
			<div className="criteria" key={rankCriteria.id}>
				{isMobile?
					<Select onSelect={score => onSelect(score)} value={selectedScore||'?'}>
						{scores.map((score) =>
							<Option value={score} key={score+''}>{score}</Option>
						)}
					</Select>
				:
					<InputNumber min={0} max={rankCriteria.maximumScore}
						value={selectedScore} onChange={score => onSelect(score)}/>
				}
				<span className="criteria-name">{rankCriteria.criteria.name}</span>
			</div>
		)
	};

	render() {
		const { rankCriterias } = this.props;
		return (
			<div className="CriteriasEvaluation" >
				{rankCriterias.map((criteria, index) => 
					this.renderCriteria(criteria, index)
				)}
			</div>
		);
	}
}

export default CriteriasEvaluation;
