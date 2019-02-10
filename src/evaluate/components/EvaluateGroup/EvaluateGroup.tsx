import * as React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import * as _ from 'lodash';

import { IEvaluateGroupProps } from '../../../actions/evaluate/EvaluateGroup.Actions';
import * as EvaluateGroupActionCreators from '../../../actions/evaluate/EvaluateGroup.Actions';

import { Menu, Col, Button, Icon } from 'antd';

import './EvaluateGroup.css';

import ExerciseEvaluation from '../EvaluateExercise/EvaluateExercise';

class EvaluateGroup extends React.Component<IEvaluateGroupProps> {
    public componentWillMount() {
        document.title = 'Kung Fu Club | Evaluation'
        const evaluationId = this.props.match.params.id;
        this.props.fetchAllByEvaluationId(evaluationId);
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
            <div className="EvaluateGroup">
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
    evaluation: state.evaluateGroup.evaluation,
    performers: state.evaluateGroup.performers,
    selectedPerformer: state.evaluateGroup.selectedPerformer,
    selectedExercise: state.evaluateGroup.selectedExercise,
	rankExercises: state.evaluateGroup.rankExercises,
});

const mapDispatchtoProps = (dispatch: Dispatch) =>
    bindActionCreators(_.assign({}, EvaluateGroupActionCreators), dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchtoProps)(EvaluateGroup) as any);
