import React from 'react';

import EvaluateCriterion from './EvaluateCriterion';

const TaoluTest = ({ exerciseResult, onChange }) => {
    const handleChange = (criterionResults) => onChange({
        ...exerciseResult,
        criterionResults,
    })

    return (
        <EvaluateCriterion
            criterionResults={exerciseResult.criterionResults}
            onChange={handleChange}
        />
    );
}

export default TaoluTest;