import React from 'react';

import { InputNumber } from 'antd';

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
            <InputNumber value={exerciseResult.score} onChange={handleChange}/>
            {` (${getMeasurementUnit()})`}
        </div>
    );
}

export default EvaluatePhysical;