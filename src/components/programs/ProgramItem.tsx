import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as EditIcon } from '../../icons/edit.svg';
import { ReactComponent as DeleteIcon } from '../../icons/delete.svg';

import classNames from 'classnames';
import { Program } from '../../types';

import './ProgramItem.css';

const ProgramItem: FC<{
    program: Program;
    onDelete: () => void;
    className: string;
}> = ({ program, onDelete, className }) => {
	const exercisesLength = program.exercisesScales.length;
	return (
		<div className={classNames("ProgramItem", className)}>
            <span className="name">{program.name}</span>
			<span className="exercises">{`${exercisesLength} exercice${exercisesLength > 1 ? 's' : ''}`}</span>
			<div className="actions">
				<Link to={`/programs/${program.id}/edit`}>
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

export default ProgramItem;
