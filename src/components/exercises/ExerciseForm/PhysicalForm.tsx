import React from 'react';

import { Form, Input, Select } from 'antd';
const { Option } = Select;

interface IPhysicalFormProps {
    onChange: any;
}

interface IPhysicalFormState {}

class PhysicalForm extends React.Component<IPhysicalFormProps, IPhysicalFormState> {

	onChange = (event: any) => {
		if(event.target) {
			this.props.onChange(event.target.value);
		} else {
			this.props.onChange(event);
		}
	}

	render() {

		return (
	        <Form.Item>
	            <p>Le but est de</p>

	            <Select
								defaultValue="Veuillez sélectionner un objectif"
	              size={"small"}
								onChange={this.onChange.bind(this)}
	            >
	              <Option value="se rapprocher de">se rapprocher de</Option>
	              <Option value="s'eloigner de">s'éloigner de</Option>
	              <Option value="faire moins de">faire moins de</Option>
	              <Option value="faire plus de">faire plus de</Option>

	            </Select>
	            <Input type="number" onChange={this.onChange.bind(this)} min="0"/>
	            <Select
	              defaultValue={"Veuillez sélectionner une unité de mesure"}
	              size={"small"}
								onChange={this.onChange.bind(this)}
	            >
	              <Option value="meter">mètres</Option>
	              <Option value="centimeter">centimètres</Option>
	              <Option value="second">secondes</Option>
	              <Option value="minute">minutes</Option>
	            </Select>
	        </Form.Item>
		);
	}
}

export default PhysicalForm;
