import * as React from 'react';
import '../styles/Search.css';
import {
	Icon, Button, Input, AutoComplete
} from 'antd';

interface SearchProps {
	onSearch: (val: string) => any;
	placeholder: string;
}

class Search extends React.Component<SearchProps> {
	render() {
		return (
			<AutoComplete
				className="Search"
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

export default Search;