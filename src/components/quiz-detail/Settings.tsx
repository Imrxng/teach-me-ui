import { Course } from '../../types';

interface SETTINGS_Props {
    COURSE: Course;
    SET_START_QUIZ: React.Dispatch<React.SetStateAction<boolean>>;
    SET_TIME: React.Dispatch<React.SetStateAction<number>>;
    AMOUNT_OF_QUESTIONS: number;
    SET_AMOUNT_OF_QUESTIONS: React.Dispatch<React.SetStateAction<number>>;
    CHECK_BETWEEN_QUESTIONS: boolean;
    SET_CHECK_BETWEEN_QUESTIONS: React.Dispatch<React.SetStateAction<boolean>>;
}

const SETTINGS = ({ COURSE, SET_START_QUIZ, SET_TIME, SET_AMOUNT_OF_QUESTIONS, CHECK_BETWEEN_QUESTIONS, SET_CHECK_BETWEEN_QUESTIONS, AMOUNT_OF_QUESTIONS } : SETTINGS_Props) => {

	const onClickHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
		SET_START_QUIZ(true);
		SET_TIME(COURSE.completeTime * 60);
	};

	return (
		<div className="card">
			{COURSE ? 
				<>
					<h2>Settings</h2>
					<div className="doos">
						<label htmlFor="AMOUNT_OF_QUESTIONS">
                        Amount of questions (max {COURSE.questions.length}):
						</label><br/>
						<input
							type="number"
							value={AMOUNT_OF_QUESTIONS}
							min={1}
							max={COURSE.questions.length}
							onChange={(e) => {
								const value = parseInt(e.target.value);
								if (value >= 1 && value <= COURSE.questions.length) {
									SET_AMOUNT_OF_QUESTIONS(value);
								}
							}}
						/>	
					</div>
					<div className="doos">
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
						<br/>
                    
						<input
							type="radio"
							name="CHECK_BETWEEN_QUESTIONS"
							id="checkBetweenQuestionsNo"
							value="false"
							checked={CHECK_BETWEEN_QUESTIONS === false}
							onChange={(e) => SET_CHECK_BETWEEN_QUESTIONS(e.target.value === 'true' ? true : false)}
						/>
						<label htmlFor="checkBetweenQuestionsNo">No</label>
						<br/>
					</div>
					<button className='startQuizButton' onClick={() => onClickHandler}>Start quiz</button>
				</>
				: 
				<p>No course selected</p>
			}
		</div>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export default SETTINGS;