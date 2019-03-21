import * as React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import { INewRankProps } from '../../../actions/ranks/NewRank.Actions';
import * as NewRankActionCreators from '../../../actions/ranks/NewRank.Actions';
import * as _ from 'lodash';

import './NewRank.css';
import { Input, Button, Upload, Icon } from 'antd';
import ExerciseSelection from './ExerciseSelection';
const { TextArea } = Input;

interface StateNewRank {
	name?: string;
	description?: string;
    errorMessage?: string;
    fileList: any[];
}

class NewRank extends React.Component<INewRankProps, StateNewRank> {
    constructor(props: any) {
        super(props);
        this.state = {
            name: undefined,
            description: undefined,
            errorMessage: undefined,
            fileList: [],
        }
    }

	private back() {
		this.props.history.goBack();
	}

	private save() {
		const { name, description } = this.state;
		if (!name || !description ) {
			this.setState({
				errorMessage: "Oups! Tout est bien rempli ?"
			});
			return;
		}
		this.props.save({
			name,
			description,
		});
		this.back();
    }
   
    onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ name: e.target.value });
    }

    onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ description: e.target.value });
    }

    onImageChange = ({fileList}: any) => this.setState({ fileList });

    addExercises = () => this.props.openModal();

    render() {
        const { errorMessage, fileList } = this.state;
        const { exercises } = this.props;
        const uploadButton = (
            <div>
              <Icon type='plus' />
              <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="NewRank">
                <h1>Création d'un Grade</h1>
				{errorMessage? <span className="error">{errorMessage}</span> : ''}
                <h2 className="infos-title">Informations</h2>
                <Input className="name" placeholder="Nom du grade" onChange={this.onNameChange} />
                <TextArea autosize={{ minRows: 2, maxRows: 10 }} placeholder="Description" />
                <h2>Télécharger une image</h2>
                <Upload
                    name="image"
                    listType="picture-card"
                    className="image-upload"
                    fileList={fileList}
                    action="https://cors-anywhere.herokuapp.com/https://jsonplaceholder.typicode.com/posts/"
                    onChange={this.onImageChange}
                >
                    {fileList.length >= 1 ? null : uploadButton}
                </Upload>
                <div className="exercises-header">
                    <h2>Exercices</h2>
                    <Button type="primary" onClick={() => this.addExercises()}>Ajouter des exercices</Button>
                    <ExerciseSelection />
                </div>
                {exercises.length === 0?"Aucuns exercices sélectionnés." :""}
                {exercises.map((exercise: any) => 
                    <div key={exercise.id}>
                        {exercise.name}
                        <Button type="danger" onClick={() => this.props.removeExercise(exercise)}>Retirer</Button>
                    </div>
                )}
				<div className="actions">
					<Button onClick={() => this.back()}>Retour</Button>
					<Button type="primary" onClick={() => this.save()} className="save">Enregistrer</Button>
				</div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    exercises: state.newRank.exercises,
});

const mapDispatchtoProps = (dispatch: Dispatch) =>
  bindActionCreators(_.assign({}, NewRankActionCreators), dispatch);

export default connect(mapStateToProps, mapDispatchtoProps)(NewRank);