import React from 'react';
import { Link } from 'react-router-dom';
import './EvaluationItem.css';
import moment from 'moment';
const EvaluationItem = ({ evaluation, evaluationResult }) => {
    const isResult = !!evaluationResult;

    return (
        <Link to={`/myevaluations/${evaluation.id}`}>
            <div className={`EvaluationItem ${isResult ? 'is-result' : ''}`}>
                <h3 className="name">{evaluation.name}</h3>
                <div className="details">
                  <span className="type">{evaluation.type}</span>
                  <span className="jour">{moment(evaluation.date).format('MMMM Do YYYY') } </span>
                   <span className="address">{evaluation.address}</span>
                </div>
           </div>
        </Link>
    );
}

export default EvaluationItem;