
import { DatePicker } from 'antd';
import * as React from 'react';
import {Input, Col} from 'antd';
import { Select} from 'antd';
import { Button } from 'antd';

import { connect } from 'react-redux';
import * as _ from 'lodash';
import {bindActionCreators, Dispatch} from 'redux';
import { IEvaluationsProps } from '../../../actions/evaluations/Evaluation.Actions';
import * as EvaluationActionCreators from '../../../actions/evaluations/Evaluation.Actions';
import { IEvaluation } from '../../../state/Evaluation';

import * as moment from 'moment';



//const Option = Select.Option;
const InputGroup = Input.Group;
  
interface StateNewEvaluation {
  optionsGrade: any[];
  evaluation : IEvaluation;
}

class NewEvaluation extends React.Component<IEvaluationsProps, StateNewEvaluation> {
  private choixGroupe: any;
  private choixDate: any;
  private choixVille : any;
  private choixCP : any;
  private choixadresse : any;
  private children : any;
  
  constructor(props: any) {
    super(props);
    this.state = {
      optionsGrade: [],

      evaluation : {groupe:'',date:'',adresse:'', ville:'',codePostal:''}
    }
  }

  public componentWillMount () {
    this.setState({
      optionsGrade : [],
      evaluation : {groupe:'',date:'',adresse:'', ville:'',codePostal:''},
    });
    this.props.fetchGroups();
  }

  private onSubmit() {//Evaluation.create 
    this.setState({ 
      evaluation: {groupe :this.choixGroupe,date:this.choixDate,adresse:this.choixadresse, ville:this.choixVille,codePostal:this.choixCP}
    });
      this.props.save({groupe :this.choixGroupe,date:this.choixDate,adresse:this.choixadresse, ville:this.choixVille,codePostal:this.choixCP})
    console.log(this.state);
  }
  
  private onChange=(date: moment.Moment, dateString: string)=>{
      this.choixDate = dateString;
  }

  private onChangeAdresse=(e:any)=>{
    this.choixadresse = e.target.value;
  }
  private onChangeVille=(e:any)=>{
    this.choixVille = e.target.value;
  }
  private onChangeCP=(e:any)=>{
    this.choixCP = e.target.value;
  }
  private onChangeGroupe=(value:any, option:any)=>{
    this.choixGroupe = option;
  }
 /** 
  private filterGroups() {
		const { containingFilterGroups } = this.props;
		return containingFilterGroups
  }
  */
  
  public render() {
    //const filteredGroups = this.filterGroups();
    this.children = [];

    return (
      <div>
        <h1 className="Title">Planification d'une nouvelle évaluation</h1>
        <h2 className ="Title-Date">Date et heure de l'évaluation</h2>
        <DatePicker
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          placeholder="Select Time"
          onChange={this.onChange}
        />
        <br />
      
        <h2 className="TitleAdress">Adresse de l'évaluation</h2>
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

        <h2 className="TitleSelection">Sélection des groupes évalués</h2>
        
        {/**<div>
          {filteredGroups.map((groups: any) =>
            this.children.push(<Option value={groups.id}>{groups.name}</Option>)
					)}
          </div>  */}
        <Select
            mode="multiple"
            size= "large"
            placeholder="Please select"
            defaultValue={[]}
            style={{ width: '40%' }}
            onChange={this.onChangeGroupe}
          >
            {this.children}
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

export default connect(null, mapDispatchtoProps)(NewEvaluation);


