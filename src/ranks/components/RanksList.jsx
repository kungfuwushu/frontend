import React, { useState, useEffect } from 'react';

import './RanksList.css';
import { Button } from 'antd';

import * as api from '../../api';

const RanksList = ({history}) => {
	const [ ranks, setRanks ] = useState([]);

	useEffect(() => {
		api.Ranks.all()
			.then(ranks =>
				setRanks(ranks)
			);
	}, []);

	return (
		<div className="RanksList">
			<div className="header">
				<div className="top">
					<h2>Grades</h2>
					<Button
						onClick={() => history.push('/new-rank')}
						type="primary"
					>
						Créer un nouveau grade
					</Button>
				</div>
			</div>
			<div className="ranks">
				{ranks.map((rank) =>
					<div key={rank.id} className="rank">
						{rank.image && <img src={rank.image} alt={rank.name} />}
						{rank.name}
					</div>
				)}
			</div>
		</div>
	);
}

export default RanksList;