import React, { FC } from 'react';

import { Spin } from 'antd';

import './Loading.css';

const Loading: FC = () => {
	return (
		<Spin size="large" className="Loading" />
	);
}

export default Loading;