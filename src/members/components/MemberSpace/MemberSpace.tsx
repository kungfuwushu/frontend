import * as React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import * as _ from 'lodash';
import { IMemberSpaceProps } from '../../../actions/members/MemberSpace.Actions';
import * as MemberSpaceActionCreators from '../../../actions/members/MemberSpace.Actions';

import './MemberSpace.css';
import { Select, Button } from 'antd';
const Option = Select.Option;
import { SearchInput } from '../../../custom';

import moment from 'moment';

class MemberSpace extends React.Component<IMemberSpaceProps> {
	public componentWillMount(){
		this.props.onLoad(1);
	}

	private renderEvaluation(evaluation: any){
		const { groups, address, city, postalCode, date } = evaluation;
        return(
			<div className="evaluation" key={evaluation.id} onClick={() => this.props.history.push('/trainings')}>
				<div className="evaluation-header">
					<div className="title-type">
						<span className="title">Nom de l'evaluation</span>
						<span className="type">TPYE D'EVALUATION</span>
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
				</div>
			</div>
		)
	}

	private filterEvaluations() {
		const { evaluations } = this.props;
		return evaluations
	}

	public render() {
		const { member } = this.props;
		const filteredEvaluations = this.filterEvaluations();
		const evaluationsTypes = ['Passage de grade', 'Autre']
		return (
			<div className="MemberSpace">
				<h1>MemberSpace:{member?` ${member.firstName} ${member.lastName}`:''}</h1>
				<div className="member">
					<div className="edit">
						<h2>Informations</h2>
						<Button onClick={() => this.props.history.push('/trainings')} type="primary">Edit</Button>
					</div>
					<div className="img_info">
						<img src="data:image/jpeg;base64,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" />
						{member?
							<div className="info">
								<div className="line">
									<span className="head">LastName:</span>
									<span>{" "+member.lastName}</span>
								</div>
								<div className="line">
									<span className="head">FirstName:</span>
									<span>{" "+member.firstName}</span>
								</div>
								<div className="line">
									<span className="head">Email:</span>
									<span>{" "+member.emailAddress}</span>
								</div>
								<div className="line">
									<span className="head">Group:</span>
									<span>{" Group"+member.groupId}</span>
								</div>
								<div className="line">
									<span className="head">Rank:</span>
									<span>{" Rank"+member.rankId}</span>
								</div>
							</div>
						:
							'loading infos..'
						}
					</div>
				</div>
				<div className="upcoming-evaluations">				
					<div className="header">
						<div className="top">
							<h2>Evaluations à venir</h2>
						</div>
						<div className="filters">
							<Select defaultValue="Type" className="select" onChange={val => this.props.setTypeFilter(val)}>
								{evaluationsTypes.map((type: any) =>
									<Option value={type} key={type}>{type}</Option>
								)}
							</Select>
							<SearchInput
								onSearch={val => this.props.setContainingFilter(val)}
								placeholder="Rechercher par nom ou date"
							/>
						</div>
					</div>
					<div className="evaluations">
						{filteredEvaluations.map((evaluation: any) =>
							this.renderEvaluation(evaluation)
						)}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: any) => ({
    evaluations: state.memberSpace.evaluations,
    containingFilter: state.memberSpace.containingFilter,
	typeFilter: state.memberSpace.typeFilter,
	member: state.memberSpace.member,
});

const mapDispatchtoProps = (dispatch: Dispatch) =>
    bindActionCreators(_.assign({}, MemberSpaceActionCreators), dispatch);

export default connect(mapStateToProps, mapDispatchtoProps)(MemberSpace);