import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { QuizContext } from '../provider/QuizContext';
import Pagination from '../../home/Pagination';
import styles from './ShowResult.module.css'
import DATACONTEXT from '../../../context/DataContext';

const ShowResult = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const { DARKMODE } = useContext(DATACONTEXT)
	const { COURSE, AMOUNT_OF_QUESTIONS } = useContext(QuizContext);
	const NAVIGATE = useNavigate();
	const { ID } = useParams();
	let score = 0;
	const answersPerPage = 3;   

	const INCORRECT_ANSWERS: { question: string, correctAnswer: string[], yourAnswer:  string[] | undefined }[] = [];

	COURSE.questions.slice(0, AMOUNT_OF_QUESTIONS).forEach((question) => {
		const yourAnswer = question.yourAnswer;
		const correctAnswer = question.questionAnswerResult;

		const IS_CORRECT = yourAnswer && correctAnswer.every(answer => yourAnswer.includes(answer));

		if (IS_CORRECT) {
			score++;
		} else {
			INCORRECT_ANSWERS.push({
				question: question.question,
				correctAnswer: correctAnswer,  
				yourAnswer: yourAnswer,
			});
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
			<div className={styles.resultsContainer}>
				<h4>{INCORRECT_ANSWERS.length > 0 ? 'Incorrect Answers:' : 'Resultaten:'}</h4>
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
			</div>
			<button className={styles.btn} onClick={() => NAVIGATE('/home')}>Back to home</button>
			<a className={styles.btn} href={`/quiz/${ID}`}>Restart quiz</a>
		</div>
	);
};

export default ShowResult;
