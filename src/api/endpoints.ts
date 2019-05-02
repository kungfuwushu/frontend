import { get, post, put, del } from './requests.config';

export const Members = {
	byId: (id: number) => get(`/members/${id}`),
	byAccountId: (id: number) => get(`/accounts/${id}/members`),
	byGroupId: (id: number) => get(`/groups/${id}/members`),
	byTestId: (id: number) => get(`/tests/${id}/members`),
};

export const Groups = {
	all: () => get(`/groups`),
	byId: (id: number) => get(`/groups/${id}`),
	byTestId: (id: number) => get(`/tests/${id}/groups`),
};

export const Exercises = {
	all: () => get(`/exercises`),
};

export const Ranks = {
	all: () => get(`/ranks`),
	byId: (id: number) => get(`/ranks/${id}`),
	byTestId: (id: number) => get(`/tests/${id}/ranks`),
	create: (rank: any) => post(`/ranks`, rank),
	update: (rank: any) => put(`/ranks`, rank),
	delete: (id: number) => del(`/ranks/${id}`),
	reorder: (id: number, start: number, end: number) => put(`/ranks/${id}/reorder?startIndex=${start}&endIndex=${end}`),
};

export const Tests = {
	all: () => get(`/tests`),
	byId: (id: number) => get(`/tests/${id}`),
	create: (test: any) => post(`/tests`, test),
	update: (test: any) => put(`/tests`, test),
};

export const TestResults = {
	byId: (id: number) => get(`/tests-results/${id}`),
	byTestId: (id: number) => get(`/tests/${id}/tests-results`),
	byMemberId: (id: number) => get(`/members/${id}/tests-results`),
};

export const ExerciseResults = {
	byTestResultIdAndExerciseScaleId: (testResultId: number, exerciseScaleId: number) => get(`/tests-results/${testResultId}/exercises-results?exerciseScaleId=${exerciseScaleId}`),
	create: (id: number, exerciseResult: any) => post(`/tests-results/${id}/exercises-results`, exerciseResult),
	update: (id: number, exerciseResult: any) => put(`/tests-results/${id}/exercises-results`, exerciseResult),
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
