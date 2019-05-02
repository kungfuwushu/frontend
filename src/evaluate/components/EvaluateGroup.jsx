import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';

import { Menu, Col, Button, Icon } from 'antd';

import './EvaluateGroup.css';

import EvaluateExercise from './EvaluateExercise';

import { Card } from '../../custom';

import * as api from '../../api';

const EvaluateGroup = ({ match }) => {
    const [ test, setTest ] = useState(undefined);
    const [ performers, setPerformers ] = useState([]);
    const [ exercisesScales, setExercisesScales ] = useState([]);
    const [ performer, setPerformer ] = useState(undefined);
    const [ exerciseScale, setExerciseScale ] = useState(undefined);
    const [ testsResults, setTestsResults ] = useState([]);
    const [ testResult, setTestResult ] = useState(undefined);
    const [ exerciseResult, setExerciseResult ] = useState(undefined);

    useEffect(() => {
        const testId = match.params.id;
        Promise.all([
            api.Tests.byId(testId),
            api.TestResults.byTestId(testId),
            api.Members.byTestId(testId),
        ]).then(([ test, testsResults, performers ]) => {
            setTest(test);
            setTestsResults(testsResults);
            setPerformers(performers);
            setPerformer(performers.length > 0 ? performers[0] : undefined);
            if (test.type === 'PROGRAM')
                initExercisesScales(test.exercisesScales);
            if (test.type === 'RANK')
                api.Ranks.byTestId(test.id)
                    .then((ranks) => {
                        initExercisesScales(ranks.reduce((list, rank) => list.concat(rank.exercisesScales), []));
                    });
        });
    }, []);

    useEffect(() => () => save(), [exerciseResult, testResult]);

    useEffect(() => {
        save();

        if (!performer || !exerciseScale) {
            setExerciseResult(undefined);
            return;
        }
        const testResult = testsResults.find(testResult =>
            testResult.performerId === performer.id
        );
        setTestResult(testResult);
        api.ExerciseResults.byTestResultIdAndExerciseScaleId(testResult.id, exerciseScale.id)
            .then(exercisesResults => {
                if (exercisesResults.length > 0) {
                    setExerciseResult(exercisesResults[0]);
                    return;
                }
                var exerciseResult = {
                    exerciseScale,
                    type: exerciseScale.exercise.type,
                }
                switch (exerciseResult.type) {
                    case 'TAOLU':
                        exerciseResult.criterionResults = exerciseScale.criterionScales.map(criteriaScale => ({
                            criteriaScale,
                            score: undefined,
                        }));
                        break;
                    case 'FIGHT':
                        exerciseResult.roundsResults = exerciseScale.roundsScales.map(roundScale => ({
                            roundScale,
                            criterionResults: roundScale.criterionScales.map(criteriaScale => ({
                                criteriaScale,
                                score: undefined,
                            })),
                        }));
                        break;
                    case 'PHYSICAL':
                        exerciseResult.score = undefined;
                        break;
                    default:
                        break;
                }
                setExerciseResult(exerciseResult);
            });
    }, [performer, exerciseScale]);

    const initExercisesScales = (exercisesScales) => {
        setExercisesScales(exercisesScales);
        setExerciseScale(exercisesScales.length > 0 ? exercisesScales[0] : undefined)
    }
    
    const handleExerciseScaleSelected = (exerciseScale) => () => setExerciseScale(exerciseScale);

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

    const handleExerciseResultChange = (exerciseResult) => setExerciseResult({
        ...exerciseResult,
        modified: true
    });

    const save = () => {
        if (exerciseResult && exerciseResult.modified) {
            if (exerciseResult.id)
                api.ExerciseResults.update(testResult.id, exerciseResult);
            else 
                api.ExerciseResults.create(testResult.id, exerciseResult);
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
                    <EvaluateExercise
                        exerciseResult={exerciseResult}
                        onChange={handleExerciseResultChange}
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
