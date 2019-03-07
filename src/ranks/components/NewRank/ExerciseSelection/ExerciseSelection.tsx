import * as React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import { IExerciseSelectionProps } from '../../../../actions/ranks/ExerciseSelection.Action';
import * as ExerciseSelectionActionCreators from '../../../../actions/ranks/ExerciseSelection.Action';
import * as _ from 'lodash';

import { Modal } from 'antd';

interface ExerciseSelectionState {
    visible: any;
}

export class ExerciseSelection extends React.Component<IExerciseSelectionProps, ExerciseSelectionState> {
    constructor(props: any) {
        super(props);
        this.state = {
            visible : false
        }
    }

    componentWillMount() {
        this.props.onLoad();
    }

    closeModal = () => this.props.closeModal();

    private renderExercise(exercise: any){
        return( 
            <div className="exercise" key={exercise.id}>
				<div className="exercise-header">
					<div className="title-type">
						<span className="title">{exercise.name}</span>
						<span className="type">{exercise.type}</span>
					</div>
				</div>
				<div className="body">
                     <div className="actions">
						</div>
				</div>
			</div>
        )
    }

    render() {
        const { visibleModal, exercises } = this.props;
        return (
            <div>
                <Modal
                        title="Basic Modal"
                        visible={visibleModal}
                        onOk={this.closeModal}
                        onCancel={this.closeModal}
                    >
                    {exercises.map((exercise: any) =>
                        this.renderExercise(exercise)    
                    )}
                </Modal>   
            </div>
        )
    };
}

const mapStateToProps = (state: any) => ({
    exercises: state.exerciseSelection.exercises,
    visibleModal: state.exerciseSelection.visibleModal,
});

const mapDispatchtoProps = (dispatch: Dispatch) =>
  bindActionCreators(_.assign({}, ExerciseSelectionActionCreators), dispatch);

export default connect(mapStateToProps, mapDispatchtoProps)(ExerciseSelection);
