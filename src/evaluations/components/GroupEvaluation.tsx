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
//import CombatEvaluation from './CombatEvaluation';
import ExerciseEvaluation from './ExerciseEvaluation';

interface GroupEvaluationState {
    students: any[],
    exercises: any[]
}

class GroupEvaluation extends React.Component<IGroupEvaluationProps,GroupEvaluationState> {
    private exerciseSave: () => void;

    constructor(props:any){
        super(props)
        this.state = {
             students :[
                 {name:'ximeng'},
                 {name:'ximeng'},
                 {name:'ximeng'},
                 {name:'ximeng'},
             ],
             exercises:[
                {name:'exercise1'},
                {name:'exercise2'},
                {name:'exercise3'},
             ]
        }
    }

    public componentWillMount() {
        // agent.Evaluation.get(this.props.match.params.id)
    }

    private selectStudent(e:any){
        this.props.selectStudent(e.key);
    }

    private selectExercise(e:any){
        this.props.selectExercise(e.key);
    }
  
    private nextExercise() {
        console.log("nextExercise");
        this.exerciseSave();
        // changer exercice
    }

    public render() {
        return (
            <div className="GroupEvaluation">
                <h1>Evaluation en cours : {this.props.match.params.id}</h1>
                <div className="content">
                    <Col className="col" xs={6} sm={6} md={6} lg={6} xl={6}>
                        <h3>PRATIQUANTS</h3>
                        <Menu theme="light" mode="inline" defaultSelectedKeys={['4']}>
                            {this.state.students.map((student, index) => {
                                return (
                                    <Menu.Item className="item" key={index} onClick={this.selectStudent.bind(this)}>
                                        <span className="nav-text">{student.name}</span>
                                    </Menu.Item>
                                );
                            })}
                        </Menu>
                    </Col>
                    <Col className="col" xs={6} sm={6} md={6} lg={6} xl={6}>
                        <h3 className="title">EXERCISES</h3>
                        <Menu theme="light" mode="inline" defaultSelectedKeys={['4']}>
                            {this.state.exercises.map((exercice, index) => {
                                return (
                                    <Menu.Item className="item" key={index} onClick={this.selectExercise.bind(this)}>
                                        <span className="nav-text">{exercice.name}</span>
                                    </Menu.Item>
                                );
                            })}
                        </Menu>
                    </Col>
                    <Col className="col" xs={12} sm={12} md={12} lg={12} xl={12}>
                    <ExerciseEvaluation setSave={save => this.exerciseSave = save}/>
                         <div className="ButtomLow">
                         <Button type="primary" onClick={this.nextExercise.bind(this)}>PRATIQUANT SUIVANT</Button>
                         </div>
                    </Col>
                </div>
            </div>
        );
    }  
}

const mapStateToProps = (state: any) => ({
    idStudent: state.groupEvaluation.idStudent,
    idExercise: state.groupEvaluation.idExercise
});

const mapDispatchtoProps = (dispatch: Dispatch) =>
  bindActionCreators(_.assign({}, GroupEvaluationActionCreators), dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchtoProps)(GroupEvaluation) as any);
