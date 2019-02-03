import { Menu } from 'antd';
import { Col } from 'antd';
import * as React from 'react';
import { Button } from 'antd';
import { withRouter } from 'react-router';
import '../styles/GroupEvaluation.css';

import { IGroupEvaluationProps } from '../../actions/GroupEvaluation.Actions';
import * as GroupEvaluationActionCreators from '../../actions/GroupEvaluation.Actions';
import { connect } from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import * as _ from 'lodash';
import * as api from '../../api';
import ExerciseEvaluation from './ExerciseEvaluation';

class GroupEvaluation extends React.Component<IGroupEvaluationProps> {
    private saveExercise: () => void;

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

    private selectPerformer(performer: any){
        this.props.selectPerformer(performer);
    }

    private selectExercise(exercise: any){
        this.props.selectExercise(exercise);
    }

    private next() {
        this.saveExercise();
        this.props.next();
    }

    public render() {
        const { evaluation, performers, selectedExercise, selectedPerformer } = this.props;
        if (!evaluation)
            return(<div>Loading...</div>);
        console.log(selectedPerformer);

        return (
            <div className="GroupEvaluation">
                <h1>Evaluation en cours : {evaluation.name}</h1>
                <div className="content">
                    <Col className="col" xs={6} sm={6} md={6} lg={6} xl={6}>
                        <h3 className="title">EXERCISES</h3>
                        <Menu selectedKeys={[selectedExercise.id+'']}>
                            {evaluation.exercises.map((exercise:any) => 
                                <Menu.Item key={exercise.id} onClick={() => this.selectExercise(exercise)}>
                                    <span className="nav-text">{exercise.name}</span>
                                </Menu.Item>
                            )}
                        </Menu>
                    </Col>
                    <Col className="col" xs={6} sm={6} md={6} lg={6} xl={6}>
                        <h3>PRATIQUANTS</h3>
                        <Menu selectedKeys={[selectedPerformer.id+'']}>
                            {performers.map((performer) =>
                                <Menu.Item key={performer.id} onClick={() => this.selectPerformer(performer)}>
                                    <span className="nav-text">{performer.firstName + " " + performer.lastName}</span>
                                </Menu.Item>
                            )}
                        </Menu>
                    </Col>
                    <Col className="col" xs={12} sm={12} md={12} lg={12} xl={12}>
                        <ExerciseEvaluation setSave={save => this.saveExercise = save}/>
                        <Button className="ButtomLow" onClick={() => this.next()}>SUIVANT</Button>
                    </Col>
                </div>
            </div>
        );
    }  
}

const mapStateToProps = (state: any) => ({
    evaluation: state.groupEvaluation.evaluation,
    performers: state.groupEvaluation.performers,
    selectedPerformer: state.groupEvaluation.selectedPerformer,
    selectedExercise: state.groupEvaluation.selectedExercise,
});

const mapDispatchtoProps = (dispatch: Dispatch) =>
    bindActionCreators(_.assign({}, GroupEvaluationActionCreators), dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchtoProps)(GroupEvaluation) as any);
