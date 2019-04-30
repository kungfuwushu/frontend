import React, { useState, useEffect } from 'react';

import './MyEvaluations.css';

import EvaluationItem from './EvaluationItem';

import * as api from '../fake-api';

const MyEvaluations = () => {
	const [upcomingEvaluations, setUpcomingEvaluations] = useState([]);
	const [startedEvaluations, setStartedEvaluations] = useState([]);
	const [completedEvaluations, setCompletedEvaluations] = useState([]);

	useEffect(() => {
		Promise.all([
			api.Evaluations.allUpcomingByMemberId(1),
			api.EvaluationResults.allStartedByMemberId(1),
			api.EvaluationResults.allCompletedByMemberId(1),
		]).then(([upcomingEvaluations, startedEvaluations, completedEvaluations]) => {
			setUpcomingEvaluations(upcomingEvaluations);
			setStartedEvaluations(startedEvaluations);
			setCompletedEvaluations(completedEvaluations);
		});
	}, []);

	return (
		<div className="MyEvaluations">
			<h1>Mes évaluations</h1>
			<div className="evaluations">
				<div className="right">
					<h2 >Evaluations à venir et en cours</h2>
					<div className="upcoming">
						{upcomingEvaluations.map((evaluation, index) =>
							<EvaluationItem
								evaluation={evaluation}
								key={index}
							/>
						)}
					</div>
					<div className="started">
						{startedEvaluations.map((evaluationResult, index) =>
							<EvaluationItem
								evaluation={evaluationResult.evaluation}
								evaluationResult={evaluationResult}
								key={index}
							/>
						)}
					</div>
				</div>
				<div className="left">
					<h2 >Evaluations fini</h2>
					<div className="completed">
						{completedEvaluations.map((evaluationResult, index) =>
							<EvaluationItem
								evaluation={evaluationResult.evaluation}
								evaluationResult={evaluationResult}
								key={index}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default MyEvaluations;