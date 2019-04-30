import * as api from '../../api';

export const Ranks = {
    byId: (id) => api.Ranks.byId(id).then(rank => {
        const { rankExercises } = rank;
        for (let i = 0; i < 3; i++)
            rank.rankExercises = rank.rankExercises.concat(rankExercises);
        rank.description = "Description du grade Petit Panda, nanani na nan na na nian ian ian a ann an a ian ia n.";
        return rank;
    }),
};

export const ExerciseResults = {
    byId: (id) => fakeExerciseResults(1).then(exerciseResults => exerciseResults[0]),
    byEvaluationResultIdAndExerciseId: (evaluationId) => api.ExerciseResults.byEvaluationResultId(evaluationId),
    byRankIdAndPerformerId: (rankId, performerId) => fakeExerciseResults(rankId),
    byEvaluationIdAndPerformerId: (evaluationId, performerId) => fakeExerciseResults(evaluationId),
};

const fakeExerciseResults = (rankId) => Ranks.byId(rankId).then(rank => {
    const randomScore = (maximumScore) => Math.floor((Math.random() * maximumScore) + 1);
    return rank.rankExercises.map((rankExercise, index) => {
        var exerciseResult = {
            id: index,
            rankExercise,
            type: rankExercise.exercise.type,
        }
        switch (exerciseResult.type) {
            case 'TAOLU':
                exerciseResult.criterionResult = rankExercise.rankCriterion.map(rankCriteria => ({
                    rankCriteria,
                    score: randomScore(rankCriteria.maximumScore),
                }));
                break;
            case 'FIGHT':
                exerciseResult.roundsResult = rankExercise.rankRounds.map(rankRound => ({
                    rankRound,
                    criterionResult: rankRound.rankCriterion.map(rankCriteria => ({
                        rankCriteria,
                        score: randomScore(rankCriteria.maximumScore),
                    })),
                }));
                break;
            case 'PHYSICAL':
                exerciseResult.score = randomScore(20);
                break;
            default:
                break;
        }
        return exerciseResult;
    });
});

export const Evaluations = {
    byId: (evaluationId) => api.Evaluations.byId(evaluationId),
    allUpcomingByMemberId: (memberId) => api.Evaluations.all(),
};

export const EvaluationResults = {
    allStartedByMemberId: (memberId) => fakeEvaluationResults(),
    allCompletedByMemberId: (memberId) => fakeEvaluationResults(),
}

const fakeEvaluationResults = () => api.Evaluations.all().then(evaluations => evaluations.map(evaluation => {
    return {
        evaluation,
        performerGroup: {
            id: 1,
            name: "Groupe 1",
        },
    };
}));
