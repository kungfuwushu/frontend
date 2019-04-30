import { get, post, put, del } from './requests.config';
const encode = encodeURIComponent;

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

export const Exercises = {
	all: () => get(`/exercises`),
	byEvaluationId: (id: number) => get(`/evaluations/${id}/exercises`),
};

export const Ranks = {
	all: () => get(`/ranks`),
	byId: (id: number) => get(`/ranks/${id}`),
	create: (rank: any) => post(`/ranks`, rank),
	update: (rank: any) => put(`/ranks`, rank),
	delete: (id: number) => del(`/ranks/${id}`),
	reorder: (id: number, start: number, end: number) => put(`/ranks/${id}/reorder?startIndex=${start}&endIndex=${end}`),
};

export const Evaluations = {
	all: () => get(`/evaluations`),
	byId: (id: number) => get(`/evaluations/${id}`),
	create: (evaluation: any) => post(`/evaluations`, evaluation),
	update: (evaluation: any) => put(`/evaluations`, evaluation),
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

export const Files = {
	upload: (file: any) => {
		var formData = new FormData();
    	formData.append("file", file);
		return post(`/files`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
	},
}
