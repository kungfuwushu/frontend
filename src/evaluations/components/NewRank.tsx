import * as React from 'react';
import { connect } from 'react-redux';
import { Input } from 'antd';
import { Radio } from 'antd';

//import {IRankExercise} from 'src/state/RankExercise';
import { IRank } from 'src/state/Rank';
import { Button } from 'antd';

import * as _ from 'lodash';
import {bindActionCreators, Dispatch} from 'redux';
import { IRankProps } from '../../actions/Rank.Actions';
import * as RankActionCreators from '../../actions/Rank.Actions';


const RadioGroup = Radio.Group;

interface StateRank{
    rank : IRank;
    loading: false;
}
//Créer un nouvel exoGrade avec le barème et l'id de l'exo
// Voir pour l'id de l'exercie qui doit surement être mis dans l'interface IExercise

class NewRank extends React.Component<IRankProps,StateRank> {
    private typeChoice: any;
    private nameChoice : string;
    private descriptionChoice : string;
    private picture : any;
    //private exercisesChoice: IRankExercise[];

    constructor(props: any) {
        super(props);
        this.state = {
            loading: false,
            rank : {name:'',description:'',picture:'', typeExercise:'',exercises:[]}
        }
      }


    componentWillMount () {
        this.setState({ 
          //prendre dans l'API la liste des exercices d'un type
        });
        this.typeChoice = 1
    }

    onSubmit() {//Evaluation.create 
        this.setState({ 
          rank: {name :this.nameChoice, description:this.descriptionChoice, picture:this.picture, typeExercise: this.typeChoice, exercises:[]}
        });
        console.log(this.state);
      }
    

    onChangeType = (e:any) => {
         this.typeChoice = e.target.value
    }
    onChangeName = (e:any) => {
        this.nameChoice = e.target.value
    }
    onChangeDescription = (e:any) => {
    this.descriptionChoice = e.target.value
    }
    onChangePicture = (e:any) => {
        this.picture = e.target.value
    }

    render() {
        return (
            <div>
                <h2>Informations</h2>
                    <Input placeholder="Nom du grade" onChange={this.onChangeName} />,
                    <br/>
                    <Input placeholder="Description" onChange={this.onChangeDescription}/>,
                    <br/>
                   

                <h2>Type d'évaluation</h2>
                    <br/>
                    <RadioGroup onChange={this.onChangeType} value={this.typeChoice}>
                        <Radio value={1}>Taolu</Radio>
                        <Radio value={2}>Technique</Radio>
                        <Radio value={3}>Combat</Radio>
                        <Radio value={4}>Self-defense</Radio>
                        <Radio value={5}>Physique</Radio>
                        <Radio value={6}>Théorique</Radio>
                    </RadioGroup>

                <h2>Exercices</h2>
                <br/>
                <Button type="primary" onClick={this.onSubmit.bind(this)}>Enregistrer</Button> 

            </div>
        );
    }
}

const mapDispatchtoProps = (dispatch: Dispatch) =>
  bindActionCreators(_.assign({}, RankActionCreators), dispatch);

export default connect(null, mapDispatchtoProps)(NewRank);