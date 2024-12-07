import { useContext, useEffect } from 'react';
import { QuizContext } from '../provider/QuizContext';
import './Settings.css';
import { Link } from 'react-router-dom';

const SETTINGS = () => {
	const { SET_START_QUIZ, SET_TIME, TIME, COURSE, AMOUNT_OF_QUESTIONS, SET_AMOUNT_OF_QUESTIONS, CHECK_BETWEEN_QUESTIONS, SET_CHECK_BETWEEN_QUESTIONS } = useContext(QuizContext);

	useEffect(() => {
		SET_TIME(COURSE.completeTime * 60);
	}, []);

	const onClickHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
		SET_START_QUIZ(true);
	};

	if (COURSE.questions.length === 0) {
		return (
			<div>
				This course has no questions at the moment. Please click <Link to='/' style={{ textDecoration: 'underline' }} className='navLink'>here</Link> to go back to home page.
			</div>
		);
	}

	return (
		<div className="card">
			{COURSE ?
				<>
					<h2>Settings</h2>
					<div className='doos'>
						<label htmlFor="AMOUNT_OF_QUESTIONS">
							Amount of questions (max {COURSE.questions.length})
						</label>
						<input
							type="number"
							min={1}
							value={AMOUNT_OF_QUESTIONS}
							max={COURSE.questions.length}
							onChange={(e) => {
								const value = parseInt(e.target.value);
								if (value >= 1 && value <= COURSE.questions.length) {
									SET_AMOUNT_OF_QUESTIONS(value);
								}
							}}
						/>
						<label htmlFor="AMOUNT_OF_QUESTIONS">
							Time:
						</label>
						<input
							type="number"
							min={1}
							value={Math.round(TIME / 60)}
							onChange={(e) => {
								const value = parseInt(e.target.value);
								if (value >= 1) {
									SET_TIME(value * 60);
								}
							}}
						/>
					</div>
					<div className='doos'>
						<p>Check for outcome in between questions?</p>
						<input
							type="radio"
							name="CHECK_BETWEEN_QUESTIONS"
							id="checkBetweenQuestionsYes"
							value="true"
							checked={CHECK_BETWEEN_QUESTIONS === true}
							onChange={(e) => SET_CHECK_BETWEEN_QUESTIONS(e.target.value === 'true' ? true : false)}
						/>
						<label htmlFor="checkBetweenQuestionsYes">Yes</label>
						<br />

						<input
							type="radio"
							name="CHECK_BETWEEN_QUESTIONS"
							id="checkBetweenQuestionsNo"
							value="false"
							checked={CHECK_BETWEEN_QUESTIONS === false}
							onChange={(e) => SET_CHECK_BETWEEN_QUESTIONS(e.target.value === 'true' ? true : false)}
						/>
						<label htmlFor="checkBetweenQuestionsNo">No</label>
						<br />
					</div>
					<button className='startQuizButton' onClick={onClickHandler}>Start quiz</button>
				</>
				:
				<p>No course selected</p>
			}
		</div>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export default SETTINGS;