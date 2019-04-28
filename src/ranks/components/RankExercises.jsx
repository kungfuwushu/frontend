import React from 'react';

import './RankExercises.css';
import { Tooltip } from 'antd';

import { ReactComponent as Remove } from '../../icons/cancel.svg';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const RankExercises = ({rankExercises, onChange}) => {
    const handleChange = (index) => (rankExercise) => {
        const data = rankExercises.slice();
        data[index] = rankExercise;
        onChange(data);
    }
    const handleRemove = (index) => () => {
        onChange(rankExercises.filter((_, i) => i !== index));
    }
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
        onChange(
            reorder(rankExercises,source.index,destination.index)
        );
    }
    return (
        <DragDropContext onDragEnd={handleSortEnd}>
            <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="RankExercises"
                >
                    {rankExercises.map((rankExercise, index) => (
                    <Draggable key={index} draggableId={rankExercise.id} index={index}>
                        {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={snapshot.isDragging ? "dragged-exercise" : "draggable-exercise"}
                        >
                            <RankExercise
                                rankExercise={rankExercise}
                                onChange={handleChange(index)}
                                onRemove={handleRemove(index)}
                                key={index}
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
    )
}

const RankExercise = ({ rankExercise, onRemove, onChange }) => {
    const { exercise } = rankExercise;
    const renderContent = () => {
        switch (exercise.type) {
            case 'TAOLU':
                return <Taolu rankExercise={rankExercise} onChange={onChange}/>
            case 'FIGHT':
                return <Fight rankExercise={rankExercise} onChange={onChange}/>
            default:
                return null;
        }
    }
    return (
        <div className="RankExercise">
            <div className="header">
                <Tooltip title="Retirer cet exercice">
                    <Remove onClick={() => onRemove(rankExercise)} className="remove"/>
                </Tooltip>
                <span className="exercise-name">{exercise.name}</span>
                <span className="exercise-type">{exercise.type}</span>
            </div>
            {renderContent()}
        </div>
    )
}

const Fight = ({ rankExercise, onChange }) => {
    const handleRoundsNumberChange = ({target : {value}}) => {
        var rounds = parseInt(value);
        const { rankRounds } = rankExercise;
        if (!rounds || rounds === rankRounds.length)
            return;
        if (rounds < rankRounds.length)
            onChange({
                ...rankExercise,
                rankRounds: rankRounds.slice(0, rounds),
            });
        else {
            const round = rankExercise.exercise.rounds[0];
            onChange({
                ...rankExercise,
                rankRounds: rankRounds.concat(
                    Array(rounds - rankRounds.length).fill().map(_ => ({
                        round,
                        rankCriterion: round.criterion.map(criteria => ({
                            criteria,
                            maximumScore: undefined,
                        }))
                    }))
                ),
            });
        }
    }
    const handleChange = (index) => (rankRound) => {
        const data = {...rankExercise};
        data.rankRounds[index] = rankRound;
        onChange(data);
    }
    const { rankRounds } = rankExercise;
    return (
        <React.Fragment>
            <div className="rounds-number">
                <span>Nombre de reprises : </span>
                <input type="number" min={1} value={rankRounds.length} onChange={handleRoundsNumberChange}/>
            </div>
            {rankRounds.map((rankRound, index) => 
                <Round
                    rankRound={rankRound}
                    number={index + 1}
                    onChange={handleChange(index)}
                    key={index}
                />
            )}
        </React.Fragment>
    )
}

const Taolu = ({ rankExercise, onChange }) => {
    const handleChange = (rankCriterion) => {
        onChange({
            ...rankExercise,
            rankCriterion
        })
    }
    return (
        <div className="criterion">
            <CriterionContainer
                rankCriterion={rankExercise.rankCriterion}
                onChange={handleChange}
            />
        </div>
    );
}

const Round = ({ rankRound, number, onChange }) => {
    const handleChange = (rankCriterion) => {
        onChange({
            ...rankRound,
            rankCriterion
        })
    }
    return (
        <div className="criterion">
            <span className="round-title">Reprise #{number}</span>
            <CriterionContainer
                rankCriterion={rankRound.rankCriterion}
                onChange={handleChange}
            />
        </div>
    );
}

const CriterionContainer = ({rankCriterion, onChange}) => {
    const handleChange = (index) => (rankCriteria) => {
        const data = rankCriterion.slice();
        data[index] = rankCriteria;
        onChange(data);
    }
    return (
        <React.Fragment>
            {rankCriterion.map((rankCriteria, index) =>
                <Criteria
                    rankCriteria={rankCriteria}
                    onChange={handleChange(index)}
                    key={index}
                />
            )}
        </React.Fragment>
    );
}

const Criteria = ({ rankCriteria, onChange }) => {
    const handleChange = ({target: {value}}) => {
        onChange({
            ...rankCriteria,
            maximumScore: parseInt(value) || undefined
        })
    }
    const { criteria, maximumScore } = rankCriteria;
    return (
        <div className="criteria">
            <span>{criteria.name}</span>
            <div className="criteria-scale">
                <Tooltip title="Barème">
                    <input type="number" value={maximumScore || ''} onChange={handleChange} min={0}/>
                </Tooltip>
            </div>
        </div>
    );
}

export default RankExercises;
