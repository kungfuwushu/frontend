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
  create: (criteria: any) => post(`/categories`, criteria),
};

export const Exercises = {
  all: () => get(`/exercises`),
  byEvaluationId: (id: number) => get(`/evaluations/${id}/exercises`),
  byCategoryId: (id: number) => get(`/categories/${id}/exercises`),
  byName: (name: string) => get(`/exercises?name=${encode(name)}`),
  byType: (type: string) => get(`/exercises?type=${encode(type)}`),
  create: (exercise: any) => post(`/exercises`, exercise),
};

export const Criterias = {
  byExerciseId: (id: number) => get(`/exercises/${id}/criterias`),
  create: (criteria: any) => post(`/criterias`, criteria),
};

export const Ranks = {
  all: () => get(`/ranks`),
  byName: (name: string) => get(`/ranks?name=${encode(name)}`),
  create: (rank: any) => post(`/ranks`, rank),
};

export const RankExercises = {
  byRankId: (id: number) => get(`/ranks/${id}/rank-exercises`),
  create: (rankExercise: any) => post(`/rank-exercises`, rankExercise),
};

export const RankCriterias = {
  byRankExerciseId: (id: number) => get(`/rank-exercises/${id}/rank-criterias`),
  create: (item: any) => post(`/rank-criterias`, item),
};

export const Evaluations = {
  upcomingByGroupId: (id: number) => get(`/groups/${id}/upcoming-evaluations`),
  pastByGroupId: (id: number) => get(`/groups/${id}/past-evaluations`),
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
