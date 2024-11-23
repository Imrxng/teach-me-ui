import styles from './Add_Question.module.css';

interface AddCourseInputProps {
    course: string,
    setCourse: React.Dispatch<React.SetStateAction<string>>,
    courseTitles: string[]
}

const ADD_COURSE_INPUT = ({ course, setCourse, courseTitles }: AddCourseInputProps) => {
	return (
		<>
			<select
				className={styles.formControl}
				value={course}
				onChange={(e) => setCourse(e.target.value)}
				required
			>
				<option value="">--SELECT COURSE--</option>
				{courseTitles.map((course, index) => <option key={index} value={course}>{course}</option>)}
			</select>
			{course === '' && <div className={styles.errorMessage}>Course is required</div>}
		</>
	);
};

export default ADD_COURSE_INPUT;