import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { QuizContext } from '../provider/QuizContext';
import styles from './ShowResult.module.css';
import DATACONTEXT from '../../../context/DataContext';
import { renderHeader, renderResultText } from './ShowResult.functions';
import { IncorrectAnswer, Question } from '../../../types';
import INCORRECT_ANSWER_CARD from './IncorrectQuestionCard';

interface ShowResultProps {
    CURRENT_INDEX: number;
}

const ShowResult = ({ CURRENT_INDEX } : ShowResultProps) => {
	const { DARKMODE } = useContext(DATACONTEXT);
	const { COURSE, AMOUNT_OF_QUESTIONS } = useContext(QuizContext);
	const NAVIGATE = useNavigate();
	const { ID } = useParams();
	let score = 0;  


	const INCORRECT_ANSWERS: IncorrectAnswer[] = [];

	const checkAnswer = (yourAnswer: string[] | undefined, correctAnswer: string[]) => {
		if (!yourAnswer) return false; 
		if (yourAnswer.length > correctAnswer.length) return false; 
		return correctAnswer.every(answer => yourAnswer.includes(answer)); 
	};
      
	const handleCorrectAnswer = () => {
		score++;
	};
      
	const handleIncorrectAnswer = (question: Question, correctAnswer: string[], yourAnswer: string[] | undefined) => {
		INCORRECT_ANSWERS.push({
			question: question.question,
			correctAnswer: correctAnswer,
			yourAnswer: yourAnswer,
		});
	};
      
	COURSE.questions.slice(0, AMOUNT_OF_QUESTIONS).map((question, index) => {
		const yourAnswer = question.yourAnswer;
		const correctAnswer = question.questionAnswerResult;
      
		if (index >= CURRENT_INDEX) {
			return;
		}
      
		if (checkAnswer(yourAnswer, correctAnswer)) {
			handleCorrectAnswer();
		} else {
			handleIncorrectAnswer(question, correctAnswer, yourAnswer);
		}
	});

	const correctScorePassedStyle = () => {
		return `${((score/AMOUNT_OF_QUESTIONS)*100) >= COURSE.passingGrade ? styles.passed : styles.failed}`;
	};

	return (
		<div className={`${!DARKMODE ? styles.containerLight : ''} ${styles.container}`}>
			<p className={` ${correctScorePassedStyle()} ${styles.score}`}>Score: {((score / AMOUNT_OF_QUESTIONS) * 100).toFixed(2)}%</p>
			<p className={styles.questionAmount}>{CURRENT_INDEX}/{AMOUNT_OF_QUESTIONS} Questions Answered</p>
			<div className={styles.resultsContainer}>
				<h4>{renderHeader(INCORRECT_ANSWERS.length)}</h4>
				{INCORRECT_ANSWERS.length > 0 ? (
					<div>
						<div className={styles.answers}>
							{INCORRECT_ANSWERS.map((answer, index) => (
								<INCORRECT_ANSWER_CARD key={index} incorrectQuestion={answer}/>
							))}
						</div>
					</div>
				) : (
					<p>All answers are correct!</p> 
				)}
				<p>{renderResultText(CURRENT_INDEX, AMOUNT_OF_QUESTIONS, INCORRECT_ANSWERS)}</p>
			</div>
			<div className={styles.btnsContainer}>
				<button id='cy-quiz-result-page-back-home-btn' className={styles.btn} onClick={() => NAVIGATE('/')}>Back to home</button>
				<a id='cy-quiz-result-page-restart-btn' className={styles.btn} href={`/quiz/${ID}`}>Restart quiz</a>
			</div>
		</div>
	);
};

export default ShowResult;