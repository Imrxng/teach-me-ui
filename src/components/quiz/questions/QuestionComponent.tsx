import { useContext, useEffect, useState } from 'react';
import { Answer, Question } from '../../../types';
import { QuizContext } from '../provider/QuizContext';
import OneAnswer from './OneAnswer';
import styles from './questions.module.css';
import DATACONTEXT from '../../../context/DataContext';

interface QuestionProps {
	QUESTION: Question;
}

const QuestionsPage = ({ QUESTION }: QuestionProps) => {
	const { CURRENT_INDEX, SET_CURRENT_INDEX, AMOUNT_OF_QUESTIONS, CHECK_BETWEEN_QUESTIONS, SET_SHOW_RESULTS, TIME, COURSE } = useContext(QuizContext);
	const { DARKMODE } = useContext(DATACONTEXT);
	const [CURRENT_ANSWER, SET_CURRENT_ANSWER] = useState<string[]>([]);
	const [SHOW_RIGHT_ANSWERS, SET_SHOW_RIGHT_ANSWERS] = useState<boolean>(false);
	const [shuffledAnswers, setShuffledAnswers] = useState<Answer[]>(QUESTION.answers);

	const shuffleArray = (asnwers: Answer[]) => {
		return asnwers
			.map(value => ({ value, sort: Math.random() }))
			.sort((a, b) => a.sort - b.sort)
			.map(({ value }) => value);
	};

	useEffect(() => {
		setShuffledAnswers(shuffleArray(QUESTION.answers));
	}, [QUESTION]);

	const moveToNextQuestion = () => {
		QUESTION.yourAnswer = CURRENT_ANSWER;
		if (CURRENT_INDEX + 1 < AMOUNT_OF_QUESTIONS) {
			SET_SHOW_RIGHT_ANSWERS(false);
			SET_CURRENT_INDEX(CURRENT_INDEX => CURRENT_INDEX + 1);
			SET_CURRENT_ANSWER(COURSE.questions[CURRENT_INDEX + 1].yourAnswer || []);
		} else {
			finishQuiz();
		}
	};

	const moveToPrevQuestion = () => {
		QUESTION.yourAnswer = CURRENT_ANSWER;
		if (CURRENT_INDEX > 0) {
			SET_SHOW_RIGHT_ANSWERS(false);
			SET_CURRENT_INDEX(CURRENT_INDEX => CURRENT_INDEX - 1);
			SET_CURRENT_ANSWER(COURSE.questions[CURRENT_INDEX - 1].yourAnswer || []);
		}
	};

	const finishQuiz = () => {
		SET_SHOW_RESULTS(true);
	};

	const clickHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
		if (SHOW_RIGHT_ANSWERS || !CHECK_BETWEEN_QUESTIONS) {
			moveToNextQuestion();
		} else {
			SET_SHOW_RIGHT_ANSWERS(true);
		}
	};

	const minuteSpelling = () => {
		if (Math.round(TIME / 60) <= 1) {
			return 'minute';
		}
		else return 'minutes';
	}; 

	const lightStyle = () => {
		return `${!DARKMODE ? styles.quizLight : ''}`;
	};

	const showQuestionSelectAmountText = () => {
		if (COURSE.questions[CURRENT_INDEX].type === 'multi') {
			return '(Multiple Choice)';
		} 
	};

	const showMoveToPrevQuestionBtn = () => {
		if (!CHECK_BETWEEN_QUESTIONS) {
			if (CURRENT_INDEX !== 0) {
				return <button id='quiz-page-prev-btn' className={styles.nextBtn} onClick={moveToPrevQuestion}>Previous Question</button>;
			}
		}
	};

	useEffect(() => {
		if (TIME <= 0) {
			finishQuiz();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [TIME]);

	return (
		<div className={styles.container}>
			<div className={`${lightStyle()} ${styles.infoContainer}`}>

				<div className={styles.infoContainerMainStyle}>
					<h1 className={styles.infoContainerTitle}>Course</h1>
					<p>{COURSE.name}</p>
				</div>

				<div className={styles.infoContainerMainStyle}>
					<h1 className={styles.infoContainerTitle}>Time remaining</h1>
					<p>{Math.round(TIME / 60)} {minuteSpelling()}</p>
				</div>
				
				<div className={styles.infoContainerMainStyle}>
					<h1 className={styles.infoContainerTitle}>Progress</h1>
					<p>Question {CURRENT_INDEX + 1} of {AMOUNT_OF_QUESTIONS}</p>
					<div className={styles.progressBarContainer}>
						<div className={styles.progressBar}
							style={{ width: `${((CURRENT_INDEX + 1)/ AMOUNT_OF_QUESTIONS) * 100}%` }}
						></div>
					</div>
				</div>

			</div>
			<div className={styles.quizContainer}>
				<div className={`${!DARKMODE ? styles.quizLight : ''} ${styles.quiz}`} >

					<div className={styles.quizHeader}>
						<h1 className={styles.questionCount}>Question {CURRENT_INDEX + 1}</h1>
					</div>
					
					<div className={styles.quizQuestion}>
						<p className={styles.question}>{QUESTION.question} {showQuestionSelectAmountText()}</p>
					</div>

					<div className={styles.quizAnswers}>
						{shuffledAnswers.map((answer, index) => (
							<OneAnswer key={index} index={index} answer={answer.answer} QUESTION={QUESTION} CURRENT_ANSWER={CURRENT_ANSWER} SET_CURRENT_ANSWER={SET_CURRENT_ANSWER} SHOW_RIGHT_ANSWERS={SHOW_RIGHT_ANSWERS} />
						))}
					</div>

					<div className={styles.quizFooter}>
						{showMoveToPrevQuestionBtn()}
						<button id='cy-quiz-page-next-button' className={styles.nextBtn} onClick={CURRENT_ANSWER.length > 0 ? clickHandler : undefined}>Next Question</button>
					</div>

				</div>
			</div>
		</div>
	);
};

export default QuestionsPage;
