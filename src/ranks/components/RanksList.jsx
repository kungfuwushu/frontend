import React, { useState, useEffect } from 'react';

import './RanksList.css';
import { Button } from 'antd';

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import * as api from '../../api';

const RanksList = ({history}) => {
	const [ ranks, setRanks ] = useState([]);

	useEffect(() => {
		api.Ranks.all()
			.then(ranks =>
				setRanks(ranks)
			);
	}, []);

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };
    const handleSortEnd = ({source, destination}) => {
        if (!destination) {
          return;
        }
        setRanks(
            reorder(ranks, source.index, destination.index)
        );
	}
	
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
								className={`rank ${snapshot.isDragging ? "dragged-rank" : "draggable-rank"}`}
							>
								{rank.image && <img src={rank.image} alt={rank.name} />}
								{rank.name}
							</div>
							)}
						</Draggable>
						))}
						{provided.placeholder}
					</div>
					)}
				</Droppable>
			</DragDropContext>
		</div>
	);
}

export default RanksList;