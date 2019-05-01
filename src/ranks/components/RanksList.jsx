import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './RanksList.css';
import { Button } from 'antd';

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { ReactComponent as EditIcon } from '../../icons/edit.svg';
import { ReactComponent as DeleteIcon } from '../../icons/delete.svg';

import { Card } from '../../custom';

import * as api from '../../api';

const RanksList = ({history}) => {
	const [ ranks, setRanks ] = useState([]);

	useEffect(() => {
		api.Ranks.all()
			.then(ranks =>
				setRanks(ranks)
			);
	}, []);

    const reorder = (ranks, startIndex, endIndex) => {
        const reordered = Array.from(ranks);
        const [removed] = reordered.splice(startIndex, 1);
		reordered.splice(endIndex, 0, removed);
        return reordered.map((rank, index) => ({
			...rank,
			position: index
		}));
    };
    const handleSortEnd = ({source, destination}) => {
        if (!destination) {
          return;
		}
		const rankId = ranks[source.index].id;
		const reorderedRanks = reorder(ranks, source.index, destination.index);
		setRanks(reorderedRanks);
		api.Ranks.reorder(rankId, source.index, destination.index);
	}

	const handleDelete = (rankId) => () => {
		api.Ranks.delete(rankId);
		setRanks(
			ranks.filter(rank => rank.id !== rankId)
		)
	}
	
	return (
		<div className="RanksList">
			<Card className="card">
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
					<DragDropContext onDragEnd={handleSortEnd}>
						<Droppable droppableId="droppable">
							{(provided, snapshot) => (
							<div
								{...provided.droppableProps}
								ref={provided.innerRef}
								className="ranks"
							>
								{ranks.map((rank, index) => (
								<Draggable key={index} draggableId={rank.id} index={index}>
									{(provided, snapshot) => (
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
										className={`${snapshot.isDragging ? "dragged" : "draggable"}`}
									>
										<RankItem
											rank={rank}
											onDelete={handleDelete(rank.id)}
										/>
									</div>
									)}
								</Draggable>
								))}
								{provided.placeholder}
							</div>
							)}
						</Droppable>
					</DragDropContext>
				}
			</Card>
		</div>
	);
}

const RankItem = ({ rank, onDelete }) => {
	const exercises = rank.exercisesScales.length;
	return (
		<div className="RankItem">
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

export default RanksList;