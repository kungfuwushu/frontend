import * as React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import { INewRankProps } from '../../../actions/ranks/NewRank.Actions';
import * as NewRankActionCreators from '../../../actions/ranks/NewRank.Actions';
import * as _ from 'lodash';

import { Input, Radio, Button } from 'antd';
const RadioGroup = Radio.Group;

import { IRank } from '../../../state/Rank';

import RankExercice from './RankExercise'

interface StateRank{
    rank : IRank;
    loading: false;
}

class NewRank extends React.Component<INewRankProps,StateRank> {
    private typeChoice: any;
    private nameChoice : any;
    private descriptionChoice : any;
    private picture : any;

    constructor(props: any) {
        super(props);
        this.state = {
            loading: false,
            rank : {name:'',description:'',picture:'', typeExercise:'',exercises:[]}
        }
    }

    componentWillMount () {
        this.typeChoice = 1
        this.props.setExercisesTypeFilter("TAOLU");  
    }

    onSubmit() { 
        this.setState({ 
            rank: {
                name :this.nameChoice,
                description:this.descriptionChoice,
                picture:this.picture,
                typeExercise: this.typeChoice,
                exercises:[]
            }  
        });
        console.log(this.state);
        this.props.save({
            name :this.nameChoice,
            description:this.descriptionChoice,
            picture:this.picture,
            typeExercise: this.typeChoice,
            exercises:[]
        });
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

    public renderExercice(exercice:any){
        <div>
            <h1>Je suis un exercice </h1>
            {/*{criteresExercice.map( critere => <p> <Checkbox>{critere.value}</Checkbox>;
            barème : <Input placeholder="Barème" /></p>)}          */}
        </div>
    }

    render() {
        return (
            <div>
                <h1>Création d'un Grade</h1>
                <h2>Informations</h2>
                <Input placeholder="Nom du grade" onChange={this.onChangeName} />
                <Input placeholder="Description" onChange={this.onChangeDescription}/>
                <h2>Type d'évaluation</h2>
                <RadioGroup onChange={this.onChangeType} value={this.typeChoice}>
                    <Radio value={1}>Taolu</Radio>
                    <Radio value={2}>Technique</Radio>
                    <Radio value={3}>Combat</Radio>
                    <Radio value={4}>Self-defense</Radio>
                    <Radio value={5}>Physique</Radio>
                    <Radio value={6}>Théorique</Radio>
                </RadioGroup>
                <h2>Exercices</h2>
                <RankExercice/>
                <Button type="primary" onClick={this.onSubmit.bind(this)}>Enregistrer</Button> 
            </div>
        );
    }
}

const mapDispatchtoProps = (dispatch: Dispatch) =>
  bindActionCreators(_.assign({}, NewRankActionCreators), dispatch);

export default connect(null, mapDispatchtoProps)(NewRank);