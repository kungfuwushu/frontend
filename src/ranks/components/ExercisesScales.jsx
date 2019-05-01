import React from 'react';

import './ExercisesScales.css';
import { Tooltip } from 'antd';

import { InputNumber } from '../../custom';

import { ReactComponent as Remove } from '../../icons/cancel.svg';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ExercisesScales = ({exercisesScales, onChange}) => {
    const handleChange = (index) => (exerciseScale) => {
        const data = exercisesScales.slice();
        data[index] = exerciseScale;
        onChange(data);
    }
    const handleRemove = (index) => () => {
        onChange(exercisesScales.filter((_, i) => i !== index));
    }
    const reorder = (exercisesScales, startIndex, endIndex) => {
        const reordered = Array.from(exercisesScales);
        const [removed] = reordered.splice(startIndex, 1);
        reordered.splice(endIndex, 0, removed);
        return reordered;
    };
    const handleSortEnd = ({source, destination}) => {
        if (!destination) {
          return;
        }
        onChange(
            reorder(exercisesScales, source.index, destination.index)
        );
    }
    return (
        <DragDropContext onDragEnd={handleSortEnd}>
            <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="ExercisesScales"
                >
                    {exercisesScales.map((exerciseScale, index) => (
                    <Draggable key={index} draggableId={exerciseScale.id} index={index}>
                        {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={snapshot.isDragging ? "dragged-exercise" : "draggable-exercise"}
                        >
                            <ExerciseScale
                                exerciseScale={exerciseScale}
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

const ExerciseScale = ({ exerciseScale, onRemove, onChange }) => {
    const { exercise } = exerciseScale;
    const renderContent = () => {
        switch (exercise.type) {
            case 'TAOLU':
                return <Taolu exerciseScale={exerciseScale} onChange={onChange}/>
            case 'FIGHT':
                return <Fight exerciseScale={exerciseScale} onChange={onChange}/>
            default:
                return null;
        }
    }
    return (
        <div className="ExerciseScale">
            <div className="header">
                <Tooltip title="Retirer cet exercice">
                    <Remove onClick={() => onRemove(exerciseScale)} className="remove"/>
                </Tooltip>
                <span className="exercise-name">{exercise.name}</span>
                <span className="exercise-type">{exercise.type}</span>
            </div>
            {renderContent()}
        </div>
    )
}

const Fight = ({ exerciseScale, onChange }) => {
    const handleRoundsNumberChange = (rounds) => {
        const { roundsScales } = exerciseScale;
        if (!rounds || rounds === roundsScales.length)
            return;
        if (rounds < roundsScales.length)
            onChange({
                ...exerciseScale,
                roundsScales: roundsScales.slice(0, rounds),
            });
        else {
            const round = exerciseScale.exercise.rounds[0];
            onChange({
                ...exerciseScale,
                roundsScales: roundsScales.concat(
                    Array(rounds - roundsScales.length).fill().map(_ => ({
                        round,
                        criterionScales: round.criterion.map(criteria => ({
                            criteria,
                            scale: undefined,
                        }))
                    }))
                ),
            });
        }
    }
    const handleChange = (index) => (roundScale) => {
        const data = {...exerciseScale};
        data.roundsScales[index] = roundScale;
        onChange(data);
    }
    const { roundsScales } = exerciseScale;
    return (
        <React.Fragment>
            <div className="rounds-number">
                <span>Nombre de reprises : </span>
                <InputNumber
                    min={1}
                    value={roundsScales.length}
                    onChange={handleRoundsNumberChange}
                    className="rounds-input"
                />
            </div>
            {roundsScales.map((roundScale, index) => 
                <Round
                    roundScale={roundScale}
                    number={index + 1}
                    onChange={handleChange(index)}
                    key={index}
                />
            )}
        </React.Fragment>
    )
}

const Taolu = ({ exerciseScale, onChange }) => {
    const handleChange = (criterionScales) => {
        onChange({
            ...exerciseScale,
            criterionScales
        })
    }
    return (
        <div className="criterion">
            <CriterionContainer
                criterionScales={exerciseScale.criterionScales}
                onChange={handleChange}
            />
        </div>
    );
}

const Round = ({ roundScale, number, onChange }) => {
    const handleChange = (criterionScales) => {
        onChange({
            ...roundScale,
            criterionScales
        })
    }
    return (
        <div className="criterion">
            <span className="round-title">Reprise #{number}</span>
            <CriterionContainer
                criterionScales={roundScale.criterionScales}
                onChange={handleChange}
            />
        </div>
    );
}

const CriterionContainer = ({criterionScales, onChange}) => {
    const handleChange = (index) => (criteriaScale) => {
        const data = criterionScales.slice();
        data[index] = criteriaScale;
        onChange(data);
    }
    return (
        <React.Fragment>
            {criterionScales.map((criteriaScale, index) =>
                <Criteria
                    criteriaScale={criteriaScale}
                    onChange={handleChange(index)}
                    key={index}
                />
            )}
        </React.Fragment>
    );
}

const Criteria = ({ criteriaScale, onChange }) => {
    const handleChange = (value) => {
        onChange({
            ...criteriaScale,
            scale: value
        })
    }
    const { criteria, scale } = criteriaScale;
    return (
        <div className="criteria">
            <span>{criteria.name}</span>
            <div className="criteria-scale">
                <Tooltip title="Barème">
                    <InputNumber
                        min={0}
                        value={scale || ''}
                        onChange={handleChange}
                    />
                </Tooltip>
            </div>
        </div>
    );
}

export default ExercisesScales;
