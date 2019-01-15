
import { DatePicker } from 'antd';
import { Cascader } from 'antd';
import * as React from 'react';
import * as moment from 'moment';
import { TimePicker } from 'antd';
import { Select} from 'antd';
import { Button } from 'antd';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import {bindActionCreators, Dispatch} from 'redux';
import { IEvaluationsProps } from '../../actions/Evaluation.Actions';
import * as EvaluationActionCreators from '../../actions/Evaluation.Actions';
const Option = Select.Option;

class NewInformation extends React.Component<IEvaluationsProps> {
  private choixGrade: any;
  private choixGroupe: any;
  private choixDate: any;
  private choixTime: any;

  onSubmit() {
    this.props.save({
      grade: this.choixGrade.value,
      groupe: this.choixGroupe.value,
      date: this.choixDate.value,
      time: this.choixTime.value
    });
  }

  render() {

    const defaultGroups =['groupe 1', 'groupe 2'];
    const defaultGrades = ['Panda', 'Petit']; 
  
    const optionsGrade = [{
      value: 'Panda',
      label: 'Panda',
      children: [{
        value: 'Petit',
        label: 'Petit',
      }, {
        value: 'Moyen',
        label: 'Moyen',
      }, {
        value: 'Grand',
        label: 'Grand',
      }],
    }, {
      value: 'Aigle',
      label: 'Aigle',
      children: [{
        value: 'Petit',
        label: 'Petit',
      }, {
          value: 'Moyen',
          label: 'Moyen',
      }, {
          value: 'Grand',
          label: 'Grand',
      }],
    }];
    return (
      <div className="row">
        <h2>Sélection du grade</h2>
        <Cascader defaultValue={defaultGrades} options={optionsGrade} 
          ref={el => this.choixGrade = el}/>,
        <br />
      
        <h2>Date de l'évaluation</h2>
        <DatePicker ref={el => this.choixDate = el}/>
        <br />
  
        <h2>Horaire de l'évaluation</h2>
        <TimePicker defaultValue={moment('01:00', 'HH:mm')} 
          ref={el => this.choixTime = el}/>
        <br />
  
        <h2>Sélection des groupes évalués</h2>
        <Select
            mode="multiple"
            size= "large"
            placeholder="Please select"
            defaultValue={defaultGroups}
            style={{ width: '40%' }}
            ref={el => this.choixGroupe = el}
          >
            <Option value="Groupe 1">Groupe 1</Option>
            <Option value="Groupe 2">Groupe 2</Option>
            <Option value="Groupe 3">Groupe 3</Option>
            {this.props.children}
          </Select>
          <br />
          <Button type="primary" onClick={this.onSubmit.bind(this)}>Enregistrer</Button> 
          <Button type="primary">Retour</Button>
      </div>
    );
  }
}

const mapDispatchtoProps = (dispatch: Dispatch) =>
  bindActionCreators(_.assign({}, EvaluationActionCreators), dispatch);

export default connect(null, mapDispatchtoProps)(NewInformation);


