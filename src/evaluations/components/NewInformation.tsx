
import { DatePicker } from 'antd';
import * as React from 'react';
import {Input, Col} from 'antd';
import { Select} from 'antd';
import { Button } from 'antd';

import { connect } from 'react-redux';
import * as _ from 'lodash';
import {bindActionCreators, Dispatch} from 'redux';
import { IEvaluationsProps } from '../../actions/Evaluation.Actions';
import * as EvaluationActionCreators from '../../actions/Evaluation.Actions';
import { IEvaluation } from 'src/state/Evaluation';

import * as moment from 'moment';


const Option = Select.Option;
const InputGroup = Input.Group;
  
interface StateNewInformation {
  defaultGroups: any[];
  optionsGrade: any[];
  evaluation : IEvaluation;
}

class NewInformation extends React.Component<IEvaluationsProps, StateNewInformation> {
  private choixGroupe: any;
  private choixDate: any;
  private choixVille : any;
  private choixCP : any;
  private choixadresse : any;

  
  constructor(props: any) {
    super(props);
    this.state = {
      defaultGroups: [],
      optionsGrade: [],
      evaluation : {groupe:'',date:'',adresse:'', ville:'',codePostal:''}
    }
  }

  componentWillMount () {
    this.setState({
      defaultGroups : [],//prendre dans l'API
      optionsGrade : [],
      evaluation : {groupe:'',date:'',adresse:'', ville:'',codePostal:''},
    });
  }

  onSubmit() {//Evaluation.create 
    this.setState({ 
      evaluation: {groupe :this.choixGroupe,date:this.choixDate,adresse:this.choixadresse, ville:this.choixVille,codePostal:this.choixCP}
    });
    console.log(this.state);
  }
  
  onChange=(date: moment.Moment, dateString: string)=>{
      this.choixDate = dateString;
  }

  onChangeAdresse=(e:any)=>{
    this.choixadresse = e.target.value;
  }
  onChangeVille=(e:any)=>{
    this.choixVille = e.target.value;
  }
  onChangeCP=(e:any)=>{
    this.choixCP = e.target.value;
  }
  onChangeGroupe=(value:any, option:any)=>{
    this.choixGroupe = option;
  }
  render() {
    return (
      <div className="row">

        <h2>Date et heure de l'évaluation</h2>
        <DatePicker
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          placeholder="Select Time"
          onChange={this.onChange}
        />
        <br />
      
        <h2>Adresse de l'évaluation</h2>
          <InputGroup 
            size="default" >
              <Col span={12}>
                <Input placeholder="Adresse" onChange={this.onChangeAdresse}/>
              </Col>
              <Col span={2}>
                <Input placeholder="CP" onChange={this.onChangeCP}  />
              </Col>
              <Col span={4}>
                <Input placeholder="Ville" onChange={this.onChangeVille}/>
              </Col>
          </InputGroup>

        <h2>Sélection des groupes évalués</h2>
        <Select
            mode="multiple"
            size= "large"
            placeholder="Please select"
            defaultValue={this.state.defaultGroups}
            style={{ width: '40%' }}
            onChange={this.onChangeGroupe}
          >
            <Option value="Groupe 1">Groupe 1</Option>
            <Option value="Groupe 2">Groupe 2</Option>
            <Option value="Groupe 3">Groupe 3</Option>
            {this.props.children}
          </Select>
          <br />
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


