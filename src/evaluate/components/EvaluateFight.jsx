import React, { useState, useEffect } from 'react';

import { Button } from 'antd';

import './EvaluateFight.css';

import EvaluateCriterion from './EvaluateCriterion';
import { Timer } from '../../custom';

const EvaluateFight = ({ exerciseResult, onChange }) => {
	const [ roundIndex, setRoundIndex ] = useState(0);

	useEffect(() => {
		setRoundIndex(0);
	}, [exerciseResult.id])

	const handleChange = (criterionResults) => {
		const data = {...exerciseResult};
		data.roundsResults[roundIndex].criterionResults = criterionResults;
		onChange(data);
	}

	const handlePreviousRound = () => setRoundIndex(roundIndex - 1);
	const handleNextRound = () => setRoundIndex(roundIndex + 1);

	return (
		<div className="EvaluateFight">
			<h1>Reprise {roundIndex + 1}</h1>
			<Timer defaultTime={90}/>
			<EvaluateCriterion
				criterionResults={exerciseResult.roundsResults[roundIndex].criterionResults}
				onChange={handleChange}
			/>
			<div className="roundsNavigation">
				{roundIndex > 0 &&
					<Button
						onClick={handlePreviousRound}
						type="primary"
					>
						Reprise Précédente
					</Button>
				}
				{roundIndex < exerciseResult.roundsResults.length - 1 &&
					<Button
						onClick={handleNextRound}
						type="primary"
						className="nextRound"
					>
						Reprise suivante
					</Button>
				}
			</div>
		</div>
	);
}

export default EvaluateFight;