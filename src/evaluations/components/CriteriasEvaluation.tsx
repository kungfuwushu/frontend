import * as React from 'react';
import { Select } from 'antd';
import '../styles/CriteriasEvaluation.css';
//import * as api from '../../api';

const Option = Select.Option;

interface CriteriasEvaluationProps {
  rankCriterias: any[],
}

class CriteriasEvaluation extends React.Component<CriteriasEvaluationProps,{}> {
  private scores: any[] = Array();

  public save() {
    const {rankCriterias} = this.props;
    for (var i = 0; i < rankCriterias.length; i++){
      console.log('save critere：' + rankCriterias[i].id + ', score:' + this.scores[i])
      /*api.CriteriaResults.create({
        id: rankCriterias[i].id,
        rankExerciseId: rankCriterias[i].rankExerciseId,
        rankCriteriaId: rankCriterias[i].rankCriteriaId,
        score: this.selects[i].options[this.selects[i].selectedIndex].value,
      });*/
    }
  }
 
  public renderCriteria = (rankCriteria: any, index: number) => {
    var indexes= new Array();
    for(let i = 0; i <= rankCriteria.maximumScore; i++)
      indexes.push(i)
    this.scores.push(undefined)
    return (
      <div className="Criterias" key={rankCriteria.id}>
        <div className="criteria">
          <p>{rankCriteria.criteria.name}</p>
          <Select defaultValue={'Note'} onSelect={score => this.scores[index] = score}>
            {indexes.map((i) =>
              <Option  value={i} key={i}>{i}</Option>
            )}     
          </Select>
        </div>
      </div>
    )
  };

  render(){
    return (
      <div className="CriteriasEvaluation" >
        {
          this.props.rankCriterias.map((criteria, index) =>
            this.renderCriteria(criteria, index)
          )
        }
      </div>
      );
    }
}

export default CriteriasEvaluation;