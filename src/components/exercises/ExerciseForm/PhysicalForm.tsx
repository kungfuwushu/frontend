import React, { FC } from 'react';

import { Form, Input, Select } from 'antd';
const { Option } = Select;

// interface IPhysicalFormState {
//     measure: string;
//
// }
//
// interface IPhysicalFormProps {
//
// }

const PhysicalForm: FC = () => {


	return (
        <Form.Item>
            <p>Exercice Physique</p>

            <p>Le but est de</p>

            <Select
              value={"close"}
              size={"small"}
              onChange={()=>{}}
            >
              <Option value="close">se rapprocher de</Option>
              <Option value="far">s'eloigner de</Option>
              <Option value="less">faire moins que</Option>
              <Option value="more">faire plus que</Option>

            </Select>
            <Input type="number" />
            <Select
              value={"meters"}
              size={"small"}
              onChange={()=>{}}
            >
              <Option value="meters">metres</Option>
              <Option value="centimeters">centimetres</Option>
              <Option value="seconds">secondes</Option>
              <Option value="minutes">minutes</Option>
            </Select>
        </Form.Item>
	);
}

export default PhysicalForm;
