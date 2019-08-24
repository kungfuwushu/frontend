import React, { useEffect, useState, FC } from 'react';
import { withRouter, match } from 'react-router';

import { Menu, Col, Button, Icon } from 'antd';

import './EvaluateGroup.css';

import EvaluateExercise from './EvaluateExercise';

import { Card, Loading } from '../custom';

import * as api from '../../api';
import { Rank, Test, ExerciseScale, Member, ExerciseResult, TestResult } from '../../types';
import { create as createExerciseReult } from '../../utils/ExerciseResult.utils';

interface IEvaluateGroup {
    match: match<any>;
}

const EvaluateGroup: FC<IEvaluateGroup> = ({ match }) => {
    const [ test, setTest ] = useState<Test>(undefined);
    const [ performers, setPerformers ] = useState<Array<Member>>([]);
    const [ exercisesScales, setExercisesScales ] = useState<Array<ExerciseScale>>([]);
    const [ performer, setPerformer ] = useState<Member>(undefined);
    const [ exerciseScale, setExerciseScale ] = useState<ExerciseScale>(undefined);
    const [ testsResults, setTestsResults ] = useState<Array<TestResult>>([]);
    const [ testResult, setTestResult ] = useState<TestResult>(undefined);
    const [ exerciseResult, setExerciseResult ] = useState<ExerciseResult>(undefined);

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
                initExercisesScales(test.program.exercisesScales);
            if (test.type === 'RANK')
                api.Ranks.byTestId(test.id)
                    .then((ranks: Rank[]) => {
                        initExercisesScales(
                            ranks.reduce((exercisesScales: ExerciseScale[], rank: Rank) => 
                                exercisesScales.concat(rank.exercisesScales)
                            , [])
                        );
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
            .then((exercisesResults: ExerciseResult[]) => {
                setExerciseResult(exercisesResults.length > 0 ?
                    exercisesResults[0] : createExerciseReult(exerciseScale)
                );
            });
    }, [performer, exerciseScale]);

    const initExercisesScales = (exercisesScales: ExerciseScale[]) => {
        setExercisesScales(exercisesScales);
        setExerciseScale(exercisesScales.length > 0 ? exercisesScales[0] : undefined)
    }
    
    const handleExerciseScaleSelected = (exerciseScale: ExerciseScale) => () => setExerciseScale(exerciseScale);

    const handlePerformerSelected = (performer: Member) => () => setPerformer(performer);

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

    const handleExerciseResultChange = (exerciseResult: ExerciseResult) => {
        const newE ={
            ...exerciseResult,
            modified: true
        };
        setExerciseResult(newE);
    }

    const save = () => {
        if (exerciseResult && exerciseResult.modified) {
            if (exerciseResult.id)
                api.ExerciseResults.update(exerciseResult);
            else 
                api.ExerciseResults.create(testResult.id, exerciseResult);
        }
    }

    if (!test)
        return <Loading />;
    return (
        <Card className="EvaluateGroup">
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
    );
}

export default withRouter(EvaluateGroup as any);
