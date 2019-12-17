import React from 'react';
import './ExerciseForm.css';
import { Form, Input, Radio, Button } from 'antd';
import { ImagePicker, Card } from '../custom';

const { TextArea } = Input;

interface IExerciseFormProps {
    title: string;
    exercise: any;
    onChange: (data: any) => void;
    onSave: (data: any) => void;
    history: any;
}

interface IExerciseFormState {
    image?: any;
    description: string;
    name: string;
    exerciseType: any;//todo: exercicetype (typescript) ?
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
        let { name, description, image } = this.props.exercise;

        this.setState({
            image: image,
            description: description,
            name: name,
            exerciseType: null
        });
    }

    private handleDescriptionChange = (event: any) => {
        this.setState({
            description: event.target.value
        });
        // TODO
        // this.setState({ email: event.target.value });
        // console.log('event ; ', event);
        // const modifiedExercise = {...this.props.exercise};
        // modifiedExercise[0] = 0;
        // this.setState({
        //     modifiedExercise
        // });
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

    public render(): JSX.Element {

        const TheoricalForm =
            (<Form.Item label="questionOuverte">
              <Input type="text" />
            </Form.Item>);

        const PhysicalForm =
            (<div>
            </div>);

        const TaoluForm =
            (<div>
            </div>);

        const FightForm =
            (<div>
            </div>);

        let ConditionnalForm;
        switch(this.state.exerciseType) {
            case 'THEORETICAL':
                ConditionnalForm = TheoricalForm;
                break;
            case 'PHYSICAL':
                ConditionnalForm = PhysicalForm;
                break;
            case 'TAOLU':
                ConditionnalForm = TaoluForm;
                break;
            case 'FIGHT':
                ConditionnalForm = FightForm;
                break;
        }
        if (this.state.exerciseType === 'THEORETICAL') {
        } else {
            ConditionnalForm = PhysicalForm;
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
                          <Radio value={type.value}>{type.name}</Radio>
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

                    { ConditionnalForm /* depend on exercise type */}

                    <React.Fragment>
                        <h2>Télécharger une image</h2>
                        <ImagePicker
                            imageUrl={this.state.image}
                            onChange={this.handleImageChange}
                        />
                    </React.Fragment>
                    <div className="actions">
                        <Button onClick={() => this.props.history.goBack()}>Annuler</Button>
                        <Button type="primary" onClick={this.props.onSave} className="save">Sauvegarder</Button>
                    </div>
                  </Form>
                </Card>
            </div>
        );
    }

}

export default ((ExerciseForm as any) as any);
