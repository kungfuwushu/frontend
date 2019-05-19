import React from 'react';

import { InputNumber } from '../../custom';
import { Tooltip } from 'antd';

const EvaluatePhysical = ({ exerciseResult, onChange }) => {
    const getMeasurementUnit = () => {
        switch(exerciseResult.exerciseScale.exercise.measurementUnit) {
            case 'METER':
                return 'mètres';
            case 'SECOND':
                return 'secondes';
            default:
                return undefined;
        }
    }

    const handleChange = (score) => onChange({
        ...exerciseResult,
        score
    });

    return (
        <div className="EvaluatePhysical">
            <InputNumber
                value={exerciseResult.score || ''}
                min={0}
                onChange={handleChange}
                addonAfter={
                    <Tooltip title="Unité de mesure">
                        <span>{getMeasurementUnit()}</span>
                    </Tooltip>
                }
            />
        </div>
    );
}

export default EvaluatePhysical;