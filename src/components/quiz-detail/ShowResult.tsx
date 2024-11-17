import { useState } from 'react';
import { Course } from '../../types';
import Pagination from '../home/Pagination';
import { useNavigate } from 'react-router-dom';

interface ShowResultProps {
    COURSE: Course;
    AMOUNT_OF_QUESTIONS: number;
}

const ShowResult = ({ COURSE, AMOUNT_OF_QUESTIONS }: ShowResultProps) => {
	const [currentPage, setCurrentPage] = useState(1);
	const answersPerPage = 3;   
	const NAVIGATE = useNavigate();
	let SCORE = 0;
	const INCORRECT_ANSWERS: { question: string, correctAnswer: string | string[], yourAnswer: string | undefined}[] = [];

	COURSE.questions.slice(0, AMOUNT_OF_QUESTIONS).forEach((question) => {
		const IS_CORRECT = question.yourAnswer && question.questionAnswerResult.includes(question.yourAnswer);

		if (IS_CORRECT) {
			SCORE++;
		} else {
			INCORRECT_ANSWERS.push({
				question: question.question,
				correctAnswer: question.questionAnswerResult,  
				yourAnswer: question.yourAnswer,
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
		<div>
			<h3>SCORE: {((SCORE / AMOUNT_OF_QUESTIONS) * 100).toFixed(2)}%</h3>
			<div>
				<h4>{INCORRECT_ANSWERS.length > 0 ? 'Incorrect Answers:' : 'Resultaten:'}</h4>
				{INCORRECT_ANSWERS.length > 0 ? (
					<div>
						<ul>
							{CURRENT_INCORRECT_ANSWERS.map((answer, index) => (
								<li key={index}>
									<p><strong>Question:</strong> {answer.question}</p>
									<p><strong>Your Answer:</strong> {answer.yourAnswer}</p>
									<p><strong>Correct Answer:</strong> {Array.isArray(answer.correctAnswer) ? answer.correctAnswer.join(', ') : answer.correctAnswer}</p>
								</li>
							))}
						</ul>
						<Pagination 
							currentIndex={currentPage}
							maxIndex={TOTAL_PAGES}
							onPrevious={handlePreviousPage}
							onNext={handleNextPage}
						/>
					</div>
				) : (
					<p>All answers are correct!</p>  
				)}
			</div>
			<button className='startQuizButton' onClick={() => NAVIGATE('/home')}>Back to home</button>
		</div>
	);
};

export default ShowResult;
