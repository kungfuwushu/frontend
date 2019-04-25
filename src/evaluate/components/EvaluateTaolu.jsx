import React from 'react';

import EvaluateCriterion from './EvaluateCriterion';

const TaoluEvaluation = ({ exerciseResult, onChange }) => {
    const handleChange = (criterionResult) => onChange({
        ...exerciseResult,
        criterionResult,
    })

    return (
        <EvaluateCriterion
            criterionResult={exerciseResult.criterionResult}
            onChange={handleChange}
        />
    );
}

export default TaoluEvaluation;