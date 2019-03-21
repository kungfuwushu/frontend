import * as React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import { IExerciseSelectionProps } from '../../../../actions/ranks/ExerciseSelection.Action';
import * as ExerciseSelectionActionCreators from '../../../../actions/ranks/ExerciseSelection.Action';
import * as _ from 'lodash';

import { Modal, Checkbox } from 'antd';

interface ExerciseSelectionState {
    checkedExercises: any[];
}

export class ExerciseSelection extends React.Component<IExerciseSelectionProps, ExerciseSelectionState> {
    constructor(props: any) {
        super(props);
        this.state = {
            checkedExercises: [],
        }
    }

    componentWillMount() {
        this.props.onLoad();
    }

    closeModal = () => this.props.closeModal();

    handleOk = () => {
        const { checkedExercises } = this.state;
        this.props.addSelectedExercises(checkedExercises);
        this.closeModal();
        this.setState({
            checkedExercises: [],
        })
    }

    renderExercise = (exercise: any) => {
        const handleChange = (e: any) => {
            const { checkedExercises } = this.state;
            this.setState({
                checkedExercises : e.target.checked ? 
                    checkedExercises.concat([exercise]) : checkedExercises.filter(exo => exo !== exercise)
            })
        }

        return(
            <div className="exercise" key={exercise.id}>
                <Checkbox onChange={handleChange}></Checkbox>
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
        const { visibleModal, exercises, selectedExercises } = this.props;
        const filteredExercises = exercises.filter(exercise => !selectedExercises.includes(exercise));
        return (
            <div>
                <Modal
                    title="Basic Modal"
                    visible={visibleModal}
                    onOk={this.handleOk}
                    onCancel={this.closeModal}
                >
                    {filteredExercises.map((exercise: any) =>
                        this.renderExercise(exercise)  
                    )}
                </Modal>   
            </div>
        )
    };
}

const mapStateToProps = (state: any) => ({
    selectedExercises: state.newRank.exercises,
    exercises: state.exerciseSelection.exercises,
    visibleModal: state.exerciseSelection.visibleModal,
});

const mapDispatchtoProps = (dispatch: Dispatch) =>
  bindActionCreators(_.assign({}, ExerciseSelectionActionCreators), dispatch);

export default connect(mapStateToProps, mapDispatchtoProps)(ExerciseSelection);
