import * as React from 'react';

import './SearchInput.css';
import { Icon, Button, Input, AutoComplete } from 'antd';

const SearchInput = ({ placeholder, onSearch }) => {
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