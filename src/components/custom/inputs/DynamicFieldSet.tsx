import React from 'react';

import { Form, Icon, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

let id = 0;

interface IDynamicFieldSetProps extends FormComponentProps {
    label: string;
    onChange: any;
}

interface IDynamicFieldSetState {}

class DynamicFieldSet extends React.Component<IDynamicFieldSetProps, IDynamicFieldSetState> {

  remove = (k: any) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter((key:any) => (key !== k)),
    });
  };

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(id++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  onChange = (event: any) => {
    this.props.onChange(event.target.value);
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const label = this.props.label;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k: any, index: number) => (
      <Form.Item
        {...formItemLayout}
        label={`${label}  ${(index+1)}`}
        required={false}
        key={k}
      >
        {getFieldDecorator(`names[${k}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [
            {
              required: true,
              whitespace: true,
              message: `Veuillez entrer le champ ${label.toLowerCase()} ici ou supprimer ce champ`,
            },
          ],
      })(<Input placeholder={`${label}  ${(index+1)}`} onChange={this.onChange.bind(this)} style={{ width: '60%', marginRight: 8 }} />)}
        {keys.length > 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.remove(k)}
          />
        ) : null}
      </Form.Item>
    ));
    return (
      <div>
        {formItems}
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
            <Icon type="plus" /> {"Ajouter un champ " + label.toLowerCase()}
          </Button>
        </Form.Item>
      </div>
    );
  }
}

export default (Form.create()(DynamicFieldSet as any) as any)
