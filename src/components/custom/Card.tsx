import React, { FunctionComponent } from 'react';

import './Card.css';
import classNames from 'classnames';

const Card:FunctionComponent<{
    className: string;
}> = ({ className, children }) => {
	return (
        <div className={classNames("Card", className)}>
            {children}
        </div>
	);
}

export default Card;