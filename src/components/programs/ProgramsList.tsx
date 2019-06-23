import React, { FC, useState, useEffect } from 'react';

import { Button } from 'antd';

import { Card } from '../custom';

import * as api from '../../api';

import ProgramItem from './ProgramItem';

import { Program } from '../../types';

import './ProgramsList.css';

const ProgramsList: FC<{
    history: any
}> = ({ history }) => {
	const [ programs, setPrograms ] = useState<Array<Program>>([]);

	useEffect(() => {
		api.Programs.all()
			.then((programs: Program[]) =>
				setPrograms(programs)
			);
	}, []);

	const handleDelete = (programId: number) => () => {
		api.Programs.delete(programId);
		setPrograms(
			programs.filter(program => program.id !== programId)
		)
	}
	
	return (
		<Card className="ProgramsList">
			<div className="header">
				<h2>Programmes</h2>
				<Button
					onClick={() => history.push('/new-program')}
					type="primary"
				>
					Créer un nouveau programme
				</Button>
			</div>
			<div className="table-header">
				<span className="name">Nom</span>
				<span>Nombre d'exercices</span>
			</div>
			{programs.length < 1 ?
				<span className="empty">Aucun résultat</span>
				:
				<div className="programs">
					{programs.map(program => (
						<ProgramItem
							program={program}
							onDelete={handleDelete(program.id)}
							className="item"
						/>
					))}
				</div>
			}
		</Card>
	);
}

export default ProgramsList;