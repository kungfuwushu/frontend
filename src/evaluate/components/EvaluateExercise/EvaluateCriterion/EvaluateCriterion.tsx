import * as React from 'react';
import { isMobile } from "react-device-detect";

import { Select, InputNumber } from 'antd';
const Option = Select.Option;

import './EvaluateCriterion.css';

interface EvaluateCriterionProps {
	rankCriterion: any[];
}

interface EvaluateCriterionState {
	criterioncores: any[];
}

class EvaluateCriterion extends React.Component<EvaluateCriterionProps, EvaluateCriterionState> {
	constructor(props: any) {
		super(props);
		this.state = {
			criterioncores: Array(this.props.rankCriterion.length)
		}
	}

	public getScores() {
		const { rankCriterion } = this.props;
		const criteriaResults = new Array();
		for (var i = 0; i < rankCriterion.length; i++) {
			const score = this.state.criterioncores[i];
			if (score)
				criteriaResults.push({
					score,
					rankCriteriaId: rankCriterion[i].id,
				})
		}
	}

	public resetScores() {
		this.setState({
			criterioncores : Array(this.props.rankCriterion.length)
		});
	}

	private renderCriteria(rankCriteria: any, criteriaIndex: number) {
		const onSelect = (score: any) => {
			const criterioncores = [...this.state.criterioncores];
			criterioncores[criteriaIndex] = score;
			this.setState({
				criterioncores
			});
		}

		const scores = Array.from(Array(rankCriteria.maximumScore).keys());
		const selectedScore = this.state.criterioncores[criteriaIndex];
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
		const { rankCriterion } = this.props;
		return (
			<div className="EvaluateCriterion" >
				{rankCriterion.map((criteria, index) => 
					this.renderCriteria(criteria, index)
				)}
			</div>
		);
	}
}

export default EvaluateCriterion;
