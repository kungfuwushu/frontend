import * as React from 'react';

import './SearchInput.css';
import { Icon, Button, Input, AutoComplete } from 'antd';

interface SearchInputProps {
	onSearch: (val: string) => any;
	placeholder: string;
}

export class SearchInput extends React.Component<SearchInputProps> {
	render() {
		return (
			<AutoComplete
				className="SearchInput"
				onSearch={val => this.props.onSearch(val)}
				placeholder={this.props.placeholder}
				optionLabelProp="text"
			>
				<Input
					suffix={(
						<Button type="primary">
							<Icon type="search"/>
						</Button>
					)}
				/>
			</AutoComplete>
		);
	}
}

export default SearchInput;