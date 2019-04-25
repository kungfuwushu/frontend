import { get, post } from './requests.config';
const encode = encodeURIComponent;

export const Accounts = {
}

export const Members = {
  byId: (id: number) => get(`/members/${id}`),
  byAccountId: (id: number) => get(`/accounts/${id}/members`),
  byGroupId: (id: number) => get(`/groups/${id}/members`),
  byEvaluationId: (id: number) => get(`/evaluations/${id}/members`),
};

export const Groups = {
  all: () => get(`/groups`),
  byId: (id: number) => get(`/groups/${id}`),
  byName: (name: string) => get(`/groups?name=${encode(name)}`),
  byEvaluationId: (id: number) => get(`/evaluations/${id}/groups`),
};

export const Programs = {
};

export const Categories = {
  byId: (id: number) => get(`/categories/${id}/categories`),
  byName: (name: string) => get(`/categories?name=${encode(name)}`),
};

export const Exercises = {
  all: () => get(`/exercises`),
  byEvaluationId: (id: number) => get(`/evaluations/${id}/exercises`),
  byCategoryId: (id: number) => get(`/categories/${id}/exercises`),
  byName: (name: string) => get(`/exercises?name=${encode(name)}`),
  byType: (type: string) => get(`/exercises?type=${encode(type)}`),
};

export const Criterion = {
};

export const Ranks = {
  all: () => get(`/ranks`),
  byId: (id: number) => get(`/ranks/${id}`),
  byName: (name: string) => get(`/ranks?name=${encode(name)}`),
  create: (rank: any) => post(`/ranks`, rank),
};

export const RankExercises = {
  byEvaluationId: (id: number) => get(`/evaluations/${id}/rank-exercises`),
  byRankId: (id: number) => get(`/ranks/${id}/rank-exercises`),
  create: (rankExercise: any) => post(`/rank-exercises`, rankExercise),
};

export const RankCriterion = {
  byEvaluationId: (id: number) => get(`/evaluations/${id}/rank-criterion`),
  byRankExerciseId: (id: number) => get(`/rank-exercises/${id}/rank-criterion`),
  create: (item: any) => post(`/rank-criterion`, item),
};

export const Evaluations = {
  all: () => get(`/evaluations`),
  byId: (id: number) => get(`/evaluations/${id}`),
  create: (evaluation: any) => post(`/evaluations`, evaluation),
};

export const EvaluationResults = {
  byEvaluationId: (id: number) => get(`/evaluations/${id}/evaluation-results`),
  byMemberId: (id: number) => get(`/members/${id}/evaluation-results`),
  create: (result: any) => post(`/evaluation-results`, result),
};

export const ExerciseResults = {
  byEvaluationResultId: (id: number) => get(`/evaluation-results/${id}/exercise-results`),
  create: (exercise: any) => post(`/exercise-results`, exercise),
};

export const CriteriaResults = {
  byExerciseResultId: (id: number) => get(`/exercise-results/${id}/criteria-results`),
  create: (criteria: any) => post(`/criteria-results`, criteria),
};
