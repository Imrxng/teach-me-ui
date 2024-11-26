export interface TableContent {
    course: string;
    category: string;
    date: string;
}

export interface RootObject {
    key:     string;
    content: Course;
}

export interface Course {
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
    yourAnswer?:          string[];
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

export interface User {
    username: string;
    password: string;
    type: 'admin' | 'user';
}
export interface IncorrectAnswer {
    question: string;                
    correctAnswer: string[];         
    yourAnswer?: string[];   
  }