import React from 'react';

import EvaluateCriterion from './EvaluateCriterion';

const TaoluTest = ({ exerciseResult, onChange }) => {
    const handleChange = (criteriaResults) => onChange({
        ...exerciseResult,
        criteriaResults,
    })

    return (
        <EvaluateCriterion
            criteriaResults={exerciseResult.criteriaResults}
            onChange={handleChange}
        />
    );
}

export default TaoluTest;