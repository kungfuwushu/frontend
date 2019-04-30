import * as React from 'react';

import './Card.css';
import classNames from 'classnames';

const Card = ({ className, children }) => {
	return (
        <div className={classNames("Card", className)}>
            {children}
        </div>
	);
}

export default Card;