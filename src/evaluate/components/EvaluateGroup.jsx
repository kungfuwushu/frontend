import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';

import { Menu, Col, Button, Icon } from 'antd';

import './EvaluateGroup.css';

import ExerciseTest from './EvaluateExercise';

import { Card } from '../../custom';

import * as api from '../../api';

const EvaluateGroup = ({ match }) => {
    const [ test, setTest ] = useState(undefined);
    const [ performers, setPerformers ] = useState([]);
    const [ exercisesScales, setExercisesScales ] = useState([]);
    const [ performer, setPerformer ] = useState(undefined);
    const [ exerciseScale, setExerciseScale ] = useState(undefined);

    useEffect(() => {
        const testId = match.params.id;
        Promise.all([
            api.Tests.byId(testId),
            api.Members.byTestId(testId),
            /*api.ExercisesScales.byTestId(testId),*/
        ]).then(([ test, performers/*, exercisesScales */]) => {
            setTest(test);
            setPerformers(performers);
            setPerformer(performers.length > 0 ? performers[0] : undefined);
            setExercisesScales([]);
            setExerciseScale(undefined);
            // setExercisesScales(exercisesScales);
            // setExerciseScale(exercisesScales.length > 0 ? exercisesScales[0] : undefined);
        });
    }, []);
    
    const handleExerciseScaleSelected = (exerciseScale) => () => {
        setExerciseScale(exerciseScale);
        // filter performers according to the exerciseScale
    }

    const handlePerformerSelected = (performer) => () => setPerformer(performer);

    const handleNext = () => {
        const performerIndex = performers.indexOf(performer);
        if (performerIndex !== performers.length - 1)
            setPerformer(performers[performerIndex + 1]);
        else {
            setPerformer(performers[0]);
            const exerciseScaleIndex = exercisesScales.indexOf(exerciseScale);
            setExerciseScale(exercisesScales[(exerciseScaleIndex + 1) % exercisesScales.length]);
        }
    }

    if (!test)
        return(<div>Loading...</div>);
    return (
        <div className="EvaluateGroup">
            <Card className="card">
                <Col className="list" xs={5} sm={5} md={5} lg={5} xl={5}>
                    <div className="list-header">Exercices</div>
                    <Menu selectedKeys={exerciseScale ? [exerciseScale.id+''] : []}>
                        {exercisesScales.map(exerciseScale => 
                            <Menu.Item
                                key={exerciseScale.id}
                                onClick={handleExerciseScaleSelected(exerciseScale)}
                            >
                                <span>{exerciseScale.exercise.name}</span>
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
                    <ExerciseTest
                        test={test}
                        performer={performer}
                        exerciseScale={exerciseScale}
                    />
                    <div className="next">
                        <Button onClick={handleNext} type="primary">SUIVANT <Icon type="right"/></Button>
                    </div>
                </Col>
            </Card>
        </div>
    );
}

export default withRouter(EvaluateGroup);
