import React, { FunctionComponent } from 'react';

import './SearchInput.css';
import { Icon, Button, Input, AutoComplete } from 'antd';

const SearchInput:FunctionComponent<{
	placeholder?: string;
	onSearch: (value: string) => {};
}> = ({ placeholder, onSearch }) => {
	return (
		<AutoComplete
			className="SearchInput"
			onSearch={onSearch}
			placeholder={placeholder}
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

export default SearchInput;