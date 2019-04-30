import * as React from 'react';

import './InputNumber.css';
import classNames from 'classnames';

const CustomInputNumber = ({ value, min, max, onChange, addonBefore, addonAfter, className }) => {
    const handleChange = ({target: {value}}) => onChange(parseInt(value));

	return (
        <div className={classNames("InputNumber", className)}>
            {addonBefore &&
                <div className="addon addon-before">
                    {addonBefore}
                </div>
            }
            <input
                type="number"
				value={value}
				min={min}
				max={max}
                onChange={handleChange}
                className={classNames(
                    "input",
                    addonBefore ? "with-addon-before" : "",
                    addonAfter ? "with-addon-after" : "",
                )}
            />
            {addonAfter &&
                <div className="addon addon-after">
                    {addonAfter}
                </div>
            }
        </div>
	);
}

export default CustomInputNumber;