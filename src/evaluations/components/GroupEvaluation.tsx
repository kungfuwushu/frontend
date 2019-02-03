import * as React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import * as _ from 'lodash';

import { IGroupEvaluationProps } from '../../actions/GroupEvaluation.Actions';
import * as GroupEvaluationActionCreators from '../../actions/GroupEvaluation.Actions';

import { Menu, Col, Button, Icon } from 'antd';

import '../styles/GroupEvaluation.css';

import ExerciseEvaluation from './ExerciseEvaluation';
import * as api from '../../api';

class GroupEvaluation extends React.Component<IGroupEvaluationProps> {
    public componentWillMount() {
        const evaluationId = this.props.match.params.id;
        Promise.all([
            api.Evaluations.byId(evaluationId),
            api.Members.byEvaluationId(evaluationId),
            api.RankExercises.byEvaluationId(evaluationId),
            api.RankCriterias.byEvaluationId(evaluationId),
        ]).then(data =>
            this.props.onLoad(data)
        );
    }
	
    private findRankExercise() {
		const { selectedPerformer, selectedExercise, rankExercises } = this.props;
        if (!selectedPerformer || !selectedExercise)
            return undefined;
        return rankExercises.find((rankExercise:any) =>
            rankExercise.exercise.id == selectedExercise.id 
            && rankExercise.rankId == selectedPerformer.rankId
        );
	}

    public render() {
        const { evaluation, performers, selectedExercise, selectedPerformer } = this.props;
        const { selectExercise, selectPerformer, next } = this.props
        if (!evaluation)
            return(<div>Loading...</div>);
        return (
            <div className="GroupEvaluation">
                <Col className="list" xs={5} sm={5} md={5} lg={5} xl={5}>
                    <div className="list-header">Exercices</div>
                    <Menu selectedKeys={[selectedExercise.id+'']}>
                        {evaluation.exercises.map((exercise:any) => 
                            <Menu.Item key={exercise.id} onClick={() => selectExercise(exercise)}>
                                <span>{exercise.name}</span>
                            </Menu.Item>
                        )}
                    </Menu>
                </Col>
                <Col className="list" xs={5} sm={5} md={5} lg={5} xl={5}>
                    <div className="list-header">Pratiquants</div>
                    <Menu selectedKeys={[selectedPerformer.id+'']}>
                        {performers.map((performer) =>
                            <Menu.Item key={performer.id} onClick={() => selectPerformer(performer)}>
                                <span>{performer.firstName + " " + performer.lastName}</span>
                            </Menu.Item>
                        )}
                    </Menu>
                </Col>
                <Col xs={14} sm={14} md={14} lg={14} xl={14} className="exercise-panel">
                    <ExerciseEvaluation rankExercise={this.findRankExercise()}/>
                    <div className="next">
                        <Button onClick={() => next()} type="primary">SUIVANT <Icon type="right"/></Button>
                    </div>
                </Col>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    evaluation: state.groupEvaluation.evaluation,
    performers: state.groupEvaluation.performers,
    selectedPerformer: state.groupEvaluation.selectedPerformer,
    selectedExercise: state.groupEvaluation.selectedExercise,
	rankExercises: state.groupEvaluation.rankExercises,
});

const mapDispatchtoProps = (dispatch: Dispatch) =>
    bindActionCreators(_.assign({}, GroupEvaluationActionCreators), dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchtoProps)(GroupEvaluation) as any);
