import { useState } from "react";
import { Course } from "../../types";

interface SETTINGS_Props {
    COURSE: Course;
    SET_START_QUIZ: React.Dispatch<React.SetStateAction<boolean>>;
}

const SETTINGS = ({ COURSE, SET_START_QUIZ } : SETTINGS_Props) => {
    const [AMOUNT_OF_QUESTIONS, SET_AMOUNT_OF_QUESTIONS] = useState<number>(1);
	const [CHECK_BETWEEN_QUESTIONS, SET_CHECK_BETWEEN_QUESTIONS] = useState<boolean>(true);
    return (
        <div>
            {COURSE ? 
                <>
                    <p>Settings</p>
                    <label htmlFor="AMOUNT_OF_QUESTIONS">
                        Amount of questions (max {COURSE.questions.length})
                    </label>
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
                    <p>Check for outcome in between questions?</p>
                    <label htmlFor="checkBetweenQuestionsYes">Yes</label>
                    <input
                        type="radio"
                        name="CHECK_BETWEEN_QUESTIONS"
                        id="checkBetweenQuestionsYes"
                        value="true"
                        checked={CHECK_BETWEEN_QUESTIONS === true}
                        onChange={(e) => SET_CHECK_BETWEEN_QUESTIONS(e.target.value === 'true' ? true : false)}
                    />
                    <label htmlFor="checkBetweenQuestionsNo">No</label>
                    <input
                        type="radio"
                        name="CHECK_BETWEEN_QUESTIONS"
                        id="checkBetweenQuestionsNo"
                        value="false"
                        checked={CHECK_BETWEEN_QUESTIONS === false}
                        onChange={(e) => SET_CHECK_BETWEEN_QUESTIONS(e.target.value === 'true' ? true : false)}
                    />
                    <button className='startQuizButton' onClick={() => SET_START_QUIZ(true)}>Start quiz</button>
                </>
            : 
                <p>No course selected</p>
            }
        </div>
    );
};

export default SETTINGS;