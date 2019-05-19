import React, { useState, useEffect, useRef } from 'react';

import { Button } from 'antd';

const Timer = ({ defaultTime = 0 }) => {
	const [remainingTime, setRemainingTime] = useState(defaultTime);
	const [isRunning, setIsRunning] = useState(false);

	useInterval(() => {
			if (remainingTime > 0)
				setRemainingTime(remainingTime - 1);
		},
		isRunning ? 1000 : null
	);

	const handleStart = () => setIsRunning(true);

	const handleStop = () => setIsRunning(false);

	const handleReset = () => {
		handleStop();
		setRemainingTime(defaultTime);
	}

	const getFormatedRemainingTime = () => {
		let seconds = remainingTime % 60;
		let minutes = Math.floor(remainingTime / 60);
		const padded = (number) => number.toString().padStart(2, '0');
		return padded(minutes) + ':' + padded(seconds);
	}

	return (
		<div className="container">
			<span>{getFormatedRemainingTime()}</span>
			<Button onClick={handleStart}>start</Button>
			<Button onClick={handleStop}>stop</Button>
			<Button onClick={handleReset}>reset</Button>
		</div>
	)
}

const useInterval = (callback, delay) => {
	const savedCallback = useRef();

	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	useEffect(() => {
		function tick() {
			savedCallback.current();
		}
		if (delay !== null) {
			let id = setInterval(tick, delay);
			return () => clearInterval(id);
		}
	}, [delay]);
}

export default Timer;
