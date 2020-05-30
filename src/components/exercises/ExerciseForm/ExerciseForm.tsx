import React from 'react';
import './ExerciseForm.css';
import { Link, Redirect } from 'react-router-dom';
import { Form, Input, Radio, Button } from 'antd';
import { ImagePicker, Card, DynamicFieldSet, FieldSet } from '../../custom';
import * as api from '../../../api';
import { Exercise, Criteria } from '../../../types';
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
    numberRounds?: any;
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

        this.setState({
            submitted: false,
            image: image,
            description: description,
            name: name,
            criterion: []
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

    private handleNumberRoundsChange = (event: any) => {
        let roundsIndex = [];
        for(let i=1; i<=event.target.value; i++) {
          roundsIndex.push(i)
        }
        this.setState({
            numberRounds: roundsIndex,
            rounds: event.target.value
        });
    };

    private handleCriteriaChange = (event: any) => {
      if(Number.isInteger(event)) {
        let crits = this.state.criterion;
        crits.splice(event, 1);
        this.setState({
          criterion: crits
        })
      } else {
        let crits = this.state.criterion;
        crits[parseInt(event.target.name, 10)] = event.target.value;
        this.setState({
          criterion: crits
        })
      }
    };

    private handleObjectiveMeasurementChange = (val: any) => {
      if(val.search("s'") >= 0 || val.search("se ") >= 0 || val.search("faire ") >= 0) {
        let obj = this.state.objective;
        if(obj) {
          let endObj = obj.substring(obj.search(/[0-9]/), obj.length)
          obj = val + " " + endObj
          this.setState({
              objective: obj
          });
        } else {
          this.setState({
              objective: val
          });
        }
      } else if(val.search(/[^0-9]/) < 0) {
        let obj = this.state.objective;
        if(obj) {
          if(obj.search(/[0-9]/) <= 0) {
            obj = obj + " " + val;
          } else {
            obj = obj.substring(0, obj.search(/[0-9]/)) + val
          }
          this.setState({
              objective: obj
          });
        } else {
          this.setState({
              objective: obj
          });
        }
      } else {
        this.setState({
            measurementUnit: val.toUpperCase()
        });
      }
    };

    private createExercise = (event: any) => {
        if (this.state.name && this.state.description) {
            let exercise: Exercise = null;
            switch(this.state.exerciseType) {
                case 'THEORETICAL':
                    if (this.state.question) {
                        exercise = {
                          name: this.state.name,
                          description: this.state.description,
                          image: this.state.image,
                          type: this.state.exerciseType,
                          question: this.state.question,
                          reponse: this.state.reponse
                        };
                    } else {
                        alert("Veuillez compléter le champ question du formulaire.");
                        return;
                    }
                    break;
                case 'PHYSICAL':
                    if (this.state.objective && this.state.measurementUnit) {
                        exercise = {
                            name: this.state.name,
                            description: this.state.description,
                            image: this.state.image,
                            type: this.state.exerciseType,
                            objective: this.state.objective,
                            measurementUnit: this.state.measurementUnit
                        };
                    } else {
                        alert("Veuillez compléter les champs objectifs et unité de mesure du formulaire.");
                        return;
                    }
                    break;
                case 'TAOLU':
                    this.state.criterion.map((crit: any) => {
                    let criteria: Criteria = null;
                    criteria = {
                        name: crit
                    }
                    api.Criterion.create(criteria)
                        .then(() => {})
                        .catch(() => {
                            alert("L'ajout du critère a échoué.");
                        });
                    });
                    exercise = {
                        name: this.state.name,
                        description: this.state.description,
                        image: this.state.image,
                        type: this.state.exerciseType,
                        criterion: this.state.criterion
                    };
                    break;
                case 'FIGHT':
                    if (this.state.rounds) {
                        exercise = {
                            name: this.state.name,
                            description: this.state.description,
                            image: this.state.image,
                            type: this.state.exerciseType,
                            rounds: this.state.rounds
                        }
                    } else {
                        alert("Veuillez compléter le champ round.");
                        return;
                    }
                    break;
                default:
                    break;
            }
            api.Exercises.create(exercise)
                .then(() => this.setState({ submitted: true }))
                .catch(() => {
                  alert("L'ajout de l'exercice a échoué.");
                });
        } else {
            alert("Veuillez compléter les champs nom et description du formulaire.");
        }
    }

    public render(): JSX.Element {

        const TheoricalForm =
            (<Form.Item label="Question :">
              <Input onChange={this.handleQuestionChange} type="text" />
              <FieldSet
                onChange={this.handleReponseChange.bind(this)}
                label="Réponse"
              />
            </Form.Item>);

        const TaoluForm =
            (<DynamicFieldSet
                onChange={this.handleCriteriaChange.bind(this)}
                label="critère"
            />);

        const FightForm =
            (<Form.Item label="Nombre de rounds :">
              <Input onChange={this.handleNumberRoundsChange} type="number" min="0"/>
              <DynamicFieldSet
                label="Critère"
              />
            </Form.Item>
          );

        let ConditionnalForm;
        switch(this.state.exerciseType) {
            case 'THEORETICAL':
                ConditionnalForm = TheoricalForm;
                break;
            case 'PHYSICAL':
                ConditionnalForm = <PhysicalForm onChange={this.handleObjectiveMeasurementChange.bind(this)} />;
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
