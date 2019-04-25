import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';

import { Menu, Col, Button, Icon } from 'antd';

import './EvaluateGroup.css';

import ExerciseEvaluation from './EvaluateExercise';

import * as api from '../../api';

const EvaluateGroup = ({ match }) => {
    const [ evaluation, setEvaluation ] = useState(undefined);
    const [ performers, setPerformers ] = useState([]);
    const [ rankExercises, setRankExercises ] = useState([]);
    const [ performer, setPerformer ] = useState(undefined);
    const [ rankExercise, setRankExercise ] = useState(undefined);

    useEffect(() => {
        const evaluationId = match.params.id;
        Promise.all([
            api.Evaluations.byId(evaluationId),
            api.Members.byEvaluationId(evaluationId),
            api.RankExercises.byEvaluationId(evaluationId),
        ]).then(([ evaluation, performers, rankExercises ]) => {
            setEvaluation(evaluation);
            setPerformers(performers);
            setRankExercises(rankExercises);
            setPerformer(performers[0]);
            setRankExercise(rankExercises[0]);
        });
    }, []);
    
    const handleRankExerciseSelected = (rankExercise) => () => {
        setRankExercise(rankExercise);
        // filter performers according to the rankExercise
    }

    const handlePerformerSelected = (performer) => () => setPerformer(performer);

    const handleNext = () => {
        const performerIndex = performers.indexOf(performer);
        if (performerIndex !== performers.length - 1)
            setPerformer(performers[performerIndex + 1]);
        else {
            setPerformer(performers[0]);
            const rankExerciseIndex = rankExercises.indexOf(rankExercise);
            setRankExercise(rankExercises[(rankExerciseIndex + 1) % rankExercises.length]);
        }
    }

    if (!evaluation)
        return(<div>Loading...</div>);
    return (
        <div className="EvaluateGroup">
            <Col className="list" xs={5} sm={5} md={5} lg={5} xl={5}>
                <div className="list-header">Exercices</div>
                <Menu selectedKeys={rankExercise ? [rankExercise.id+''] : []}>
                    {rankExercises.map(rankExercise => 
                        <Menu.Item
                            key={rankExercise.id}
                            onClick={handleRankExerciseSelected(rankExercise)}
                        >
                            <span>{rankExercise.exercise.name}</span>
                        </Menu.Item>
                    )}
                </Menu>
            </Col>
            <Col className="list" xs={5} sm={5} md={5} lg={5} xl={5}>
                <div className="list-header">Pratiquants</div>
                <Menu selectedKeys={performer ? [performer.id+''] : []}>
                    {performers.map((performer) =>
                        <Menu.Item
                            key={performer.id}
                            onClick={handlePerformerSelected(performer)}
                        >
                            <span>{performer.firstName + " " + performer.lastName}</span>
                        </Menu.Item>
                    )}
                </Menu>
            </Col>
            <Col xs={14} sm={14} md={14} lg={14} xl={14} className="exercise-panel">
                <ExerciseEvaluation
                    evaluation={evaluation}
                    performer={performer}
                    rankExercise={rankExercise}
                />
                <div className="next">
                    <Button onClick={handleNext} type="primary">SUIVANT <Icon type="right"/></Button>
                </div>
            </Col>
        </div>
    );
}

export default withRouter(EvaluateGroup);
