import React from 'react';
import { Link } from 'react-router-dom';

import './TestItem.css';
import { Button } from 'antd';

import moment from 'moment';
import 'moment/locale/fr';

const TestItem = ({ test }) => {
	const { groups, address, city, postalCode, date } = test;
	return(
		<div className="TestItem">
			<div className="test-header">
				<div className="title-type">
					<span className="title">{test.name}</span>
					<span className="type">{test.type}</span>
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
                    <Link to={`/tests/${test.id}/edit`}>
					    <Button type="primary">Editer</Button>
                    </Link>
                    <Link to={`/tests/${test.id}/results`}>
					    <Button type="primary">Résultats</Button>
                    </Link>
                    <Link to={`/tests/${test.id}/evaluate-group`}>
					    <Button type="primary">Evaluer</Button>
                    </Link>
				</div>
			</div>
		</div>
	)
}

export default TestItem;
