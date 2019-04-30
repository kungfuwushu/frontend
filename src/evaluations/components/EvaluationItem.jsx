import React from 'react';
import { Link } from 'react-router-dom';

import './EvaluationItem.css';
import { Button } from 'antd';

import moment from 'moment';
import 'moment/locale/fr';

const EvaluationItem = ({ evaluation }) => {
	const { groups, address, city, postalCode, date } = evaluation;
	return(
		<div className="EvaluationItem">
			<div className="evaluation-header">
				<div className="title-type">
					<span className="title">{evaluation.name}</span>
					<span className="type">{evaluation.type}</span>
				</div>
				<span className="date">
					<span className="day">{moment(date).format('dddd Do MMMM YYYY')}</span>
					<div>à <span className="hour">{moment(date).format('HH:mm')}</span></div>
				</span>
			</div>
			<div className="body">
				<div className="descriptions">
					<span>{`${address}, ${city} ${postalCode}`}</span>
					{groups.map((group, index) =>
						<span key={index}>{group.name}</span>
					)}
				</div>
				<div className="actions">
                    <Link to={`/evaluations/${evaluation.id}/edit`}>
					    <Button type="primary">Editer</Button>
                    </Link>
                    <Link to={`/evaluations/${evaluation.id}/results`}>
					    <Button type="primary">Résultats</Button>
                    </Link>
                    <Link to={`/evaluations/${evaluation.id}/evaluate-group`}>
					    <Button type="primary">Evaluer</Button>
                    </Link>
				</div>
			</div>
		</div>
	)
}

export default EvaluationItem;
