export interface TableContent {
    course: string;
    category: string;
    date: string;
}

export interface RootObject {
    key:     string;
    content: Content;
}

export interface Content {
    id:                 string;
    name:               string;
    category:           string;
    passingGrade:       number;
    completeTime:       number;
    questionCategories: string[];
    questions:          Question[];
    date:               string;
}


export interface Question {
    question:             string;
    type:                 Type;
    category:             string;
    answers:              Answer[];
    questionAnswerResult: string[];
}

export interface Answer {
    answer: string;
    reason: string;
}

export enum Type {
    Multi = 'multi',
    Single = 'single'
}


export interface LoginSession {
    type: 'admin' | 'user';
    username: string | undefined;
}

export interface LoginRequest {
    username: string;
    password: string;
}