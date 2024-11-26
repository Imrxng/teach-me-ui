import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { QuizContext } from '../provider/QuizContext';
import Pagination from '../../home/Pagination';
import styles from './ShowResult.module.css';
import DATACONTEXT from '../../../context/DataContext';
import { renderHeader, renderResultText } from './ShowResult.functions';
import { IncorrectAnswer, Question } from '../../../types';

interface ShowResultProps {
	CURRENT_INDEX: number;
}

const ShowResult = ({ CURRENT_INDEX } : ShowResultProps) => {
	const [currentPage, setCurrentPage] = useState(1);
	const { DARKMODE } = useContext(DATACONTEXT);
	const { COURSE, AMOUNT_OF_QUESTIONS } = useContext(QuizContext);
	const NAVIGATE = useNavigate();
	const { ID } = useParams();
	let score = 0;
	const answersPerPage = 3;   


	const INCORRECT_ANSWERS: IncorrectAnswer[] = [];

	const checkAnswer = (yourAnswer: string[] | undefined, correctAnswer: string[]) => {
		return yourAnswer && correctAnswer.every(answer => yourAnswer.includes(answer));
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
	  

	const TOTAL_PAGES = Math.ceil(INCORRECT_ANSWERS.length / answersPerPage);
	const CURRENT_INCORRECT_ANSWERS = INCORRECT_ANSWERS.slice((currentPage - 1) * answersPerPage, currentPage * answersPerPage);

	const handleNextPage = () => {
		if (currentPage < TOTAL_PAGES) {
			setCurrentPage(currentPage + 1);
		}
	};

	const handlePreviousPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};
	return (
		<div className={`${!DARKMODE ? styles.containerLight : ''} ${styles.container}`}>
			<h3>score: {((score / AMOUNT_OF_QUESTIONS) * 100).toFixed(2)}%</h3>
			<p>Reached Questions: {CURRENT_INDEX} of the {AMOUNT_OF_QUESTIONS}</p>
			<div className={styles.resultsContainer}>
				<h4>{renderHeader(INCORRECT_ANSWERS.length)}</h4>
				{INCORRECT_ANSWERS.length > 0 ? (
					<div>
						<ul className={styles.answers}>
							{CURRENT_INCORRECT_ANSWERS.map((answer, index) => (
								<li key={index}>

									<div className={styles.info}>
										<p className={styles.answerTitle}>Question:</p>
										<p>{answer.question}</p>
									</div>

									<div className={styles.info}>
										<p className={styles.answerTitle}>Your Answer:</p>
										<p>{answer.yourAnswer?.join(', ') || 'No answer given'}</p>
									</div>

									<div className={styles.info}>
										<p className={styles.answerTitle}>Correct Answer:</p>
										<p>{answer.correctAnswer.join(', ')}</p>
									</div>
								</li>
							))}
						</ul>
						<div className={styles.pagination}>
							<Pagination
								currentIndex={currentPage}
								maxIndex={TOTAL_PAGES}
								onPrevious={handlePreviousPage}
								onNext={handleNextPage}
							/>
						</div>
					</div>
				) : (
					<p>All answers are correct!</p> 
				)}
				<p>{renderResultText(CURRENT_INDEX, AMOUNT_OF_QUESTIONS, INCORRECT_ANSWERS)}</p>
			</div>
			<button className={styles.btn} onClick={() => NAVIGATE('/home')}>Back to home</button>
			<a className={styles.btn} href={`/quiz/${ID}`}>Restart quiz</a>
		</div>
	);
};

export default ShowResult;