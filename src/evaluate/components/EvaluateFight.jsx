import React, { useState } from 'react';

import { Button } from 'antd';

import './EvaluateFight.css';

import EvaluateCriterion from './EvaluateCriterion';
import { Timer } from '../../custom';

const EvaluateFight = ({ exerciseResult, onChange }) => {
	const [ roundIndex, setRoundIndex ] = useState(0);

	const handleChange = (criterionResult) => {
		const data = {...exerciseResult};
		data.roundsResult[roundIndex].criterionResult = criterionResult;
		onChange(data);
	}

	const handlePreviousRound = () => setRoundIndex(roundIndex - 1);
	const handleNextRound = () => setRoundIndex(roundIndex + 1);

	return (
		<div className="EvaluateFight">
			<h1>Reprise {roundIndex + 1}</h1>
			<Timer defaultTime={90}/>
			<EvaluateCriterion
				criterionResult={exerciseResult.roundsResult[roundIndex].criterionResult}
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
				{roundIndex < exerciseResult.roundsResult.length - 1 &&
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