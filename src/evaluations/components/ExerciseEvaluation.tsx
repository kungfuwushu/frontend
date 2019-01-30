import * as React from 'react';
import '../styles/ExerciseEvaluation.css';
import CriteriasEvaluation from './CriteriasEvaluation';
import * as api from '../../api';

import { connect } from 'react-redux';
import * as _ from 'lodash';

interface ExerciseEvaluationState {
  rankExercise: any,
  rankCriterias: any
}

interface ExerciseEvaluationProps {
  idStudent: any,
  idExercise: any,
  setSave: (save:()=>void) => void
}

class ExerciseEvaluation extends React.Component<ExerciseEvaluationProps, ExerciseEvaluationState> {
  private criteriasComponent: any;//ExerciseEvaluation
  constructor(props: any) {
    super(props);
    this.state = {
      rankExercise: {
        id:1,
        coefficient: 3.0,
        rankId: 4,
        exercise:{
          id: 0,
          name: 'Ti Tui',
          type: 'Taolu',
          image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeAgs19U6GP04mttvxSAKmc_631I2zOjCHkGmtUnYsXt0Ze582hA',
          description:'descriptions...',
          categoryId: 5,
        }
      },
      rankCriterias: [
        {
          id: 0,
          maximumScore: 3,
          criteria: {
            id: 0,
            name: 'critere 1',
          },
          rankExerciseId: 1,
        },
        {
          id: 1,
          maximumScore: 7,
          name: 'critere 2',
          criteriaId: 1,
          rankExerciseId: 1,
        }
      ],
    }
    this.save = this.save.bind(this);
  }

  componentWillMount() {
    this.setState({
      rankExercise: api.RankExercises.byRankId
    });
  }

  componentDidMount() {
    this.props.setSave(this.save)
  }

  public save() {
    api.ExerciseResults.create({
      exerciseId: this.state.rankExercise.exerciseId,
      
    })
    console.log('save exercise result, student:' + this.props.idStudent + ', exercise:' + this.props.idExercise)
    this.criteriasComponent.save();
  }

  render() {
    const {exercise} = this.state.rankExercise;
    return (
      <div className="ExerciseEvaluation">  
        <div className="title">
          <h3 className="exercisename">{exercise.name}</h3>
          <p className="exercisetype">{exercise.type}</p>
        </div>
          <p>{this.state.rankExercise.description}</p>
          <img className="image" src={exercise.image}></img>
          <CriteriasEvaluation rankCriterias={this.state.rankCriterias} ref={el=>{this.criteriasComponent=el}}  /> 
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  idStudent: state.groupEvaluation.idStudent,
  idExercise: state.groupEvaluation.idExercise
});

export default connect(mapStateToProps, {})(ExerciseEvaluation);