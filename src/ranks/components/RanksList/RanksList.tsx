import * as React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import * as _ from 'lodash';

import { IRanksListProps } from '../../../actions/ranks/RanksList.Actions';
import * as RanksListActionCreators from '../../../actions/ranks/RanksList.Actions';

import './RanksList.css';
import { Button } from 'antd';

class RanksList extends React.Component<IRanksListProps> {
	public componentWillMount(){
		this.props.onLoad();
	}

	private renderRank(rank: any){
		const { id, name, image } = rank;
        return(
			<div key={id} className="rank">
				{image?
					<img className="image" src={image}/> : ''
				}
				{name}
			</div>
		)
	}

	public render() {
		const { ranks } = this.props;
		return (
			<div className="RanksList">
				<div className="header">
					<div className="top">
						<h2>Grades</h2>
						<Button onClick={() => this.props.history.push('/new-rank')} type="primary">Créer un nouveau grade</Button>
					</div>
				</div>
				<div className="ranks">
					{ranks.map((rank: any) =>
						this.renderRank(rank)
					)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: any) => ({
    ranks: state.ranksList.ranks,
});

const mapDispatchtoProps = (dispatch: Dispatch) =>
    bindActionCreators(_.assign({}, RanksListActionCreators), dispatch);

export default connect(mapStateToProps, mapDispatchtoProps)(RanksList);