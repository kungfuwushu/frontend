export type Criteria = {
    id?: number;
    name: string;
};

export type CriteriaScale = {
    id?: number;
    scale: number;
    criteria: Criteria;
};

export type CriteriaResult = {
    id?: number;
    score: number;
    criteriaScale: CriteriaScale;
};
