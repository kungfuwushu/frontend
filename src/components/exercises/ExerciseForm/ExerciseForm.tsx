import React from 'react';
import './ExerciseForm.css';
import { Link, Redirect } from 'react-router-dom';
import { Form, Input, Radio, Button } from 'antd';
import { ImagePicker, Card, DynamicFieldSet } from '../../custom';
import * as api from '../../../api';
import { Exercise } from '../../../types';
import PhysicalForm from './PhysicalForm';

const { TextArea } = Input;

interface IExerciseFormProps {
    title: string;
    exercise: any;
    onChange: (data: any) => void;
    history: any;
}

interface IExerciseFormState {
    submitted: any;
    image?: any;
    description: string;
    name: string;
    exerciseType: any;
    question?: any;
    objective?: any;
    measurementUnit?: any;
    criterion?: any;
    rounds?: any;
    reponse?: string
}

class ExerciseForm extends React.Component<IExerciseFormProps, IExerciseFormState> {

    private exerciseTypes = [
        {
            name: 'Théorique',
            value: 'THEORETICAL'
        },
        {
            name: 'Physique',
            value: 'PHYSICAL'
        },
        {
            name: 'Taolu',
            value: 'TAOLU'
        },
        {
            name: 'Combat',
            value: 'FIGHT'
        }
    ];

    componentWillMount() {
        let { name, description, image} = this.props.exercise;
        console.log(this.props.exercise);

        this.setState({
            submitted: false,
            image: image,
            description: description,
            name: name
        });
    }

    private handleDescriptionChange = (event: any) => {
        this.setState({
            description: event.target.value
        });
    }

    private handleNameChange = (event: any) => {
        this.setState({
            name: event.target.value
        });
    }

    private handleImageChange = (image: any) => {
        this.setState({
            image
        });
    };

    private handleRadioChange = (event: any) => {
        this.setState({
            exerciseType: event.target.value
        });
    };

    private handleQuestionChange = (event: any) => {
        this.setState({
            question: event.target.value
        });
    };

    private handleReponseChange = (val: any) => {
        this.setState({
            reponse: val
        });
    };

    private createExercise = (event: any) => {
        if (this.state.name) {
          let exercise: Exercise = null;
          switch(this.state.exerciseType) {
              case 'THEORETICAL':
                exercise = {
                  name: this.state.name,
                  description: this.state.description,
                  image: this.state.image,
                  type: this.state.exerciseType,
                  question: this.state.question,
                  reponse: this.state.reponse
                };
                break;
              case 'PHYSICAL':
              console.log("Création d'un exercice physique...");
                exercise = {
                  name: this.state.name,
                  description: this.state.description,
                  image: this.state.image,
                  type: this.state.exerciseType,
                  objective: this.state.objective,
                  measurementUnit: this.state.measurementUnit
                };
              break;
              case 'TAOLU':
              console.log("Création d'un exercice taolu...");
                exercise = {
                  name: this.state.name,
                  description: this.state.description,
                  image: this.state.image,
                  type: this.state.exerciseType,
                  criterion: this.state.criterion
                };
              case 'FIGHT':
              console.log("Création d'un exercice combat...");
                exercise = {
                  name: this.state.name,
                  description: this.state.description,
                  image: this.state.image,
                  type: this.state.exerciseType,
                  rounds: this.state.rounds
                }
                break;
              default:
                break;
          }
          console.log(exercise)
          api.Exercises.create(exercise)
            .then(() => this.setState({ submitted: true }))
            .catch(() => {
              alert("L'ajout de l'exercice a échoué.");
            });
        } else {
          alert("Veuillez compléter les champs du formulaire.");
        }
    }

    public render(): JSX.Element {

        const TheoricalForm =
            (<Form.Item label="Question :">
              <Input onChange={this.handleQuestionChange} type="text" />
              <DynamicFieldSet
                onChange={this.handleReponseChange.bind(this)}
                label="Réponse"
              />
            </Form.Item>);

        const TaoluForm =
            (<p>
                Exercice Taolu
                <DynamicFieldSet
                  label="Geste technique"
                />
            </p>);

        const FightForm =
            (<p>
                Exercice Combat
            </p>);

        let ConditionnalForm;
        switch(this.state.exerciseType) {
            case 'THEORETICAL':
                ConditionnalForm = TheoricalForm;
                break;
            case 'PHYSICAL':
                ConditionnalForm = <PhysicalForm />;
                break;
            case 'TAOLU':
                ConditionnalForm = TaoluForm;
                break;
            case 'FIGHT':
                ConditionnalForm = FightForm;
                break;
            default:
                ConditionnalForm = (<p>Veuillez selectionner un type d'exercice</p>)
        }

        const {submitted} = this.state;
        if (submitted) {
          return <Redirect to='/exercices' />;
        }

        return (
            <div className="ExerciseForm">
                <Card className="card">
                  <Form>
                    <h1>{this.props.title}</h1>
                    <h2 className="infos-title">Type d'exercice</h2>
                    <div className="exerciseType">
                      <Radio.Group onChange={this.handleRadioChange}>
                        {this.exerciseTypes.map((type, index) =>
                          <Radio key={index} value={type.value}>{type.name}</Radio>
                        )}
                      </Radio.Group>
                    </div>
                    <Input
                        className="name"
                        placeholder="Nom de l'exercice"
                        onChange={this.handleNameChange}
                        value={this.state.name}
                    />
                    <TextArea
                        autosize={{ minRows: 2, maxRows: 10 }}
                        placeholder="Description"
                        onChange={this.handleDescriptionChange}
                        value={this.state.description}
                    />

                    {/* custom form : depends on exercice type selected */}
                    <div style={{ border: '1px solid #D9D9D9', padding: '10px', marginTop: '5px' }}>
                        { ConditionnalForm /* depend on exercise type */}
                    </div>

                    <React.Fragment>
                        <h2>Télécharger une image</h2>
                        <ImagePicker
                            imageUrl={this.state.image}
                            onChange={this.handleImageChange}
                        />
                    </React.Fragment>

                    <div className="actions">
                        <Link to="/exercices" className="btn btn-primary">Annuler</Link>
                        <Button type="primary" onClick={this.createExercise} className="save">Sauvegarder</Button>
                    </div>
                  </Form>
                </Card>
            </div>
        );
    }

}

export default ExerciseForm;
