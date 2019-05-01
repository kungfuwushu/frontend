import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as EditIcon } from '../../icons/edit.svg';
import { ReactComponent as DeleteIcon } from '../../icons/delete.svg';

import './RankItem.css';

import classNames from 'classnames';

const RankItem = ({ rank, onDelete, className }) => {
	const exercises = rank.exercisesScales.length;
	return (
		<div className={classNames("RankItem", className)}>
			<div className="name">
				{rank.image && <img src={rank.image} alt={rank.name} />}
				<span>{rank.name}</span>
			</div>
			<span className="exercises">{`${exercises} exercice${exercises > 1 ? 's' : ''}`}</span>
			<div className="actions">
				<Link to={`/ranks/${rank.id}/edit`}>
					<EditIcon className="edit" />
				</Link>
				<DeleteIcon
					className="delete"
					onClick={onDelete}	
				/>
			</div>
		</div>
	);
}

export default RankItem;
