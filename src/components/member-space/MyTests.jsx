import React, { useState, useEffect } from 'react';

import './MyTests.css';

import TestItem from './TestItem';

import * as api from './fake-api';

const MyTests = () => {
	const [upcomingTests, setUpcomingTests] = useState([]);
	const [startedTests, setStartedTests] = useState([]);
	const [completedTests, setCompletedTests] = useState([]);

	useEffect(() => {
		Promise.all([
			api.Tests.allUpcomingByMemberId(1),
			api.TestResults.allStartedByMemberId(1),
			api.TestResults.allCompletedByMemberId(1),
		]).then(([upcomingTests, startedTests, completedTests]) => {
			setUpcomingTests(upcomingTests);
			setStartedTests(startedTests);
			setCompletedTests(completedTests);
		});
	}, []);

	return (
		<div className="MyTests">
			<h1>Mes évaluations</h1>
			<div className="tests">
				<div className="right">
					<h2 >Tests à venir et en cours</h2>
					<div className="upcoming">
						{upcomingTests.map((test, index) =>
							<TestItem
								test={test}
								key={index}
							/>
						)}
					</div>
					<div className="started">
						{startedTests.map((testResult, index) =>
							<TestItem
								test={testResult.test}
								testResult={testResult}
								key={index}
							/>
						)}
					</div>
				</div>
				<div className="left">
					<h2 >Tests fini</h2>
					<div className="completed">
						{completedTests.map((testResult, index) =>
							<TestItem
								test={testResult.test}
								testResult={testResult}
								key={index}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default MyTests;