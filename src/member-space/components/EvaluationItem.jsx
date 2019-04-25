import React from 'react';

import './EvaluationItem.css';

const EvaluationItem = ({ evaluation, evaluationResult }) => {
    const isResult = !!evaluationResult;

    return (
        <div className={`EvaluationItem ${isResult ? 'is-result' : ''}`}>
            <span className="name">{evaluation.name}</span>
        </div>
    );
}

export default EvaluationItem;