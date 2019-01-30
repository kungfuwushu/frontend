import * as React from 'react';
import { Table } from 'antd';
import '../styles/CombatEvaluation.css';
import { Input } from 'antd';
import { Button } from 'antd';
import Timer from './Timer';
//import * as api from '../../api';


const columns = [{
    title: 'Name',
    dataIndex: 'name',
  }, {
    title: 'Age',
    dataIndex: 'age',
  }, {
    title: 'Address',
    dataIndex: 'address',
  }];
  const data = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  }, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  }, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address:<div className="Score">
              <td><Input  />/5</td>
             </div> 
  }];
const theme ="Middle size table";


class CombatEvaluation extends React.Component{
    
  render(){
    return (
       <div className="CombatEvaluation">
       <h1>1ère reprise</h1>
       <Timer/>
        <Table
        columns={columns}
        dataSource={data}
        bordered
        title={() => theme}
        />
        <div className="Buttons">
        <Button type="primary">Reprise Précédente</Button>
        <Button type="primary">Reprise Suivant</Button>
        </div>
      </div>
      );
    }
}

export default CombatEvaluation;