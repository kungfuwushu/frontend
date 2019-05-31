import React, { useState, useEffect } from 'react';

import './RanksList.css';
import { Button } from 'antd';

import { Card, OrderableList } from '../custom';

import * as api from '../../api';

import RankItem from './RankItem';

const RanksList = ({history}) => {
	const [ ranks, setRanks ] = useState([]);

	useEffect(() => {
		api.Ranks.all()
			.then(ranks =>
				setRanks(ranks)
			);
	}, []);

	const handleReorder = (items, startIndex, endIndex) => {
		const rankId = ranks[startIndex].id;
		setRanks(items.map((rank, index) => ({
			...rank,
			position: index
		})));
		api.Ranks.reorder(rankId, startIndex, endIndex);
	}

	const handleDelete = (rankId) => () => {
		api.Ranks.delete(rankId);
		setRanks(
			ranks.filter(rank => rank.id !== rankId)
		)
	}
	
	return (
		<Card className="RanksList">
			<div className="header">
				<h2>Grades</h2>
				<Button
					onClick={() => history.push('/new-rank')}
					type="primary"
				>
					Créer un nouveau grade
				</Button>
			</div>
			<div className="table-header">
				<span className="name">Nom</span>
				<span>Nombre d'exercices</span>
			</div>
			{ranks.length < 1 ?
				<span className="empty">Aucun résultat</span>
				:
				<OrderableList 
					items={ranks}
					renderItem={(rank) =>
						<RankItem
							rank={rank}
							onDelete={handleDelete(rank.id)}
							className="item"
						/>
					}
					onReorder={handleReorder}
					className="ranks"
				/>
			}
		</Card>
	);
}

export default RanksList;