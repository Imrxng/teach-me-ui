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
    passingGrade:       string;
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
    Single = 'single',
}
