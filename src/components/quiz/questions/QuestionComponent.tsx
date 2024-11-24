import { useContext, useEffect, useState } from 'react';
import { Question } from '../../../types';
import { QuizContext } from '../provider/QuizContext';
import OneAnswer from './OneAnswer';
import styles from './questions.module.css';
import DATACONTEXT from '../../../context/DataContext';

interface QuestionProps {
	QUESTION: Question;
}

const QuestionsPage = ({ QUESTION }: QuestionProps) => {
	const [CURRENT_ANSWER, SET_CURRENT_ANSWER] = useState<string[]>([]);
	const [SHOW_RIGHT_ANSWERS, SET_SHOW_RIGHT_ANSWERS] = useState<boolean>(false);
	const { CURRENT_INDEX, SET_CURRENT_INDEX, AMOUNT_OF_QUESTIONS, CHECK_BETWEEN_QUESTIONS, SET_SHOW_RESULTS, TIME, COURSE } = useContext(QuizContext);
	const { DARKMODE } = useContext(DATACONTEXT);

	const handleAnswerReview = () => {
		SET_SHOW_RIGHT_ANSWERS(true);
		QUESTION.yourAnswer = CURRENT_ANSWER;
	};

	const moveToNextQuestion = () => {
		if (CURRENT_INDEX + 1 < AMOUNT_OF_QUESTIONS) {
			SET_SHOW_RIGHT_ANSWERS(false);
			SET_CURRENT_ANSWER([]);
			SET_CURRENT_INDEX(CURRENT_INDEX => CURRENT_INDEX + 1);
		} else {
			finishQuiz();
		}
	};

	const finishQuiz = () => {
		SET_SHOW_RESULTS(true);
	};

	const clickHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
		if (SHOW_RIGHT_ANSWERS || !CHECK_BETWEEN_QUESTIONS) {
			moveToNextQuestion();
		} else {
			handleAnswerReview();
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
			<h1>{COURSE.name}</h1>
			<div className={styles.progressBarContainer}>
				<div className={styles.progressBar}
					style={{ width: `${(CURRENT_INDEX / AMOUNT_OF_QUESTIONS) * 100}%` }}
				></div>
			</div>
			<div className={`${!DARKMODE ? styles.quizContainerLight : ''} ${styles.quizContainer}`} >
				<div className={styles.quizHeader}>
					<h1 className={styles.questionCount}>Question {CURRENT_INDEX + 1} of {AMOUNT_OF_QUESTIONS}</h1>
					<p className={styles.questionTimer}>{Math.round(TIME / 60)} minutes remaining</p>
				</div>
				<div className={styles.quizQuestion}>
					<p className={styles.question}>{QUESTION.question}</p>
				</div>

				<div className={styles.quizAnswers}>
					{QUESTION.answers.map((answer, index) => (
						<OneAnswer key={index} index={index} answer={answer.answer} QUESTION={QUESTION} CURRENT_ANSWER={CURRENT_ANSWER} SET_CURRENT_ANSWER={SET_CURRENT_ANSWER} SHOW_RIGHT_ANSWERS={SHOW_RIGHT_ANSWERS} />
					))}
				</div>

				<div className={styles.quizFooter}>
					<button className={styles.nextBtn} onClick={CURRENT_ANSWER.length > 0 ? clickHandler : undefined}>Next Question</button>
				</div>
			</div>
		</div>
	);
};

export default QuestionsPage;